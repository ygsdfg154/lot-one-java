package com.lotone.iot.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableDiscoveryClient
@EnableScheduling
@ComponentScan(basePackages = {"com.lotone.iot.gateway", "com.lotone.common"})
public class IotGatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(IotGatewayApplication.class, args);
        System.out.println("""
                ========================================
                  lot-one-iot-gateway 启动成功
                  Netty TCP设备端口: 8083
                  HTTP管理端口: 8084
                  API文档: http://localhost:8084/doc.html
                ========================================
                """);
    }
}
