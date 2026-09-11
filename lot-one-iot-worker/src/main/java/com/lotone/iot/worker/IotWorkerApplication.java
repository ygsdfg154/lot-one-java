package com.lotone.iot.worker;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableDiscoveryClient
@EnableScheduling
@MapperScan("com.lotone.iot.worker.mapper")
@ComponentScan(basePackages = {"com.lotone.iot.worker", "com.lotone.common"})
public class IotWorkerApplication {
    public static void main(String[] args) {
        SpringApplication.run(IotWorkerApplication.class, args);
        System.out.println("""
                ========================================
                  lot-one-iot-worker 启动成功
                  数据处理服务端口: 8085
                  消费Kafka topic: device-telemetry, device-event
                ========================================
                """);
    }
}
