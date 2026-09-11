package com.lotone.admin.controller;

import com.lotone.admin.entity.Device;
import com.lotone.admin.service.DeviceService;
import com.lotone.common.result.R;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/device/importExport")
public class DeviceImportExportController {

    @Autowired
    private DeviceService deviceService;

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    /**
     * 下载导入模板（CSV）
     */
    @GetMapping("/downloadTemplate")
    public void downloadTemplate(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv;charset=UTF-8");
        response.setHeader("Content-Disposition", "attachment; filename=" +
                URLEncoder.encode("设备导入模板.csv", "UTF-8"));

        // 写入UTF-8 BOM
        OutputStream out = response.getOutputStream();
        out.write(new byte[]{(byte) 0xEF, (byte) 0xBB, (byte) 0xBF});

        PrintWriter writer = new PrintWriter(new OutputStreamWriter(out, StandardCharsets.UTF_8));
        // 表头
        writer.println("设备ID,设备名称,设备类型,设备型号,ICCID,绑定手机号,激活状态,禁用状态,标签,备注");
        // 示例数据
        writer.println("DEV001,测试设备1,车载终端,型号A,89860000000000000001,13800138001,1,0,测试,示例设备");
        writer.println("DEV002,测试设备2,车载终端,型号B,89860000000000000002,13800138002,0,0,,示例设备");
        writer.flush();
    }

    /**
     * 批量导入设备（CSV）
     */
    @PostMapping("/import")
    public R<Map<String, Object>> importDevices(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return R.fail("文件不能为空");
        }

        int successCount = 0;
        int failCount = 0;
        int skipCount = 0;
        List<Map<String, String>> errors = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {

            String line;
            int lineNum = 0;
            while ((line = reader.readLine()) != null) {
                lineNum++;
                // 跳过表头和空行
                if (lineNum == 1 || line.trim().isEmpty()) {
                    continue;
                }

                try {
                    String[] fields = parseCsvLine(line);
                    if (fields.length < 1) {
                        failCount++;
                        errors.add(Map.of("line", String.valueOf(lineNum), "error", "字段不足"));
                        continue;
                    }

                    String deviceId = fields[0].trim();
                    if (deviceId.isEmpty()) {
                        failCount++;
                        errors.add(Map.of("line", String.valueOf(lineNum), "error", "设备ID为空"));
                        continue;
                    }

                    // 检查是否已存在
                    Device existing = deviceService.getById(deviceId);
                    if (existing != null) {
                        skipCount++;
                        continue;
                    }

                    // 创建设备
                    Device device = new Device();
                    device.setDeviceId(deviceId);
                    if (fields.length > 1) device.setDeviceName(fields[1].trim());
                    if (fields.length > 2) device.setDeviceType(fields[2].trim());
                    if (fields.length > 3) device.setModel(fields[3].trim());
                    if (fields.length > 4) device.setIccid(fields[4].trim());
                    if (fields.length > 5) device.setBindPhone(fields[5].trim());
                    if (fields.length > 6) {
                        try {
                            device.setActivationStatus(Byte.parseByte(fields[6].trim()));
                        } catch (Exception e) {
                            device.setActivationStatus((byte) 0);
                        }
                    }
                    if (fields.length > 7) {
                        try {
                            device.setDisableStatus(Byte.parseByte(fields[7].trim()));
                        } catch (Exception e) {
                            device.setDisableStatus((byte) 0);
                        }
                    }
                    if (fields.length > 8) device.setLabels(fields[8].trim());
                    device.setCreatedAt(LocalDateTime.now());

                    deviceService.save(device);
                    successCount++;

                } catch (Exception e) {
                    failCount++;
                    errors.add(Map.of("line", String.valueOf(lineNum), "error", e.getMessage()));
                    log.error("Import device failed at line {}", lineNum, e);
                }
            }
        } catch (Exception e) {
            log.error("Import devices failed", e);
            return R.fail("导入失败: " + e.getMessage());
        }

        Map<String, Object> result = new HashMap<>();
        result.put("successCount", successCount);
        result.put("failCount", failCount);
        result.put("skipCount", skipCount);
        result.put("totalProcessed", successCount + failCount + skipCount);
        result.put("errors", errors);
        return R.success(result);
    }

    /**
     * 批量导出设备（CSV）
     */
    @GetMapping("/export")
    public void exportDevices(
            @RequestParam(required = false) String deviceType,
            @RequestParam(required = false) Byte activationStatus,
            HttpServletResponse response) throws IOException {

        response.setContentType("text/csv;charset=UTF-8");
        String fileName = "设备列表_" + LocalDateTime.now().format(DATE_FORMAT) + ".csv";
        response.setHeader("Content-Disposition", "attachment; filename=" +
                URLEncoder.encode(fileName, "UTF-8"));

        // 写入UTF-8 BOM
        OutputStream out = response.getOutputStream();
        out.write(new byte[]{(byte) 0xEF, (byte) 0xBB, (byte) 0xBF});

        PrintWriter writer = new PrintWriter(new OutputStreamWriter(out, StandardCharsets.UTF_8));
        // 表头
        writer.println("设备ID,设备名称,设备类型,设备型号,ICCID,绑定手机号,激活状态,禁用状态,标签,创建时间");

        // 查询设备
        com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper<Device> wrapper =
                new com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper<>();
        if (deviceType != null && !deviceType.isEmpty()) {
            wrapper.eq(Device::getDeviceType, deviceType);
        }
        if (activationStatus != null) {
            wrapper.eq(Device::getActivationStatus, activationStatus);
        }
        wrapper.orderByDesc(Device::getCreatedAt);

        List<Device> devices = deviceService.list(wrapper);
        for (Device device : devices) {
            writer.println(String.join(",",
                    safeString(device.getDeviceId()),
                    safeString(device.getDeviceName()),
                    safeString(device.getDeviceType()),
                    safeString(device.getModel()),
                    safeString(device.getIccid()),
                    safeString(device.getBindPhone()),
                    device.getActivationStatus() != null ? String.valueOf(device.getActivationStatus()) : "",
                    device.getDisableStatus() != null ? String.valueOf(device.getDisableStatus()) : "",
                    safeString(device.getLabels()),
                    device.getCreatedAt() != null ? device.getCreatedAt().format(DATE_FORMAT) : ""
            ));
        }
        writer.flush();
        log.info("Export devices: count={}", devices.size());
    }

    /**
     * 导出指定设备
     */
    @PostMapping("/exportSelected")
    public void exportSelected(@RequestBody List<String> deviceIds, HttpServletResponse response) throws IOException {
        response.setContentType("text/csv;charset=UTF-8");
        String fileName = "设备列表_" + LocalDateTime.now().format(DATE_FORMAT) + ".csv";
        response.setHeader("Content-Disposition", "attachment; filename=" +
                URLEncoder.encode(fileName, "UTF-8"));

        OutputStream out = response.getOutputStream();
        out.write(new byte[]{(byte) 0xEF, (byte) 0xBB, (byte) 0xBF});

        PrintWriter writer = new PrintWriter(new OutputStreamWriter(out, StandardCharsets.UTF_8));
        writer.println("设备ID,设备名称,设备类型,设备型号,ICCID,绑定手机号,激活状态,禁用状态,标签,创建时间");

        List<Device> devices = deviceService.listByIds(deviceIds);
        for (Device device : devices) {
            writer.println(String.join(",",
                    safeString(device.getDeviceId()),
                    safeString(device.getDeviceName()),
                    safeString(device.getDeviceType()),
                    safeString(device.getModel()),
                    safeString(device.getIccid()),
                    safeString(device.getBindPhone()),
                    device.getActivationStatus() != null ? String.valueOf(device.getActivationStatus()) : "",
                    device.getDisableStatus() != null ? String.valueOf(device.getDisableStatus()) : "",
                    safeString(device.getLabels()),
                    device.getCreatedAt() != null ? device.getCreatedAt().format(DATE_FORMAT) : ""
            ));
        }
        writer.flush();
    }

    /**
     * 解析CSV行（处理引号内的逗号）
     */
    private String[] parseCsvLine(String line) {
        List<String> fields = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        boolean inQuotes = false;

        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);
            if (c == '"') {
                inQuotes = !inQuotes;
            } else if (c == ',' && !inQuotes) {
                fields.add(current.toString());
                current = new StringBuilder();
            } else {
                current.append(c);
            }
        }
        fields.add(current.toString());
        return fields.toArray(new String[0]);
    }

    private String safeString(String value) {
        if (value == null) return "";
        // 处理包含逗号或引号的字段
        if (value.contains(",") || value.contains("\"") || value.contains("\n")) {
            return "\"" + value.replace("\"", "\"\"") + "\"";
        }
        return value;
    }
}
