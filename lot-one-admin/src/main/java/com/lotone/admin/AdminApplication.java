package com.lotone.admin;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
@MapperScan("com.lotone.admin.mapper")
@ComponentScan(basePackages = {"com.lotone.admin", "com.lotone.common"})
public class AdminApplication {
    public static void main(String[] args) {
        SpringApplication.run(AdminApplication.class, args);
        System.out.println("""
                ========================================
                  lot-one-admin 启动成功
                  管理后台端口: 8081
                  API文档: http://localhost:8081/doc.html
                  Nacos注册中心: localhost:8848
                ========================================
                """);
    }
}
