package com.lotone.query;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableDiscoveryClient
@ComponentScan(basePackages = {"com.lotone.query", "com.lotone.common"})
public class QueryApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(QueryApiApplication.class, args);
        System.out.println("""
                ========================================
                  lot-one-query-api 启动成功
                  查询API端口: 8086
                  API文档: http://localhost:8086/doc.html
                ========================================
                """);
    }
}
