package com.lotone.query.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

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

    @Value("${tdengine.max-active:10}")
    private int maxActive;

    @Value("${tdengine.min-idle:2}")
    private int minIdle;

    @Bean(name = "tdengineDataSource")
    public DataSource tdengineDataSource() {
        HikariDataSource ds = new HikariDataSource();
        ds.setJdbcUrl(url);
        ds.setUsername(username);
        ds.setPassword(password);
        ds.setDriverClassName(driverClassName);
        ds.setMinimumIdle(minIdle);
        ds.setMaximumPoolSize(maxActive);
        ds.setConnectionTimeout(30000);
        ds.setIdleTimeout(600000);
        ds.setMaxLifetime(1800000);
        return ds;
    }

    @Bean(name = "tdengineJdbcTemplate")
    public JdbcTemplate tdengineJdbcTemplate() {
        return new JdbcTemplate(tdengineDataSource());
    }
}
