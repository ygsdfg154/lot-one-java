package com.lotone.iot.worker.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.util.Map;
import java.util.Properties;

@Configuration
public class TdengineConfig {

    @Value("${tdengine.url:jdbc:TAOS-RS://localhost:6041/lot}")
    private String url;

    @Value("${tdengine.username:root}")
    private String username;

    @Value("${tdengine.password:taosdata}")
    private String password;

    @Value("${tdengine.driver-class-name:com.taosdata.jdbc.rs.RestfulDriver}")
    private String driverClassName;

    @Value("${tdengine.initial-size:2}")
    private int initialSize;

    @Value("${tdengine.max-active:20}")
    private int maxActive;

    @Value("${tdengine.min-idle:5}")
    private int minIdle;

    @Value("${tdengine.connection-timeout:30000}")
    private long connectionTimeout;

    @Value("${tdengine.idle-timeout:600000}")
    private long idleTimeout;

    @Value("${tdengine.max-lifetime:1800000}")
    private long maxLifetime;

    @Value("${tdengine.validation-timeout:5000}")
    private long validationTimeout;

    @Value("${tdengine.leak-detection-threshold:60000}")
    private long leakDetectionThreshold;

    @Bean(name = "tdengineDataSource")
    public DataSource tdengineDataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(url);
        config.setUsername(username);
        config.setPassword(password);
        config.setDriverClassName(driverClassName);
        config.setPoolName("TDengine-HikariPool");
        config.setMinimumIdle(minIdle);
        config.setMaximumPoolSize(maxActive);
        config.setConnectionTimeout(connectionTimeout);
        config.setIdleTimeout(idleTimeout);
        config.setMaxLifetime(maxLifetime);
        config.setValidationTimeout(validationTimeout);
        config.setLeakDetectionThreshold(leakDetectionThreshold);
        config.setReadOnly(false);

        // TDengine 特定参数
        Properties props = new Properties();
        props.setProperty("useSSL", "false");
        props.setProperty("useUnicode", "true");
        props.setProperty("characterEncoding", "UTF-8");
        config.setDataSourceProperties(props);

        // 连接初始化SQL
        config.setConnectionInitSql("SELECT 1");

        HikariDataSource ds = new HikariDataSource(config);
        return ds;
    }

    @Bean(name = "tdengineJdbcTemplate")
    public JdbcTemplate tdengineJdbcTemplate() {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(tdengineDataSource());
        // 设置查询超时（秒）
        jdbcTemplate.setQueryTimeout(30);
        // 设置获取大小
        jdbcTemplate.setFetchSize(1000);
        return jdbcTemplate;
    }

    /**
     * 获取连接池状态
     */
    public Map<String, Object> getPoolStatus() {
        HikariDataSource ds = (HikariDataSource) tdengineDataSource();
        Map<String, Object> status = new java.util.LinkedHashMap<>();
        status.put("poolName", ds.getPoolName());
        status.put("activeConnections", ds.getHikariPoolMXBean().getActiveConnections());
        status.put("idleConnections", ds.getHikariPoolMXBean().getIdleConnections());
        status.put("totalConnections", ds.getHikariPoolMXBean().getTotalConnections());
        status.put("threadsAwaitingConnection", ds.getHikariPoolMXBean().getThreadsAwaitingConnection());
        status.put("maxPoolSize", ds.getMaximumPoolSize());
        status.put("minIdle", ds.getMinimumIdle());
        return status;
    }
}
