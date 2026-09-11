package com.lotone.device;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
@MapperScan("com.lotone.device.mapper")
@ComponentScan(basePackages = {"com.lotone.device", "com.lotone.common"})
public class DeviceApplication {
    public static void main(String[] args) {
        SpringApplication.run(DeviceApplication.class, args);
        System.out.println("""
                ========================================
                  lot-one-device 启动成功
                  设备App后端端口: 8082
                  API文档: http://localhost:8082/doc.html
                ========================================
                """);
    }
}
