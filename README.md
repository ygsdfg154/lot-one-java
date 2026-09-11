# lot-one-java

lot-one 项目 Go + Rust 全量迁移到 Java（Spring Boot 3 + Spring Cloud）版本。

## 项目结构

```
lot-one-java/
├── docs/                                    # 迁移文档
│   ├── 00-迁移总览.md                       # 项目现状、目标、服务划分、阶段总览
│   ├── 05-分阶段迁移计划.md                 # P0-P9 每个阶段的详细操作步骤
│   └── 06-操作手册.md                       # 环境搭建、配置模板、代码生成、核心代码示例
├── lot-one-common/                          # 公共模块
│   └── 统一响应(R)、分页(PageResult)、异常处理、JWT工具
├── lot-one-gateway/                         # API网关（8080）
│   └── Spring Cloud Gateway：路由、鉴权、限流、跨域
├── lot-one-admin/                           # 管理后台（8081）
│   └── 对应原 admin-console（GVA）：系统管理、设备管理、业务管理
├── lot-one-device/                          # 设备App后端（8082）
│   └── 对应原 device-app（Kratos）：App用户、登录、支付宝/微信支付
├── lot-one-iot-gateway/                     # 设备接入网关（TCP:8083, HTTP:8084）
│   └── 对应原 Rust access-gateway：Netty TCP/UDP、设备认证、消息分发
├── lot-one-iot-worker/                      # 数据处理服务（8085）
│   └── 对应原 Rust iot-worker：Kafka消费、Mongo/TDengine写入、报警
├── lot-one-query-api/                       # 查询API（8086）
│   └── 对应原 Rust query-api：轨迹查询、统计分析
├── lot-one-protocol/                        # 协议解析库
│   └── 对应原 Rust protocol-jt808/protocol-hlxt：JT808 + HLXT 编解码
└── sql/migration/                           # 数据库迁移脚本
```

## 技术栈

| 分类 | 技术 |
|------|------|
| 框架 | Spring Boot 3.2.5 + Spring Cloud 2023.0.1 |
| 注册/配置中心 | Nacos |
| 网关 | Spring Cloud Gateway |
| 服务调用 | OpenFeign |
| ORM | MyBatis-Plus 3.5.5 |
| 数据库 | MySQL 8.0 + MongoDB + TDengine |
| 缓存 | Redis + Redisson |
| 消息队列 | Kafka |
| 权限 | Sa-Token（替代 Casbin） |
| 设备网关 | Netty 4.1 |
| API文档 | Knife4j（OpenAPI 3） |
| 工具 | Hutool + MapStruct + Lombok |
| 支付 | 支付宝SDK + 微信支付SDK |
| 对象存储 | MinIO + 阿里云OSS |

## 快速开始

### 1. 环境要求
- JDK 17+
- Maven 3.8+
- MySQL 8.0、Redis、MongoDB、TDengine、Kafka、Nacos

### 2. 启动基础设施
```bash
cd D:\work\lot-one\docker-env
docker-compose up -d
```

### 3. 编译项目
```bash
cd D:\work\lot-one-java
mvn clean package -DskipTests
```

### 4. 配置 Nacos
```
1. 登录 http://localhost:8848/nacos（nacos/nacos）
2. 创建命名空间：lot-one-dev
3. 按 docs/06-操作手册.md 第二章创建各服务配置
```

### 5. 启动服务（顺序）
```bash
# 1. 网关
java -jar lot-one-gateway/target/lot-one-gateway-1.0.0.jar

# 2. 管理后台
java -jar lot-one-admin/target/lot-one-admin-1.0.0.jar

# 3. 设备App后端
java -jar lot-one-device/target/lot-one-device-1.0.0.jar

# 4. 设备网关
java -jar lot-one-iot-gateway/target/lot-one-iot-gateway-1.0.0.jar

# 5. 数据处理
java -jar lot-one-iot-worker/target/lot-one-iot-worker-1.0.0.jar

# 6. 查询API
java -jar lot-one-query-api/target/lot-one-query-api-1.0.0.jar
```

### 6. 验证
- Nacos 服务列表：http://localhost:8848/nacos
- 管理后台API文档：http://localhost:8081/doc.html
- 网关健康检查：http://localhost:8080/admin/api/base/captcha

## 迁移进度

| 阶段 | 内容 | 状态 |
|------|------|------|
| P0 | 环境搭建、项目骨架 | ✅ 已完成 |
| P1 | 系统管理模块（sys_） | ⬜ 待开始 |
| P2 | 业务核心模块（lot_） | ⬜ 待开始 |
| P3 | 设备App后端 | ⬜ 待开始 |
| P4 | 协议解析库（JT808/HLXT） | 🔄 进行中（基础框架已完成） |
| P5 | 设备接入网关（Netty） | ⬜ 待开始 |
| P6 | 数据处理服务 | ⬜ 待开始 |
| P7 | 查询API | ⬜ 待开始 |
| P8 | 全链路联调测试 | ⬜ 待开始 |
| P9 | 上线切换 | ⬜ 待开始 |

## 前端切换（零改动）

管理后台前端只需修改 API 地址：
```
VITE_API_BASE_URL = http://localhost:8080/admin
```

设备App前端：
```
API_BASE_URL = http://localhost:8080/device
```

网关自动去掉前缀，接口路径与原系统完全一致。

## 文档索引

- [迁移总览](docs/00-迁移总览.md) — 项目现状、目标、服务划分
- [分阶段迁移计划](docs/05-分阶段迁移计划.md) — P0-P9 详细步骤、验收标准
- [操作手册](docs/06-操作手册.md) — 环境搭建、配置模板、代码生成、核心代码
