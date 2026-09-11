package com.lotone.admin;

import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;

import java.util.Collections;

/**
 * MyBatis-Plus 代码生成器
 * 使用方法：
 * 1. 修改 TABLES 数组，填入要生成的表名
 * 2. 修改 MODULE_NAME（如 system、lot、device）
 * 3. 运行 main() 方法
 * 4. 生成文件：entity、mapper、service、serviceImpl、controller、mapper.xml
 */
public class CodeGenerator {

    // ========== 配置区：每次生成修改这里 ==========
    private static final String URL = "jdbc:mysql://localhost:3306/lot?useSSL=false&serverTimezone=GMT%2B8&useUnicode=true&characterEncoding=utf8";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "Aa123456";
    private static final String PACKAGE_PARENT = "com.lotone.admin";
    private static final String MODULE_NAME = ""; // 子模块名，如 system、lot，留空则直接在包下

    // 要生成的表名（批量生成）
    private static final String[] TABLES = {
            // P2 业务核心模块
            "lot_alarm_rule",
            "lot_app_menu",
            "lot_app_version",
            "lot_cmd",
            "lot_cmd_category",
            "lot_customer_service",
            "lot_device",
            "lot_device_cmd",
            "lot_device_cmd_log",
            "lot_fence",
            "lot_fence_device",
            "lot_fence_point",
            "lot_language_module",
            "lot_message",
            "lot_order",
            "lot_package",
            "lot_payment_platform",
            "lot_product",
            "lot_product_cmd",
            "lot_recording",
            "lot_report_alert",
            "lot_report_battery",
            "lot_report_mileage",
            "lot_report_stop",
            "lot_report_trip"
    };
    // ============================================

    public static void main(String[] args) {
        FastAutoGenerator.create(URL, USERNAME, PASSWORD)
                .globalConfig(builder -> builder
                        .author("lot-one")
                        .outputDir(System.getProperty("user.dir") + "/lot-one-admin/src/main/java")
                        .commentDate("yyyy-MM-dd")
                        .disableOpenDir()
                )
                .packageConfig(builder -> builder
                        .parent(PACKAGE_PARENT)
                        .moduleName(MODULE_NAME)
                        .entity("entity")
                        .service("service")
                        .serviceImpl("service.impl")
                        .mapper("mapper")
                        .controller("controller")
                        .xml("mapper.xml")
                        .pathInfo(Collections.singletonMap(
                                OutputFile.xml,
                                System.getProperty("user.dir") + "/lot-one-admin/src/main/resources/mapper"))
                )
                .strategyConfig(builder -> builder
                        .addInclude(TABLES)
                        .addTablePrefix("sys_", "lot_", "exa_", "app_")
                        .entityBuilder()
                        .enableLombok()
                        .enableTableFieldAnnotation()
                        .logicDeleteColumnName("deleted")
                        .versionColumnName("version")
                        .controllerBuilder()
                        .enableRestStyle()
                        .formatFileName("%sController")
                        .serviceBuilder()
                        .formatServiceFileName("%sService")
                        .formatServiceImplFileName("%sServiceImpl")
                        .mapperBuilder()
                        .enableMapperAnnotation()
                        .formatMapperFileName("%sMapper")
                        .formatXmlFileName("%sMapper")
                )
                .templateEngine(new FreemarkerTemplateEngine())
                .execute();
        System.out.println("代码生成完成！请检查生成的文件。");
    }
}
