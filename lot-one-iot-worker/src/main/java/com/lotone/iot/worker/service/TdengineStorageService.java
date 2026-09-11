package com.lotone.iot.worker.service;

import com.lotone.iot.worker.dto.TelemetryData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import org.springframework.scheduling.annotation.Scheduled;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Slf4j
@Service
public class TdengineStorageService {

    @Autowired
    @Qualifier("tdengineJdbcTemplate")
    private JdbcTemplate tdengineJdbcTemplate;

    @Value("${iot.worker.batch.tdengine-batch-size:100}")
    private int batchSize;

    @Value("${iot.worker.batch.tdengine-flush-interval:5000}")
    private long flushInterval;

    private static final String STABLE_NAME = "device_telemetry";
    private static final DateTimeFormatter TD_TIME_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");

    /** 已创建的子表缓存，避免重复创建 */
    private final ConcurrentHashMap<String, Boolean> createdTables = new ConcurrentHashMap<>();

    /** 批量缓存（按设备分组） */
    private final ConcurrentHashMap<String, List<TelemetryData>> deviceBuffers = new ConcurrentHashMap<>();

    /** 性能统计 */
    private final AtomicLong totalWritten = new AtomicLong(0);
    private final AtomicLong totalBatchCount = new AtomicLong(0);
    private final AtomicLong lastFlushTime = new AtomicLong(System.currentTimeMillis());

    @PostConstruct
    public void init() {
        try {
            createSuperTable();
            log.info("TDengine super table created: {}", STABLE_NAME);
        } catch (Exception e) {
            log.warn("TDengine init failed (may be connection issue, will retry on first write): {}", e.getMessage());
        }
    }

    /**
     * 创建超级表
     */
    private void createSuperTable() {
        String sql = "CREATE STABLE IF NOT EXISTS " + STABLE_NAME + " (" +
                "ts TIMESTAMP, " +
                "latitude DOUBLE, " +
                "longitude DOUBLE, " +
                "altitude INT, " +
                "speed DOUBLE, " +
                "direction INT, " +
                "alarm_flag INT, " +
                "status INT, " +
                "device_time TIMESTAMP" +
                ") TAGS (device_id NCHAR(64))";
        tdengineJdbcTemplate.execute(sql);
    }

    /**
     * 创建设备子表
     */
    private void createDeviceTable(String deviceId) {
        if (createdTables.containsKey(deviceId)) return;
        String tableName = getTableName(deviceId);
        String sql = "CREATE TABLE IF NOT EXISTS " + tableName + " USING " + STABLE_NAME + " TAGS ('" + deviceId + "')";
        tdengineJdbcTemplate.execute(sql);
        createdTables.put(deviceId, true);
    }

    private String getTableName(String deviceId) {
        // 表名只能包含字母数字下划线，deviceId 是手机号，直接用
        return "dev_" + deviceId;
    }

    /**
     * 单条写入位置数据（批量缓存）
     */
    public void saveTelemetry(TelemetryData data) {
        if (data == null || data.getDeviceId() == null) return;

        // 添加到设备缓存
        List<TelemetryData> buffer = deviceBuffers.computeIfAbsent(data.getDeviceId(), k -> new ArrayList<>());
        synchronized (buffer) {
            buffer.add(data);
            // 达到批量阈值，刷写
            if (buffer.size() >= batchSize) {
                flushDeviceBuffer(data.getDeviceId(), buffer);
            }
        }
    }

    /**
     * 刷写指定设备的缓存
     */
    private void flushDeviceBuffer(String deviceId, List<TelemetryData> buffer) {
        if (buffer.isEmpty()) return;
        List<TelemetryData> dataToWrite = new ArrayList<>(buffer);
        buffer.clear();

        try {
            createDeviceTable(deviceId);
            String tableName = getTableName(deviceId);
            LocalDateTime now = LocalDateTime.now();

            // 构建批量 INSERT SQL
            StringBuilder sql = new StringBuilder("INSERT INTO ").append(tableName)
                    .append(" (ts, latitude, longitude, altitude, speed, direction, alarm_flag, status, device_time) VALUES ");

            List<Object> params = new ArrayList<>();
            for (int i = 0; i < dataToWrite.size(); i++) {
                TelemetryData data = dataToWrite.get(i);
                if (i > 0) sql.append(", ");
                sql.append("(?, ?, ?, ?, ?, ?, ?, ?, ?)");
                params.add(now.plusNanos(i * 1000));
                params.add(data.getLatitude());
                params.add(data.getLongitude());
                params.add(data.getAltitude());
                params.add(data.getSpeed());
                params.add(data.getDirection());
                params.add(data.getAlarmFlag());
                params.add(data.getStatus());
                params.add(data.getTimeAsLocalDateTime() != null ? data.getTimeAsLocalDateTime() : now);
            }

            tdengineJdbcTemplate.update(sql.toString(), params.toArray());
            totalWritten.addAndGet(dataToWrite.size());
            totalBatchCount.incrementAndGet();
            log.debug("TDengine flush: deviceId={}, count={}, total={}", deviceId, dataToWrite.size(), totalWritten.get());
        } catch (Exception e) {
            log.error("TDengine flush failed: deviceId={}, count={}", deviceId, dataToWrite.size(), e);
        }
    }

    /**
     * 定时刷写所有设备缓存（每5秒执行一次）
     */
    @Scheduled(fixedDelayString = "${iot.worker.batch.tdengine-flush-interval:5000}")
    public void flushAllBuffers() {
        if (deviceBuffers.isEmpty()) return;

        long startTime = System.currentTimeMillis();
        int totalFlushed = 0;
        int deviceCount = 0;

        for (java.util.Map.Entry<String, List<TelemetryData>> entry : deviceBuffers.entrySet()) {
            List<TelemetryData> buffer = entry.getValue();
            synchronized (buffer) {
                if (!buffer.isEmpty()) {
                    flushDeviceBuffer(entry.getKey(), buffer);
                    totalFlushed += buffer.size();
                    deviceCount++;
                }
            }
        }

        lastFlushTime.set(System.currentTimeMillis());
        if (totalFlushed > 0) {
            log.info("TDengine scheduled flush: devices={}, records={}, cost={}ms, totalWritten={}",
                    deviceCount, totalFlushed, System.currentTimeMillis() - startTime, totalWritten.get());
        }
    }

    /**
     * 获取写入统计
     */
    public java.util.Map<String, Object> getWriteStats() {
        java.util.Map<String, Object> stats = new java.util.HashMap<>();
        stats.put("totalWritten", totalWritten.get());
        stats.put("totalBatchCount", totalBatchCount.get());
        stats.put("bufferedDevices", deviceBuffers.size());
        int bufferedRecords = 0;
        for (List<TelemetryData> buffer : deviceBuffers.values()) {
            bufferedRecords += buffer.size();
        }
        stats.put("bufferedRecords", bufferedRecords);
        stats.put("lastFlushTime", new java.util.Date(lastFlushTime.get()));
        return stats;
    }

    /**
     * 批量写入位置数据
     */
    public void saveTelemetryBatch(List<TelemetryData> dataList) {
        if (dataList == null || dataList.isEmpty()) return;

        // 按设备分组
        java.util.Map<String, List<TelemetryData>> grouped = new java.util.HashMap<>();
        for (TelemetryData data : dataList) {
            grouped.computeIfAbsent(data.getDeviceId(), k -> new ArrayList<>()).add(data);
        }

        for (java.util.Map.Entry<String, List<TelemetryData>> entry : grouped.entrySet()) {
            String deviceId = entry.getKey();
            List<TelemetryData> deviceData = entry.getValue();
            try {
                createDeviceTable(deviceId);
                String tableName = getTableName(deviceId);
                LocalDateTime now = LocalDateTime.now();

                // 构建批量 INSERT SQL
                StringBuilder sql = new StringBuilder("INSERT INTO ").append(tableName)
                        .append(" (ts, latitude, longitude, altitude, speed, direction, alarm_flag, status, device_time) VALUES ");

                List<Object> params = new ArrayList<>();
                for (int i = 0; i < deviceData.size(); i++) {
                    TelemetryData data = deviceData.get(i);
                    if (i > 0) sql.append(", ");
                    sql.append("(?, ?, ?, ?, ?, ?, ?, ?, ?)");
                    params.add(now.plusNanos(i * 1000)); // 微秒级时间戳，避免重复
                    params.add(data.getLatitude());
                    params.add(data.getLongitude());
                    params.add(data.getAltitude());
                    params.add(data.getSpeed());
                    params.add(data.getDirection());
                    params.add(data.getAlarmFlag());
                    params.add(data.getStatus());
                    params.add(data.getTimeAsLocalDateTime() != null ? data.getTimeAsLocalDateTime() : now);
                }

                tdengineJdbcTemplate.update(sql.toString(), params.toArray());
                log.debug("TDengine batch insert: deviceId={}, count={}", deviceId, deviceData.size());
            } catch (Exception e) {
                log.error("TDengine batch save failed: deviceId={}, count={}", deviceId, deviceData.size(), e);
            }
        }
    }
}
