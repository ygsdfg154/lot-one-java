package com.lotone.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class GatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
        System.out.println("""
                ========================================
                  lot-one-gateway 启动成功
                  API网关端口: 8080
                  Nacos注册中心: localhost:8848
                ========================================
                """);
    }
}
