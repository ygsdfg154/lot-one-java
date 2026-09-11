# App 完整 API 接口文档

> 版本: v1.2 (2026-07-27)
> 配对文档:[11-app-user-module-design.md](./11-app-user-module-design.md)(实现设计,含数据链路、DDL 权威版与决策记录)、[11-app-user-module-tasks.md](./11-app-user-module-tasks.md)(任务清单)、[11-app-user-module-integration-guide.md](./11-app-user-module-integration-guide.md)(**可单独交付的完整手册**:对接指南+黑盒测试矩阵+本契约全文同步副本;本文档更新后按其 §9 命令同步)。

> ✅ **契约已回写**(v1.2,2026-07-27 用户逐条确认 design §10 全部 27 条后落笔):本文档正文与已交付实现一致,可直接对接。6.4 绑定设备已按契约完成实现迁移(DR-11,tasks Group AH),前端 wxapp 绑定页需同步改为"设备号+设备密码"表单。

---

## 0. 全局约定

### 0.1 统一响应格式

```json
{ "code": 0, "msg": "成功", "data": { ... } }
```

- `code = 0`：成功；`code ≠ 0`：失败或过期
- HTTP 状态码统一返回 `200`

### 0.2 字段与分页约定

**时间字段命名**

| 类型 | 命名 | 示例 |
|------|------|------|
| 时间点（数据字段） | `xxxAt` | `createdAt`、`updatedAt`、`paidAt`、`expiredAt`、`activatedAt`、`alarmedAt`、`lastPosAt` |
| 时间区间（查询参数） | `startTime` / `endTime`、`startDate` / `endDate` | 见各查询接口 |

- 时间点字段格式统一为 `YYYY-MM-DD HH:mm:ss`；仅表示日期、不含时刻的字段（如 `installedAt`、SIM 套餐 `expiredAt`）格式为 `YYYY-MM-DD`，各接口的字段表会注明。
- 无值时字段为 `null` **或缺省不返回**（protojson 对未设置的 optional 字段不输出，JS 侧为 undefined），不返回空字符串。前端判空请同时覆盖 null 与 undefined。

**分页**

所有分页列表接口统一采用以下参数与返回结构：

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| page | int | 否 | 1 | 页码，从 1 开始 |
| pageSize | int | 否 | 10 | 每页条数，最大 50 |

返回结构统一为：

```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "items": [],
    "total": 0,
    "page": 1,
    "pageSize": 10
  }
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| items | array | 当前页数据 |
| total | int | 符合条件的总条数（不是当前页条数） |
| page | int | 当前页码 |
| pageSize | int | 每页条数 |

**大整数字段**

标注为 int64 的字段（各类 `id`、里程等）在 JSON 中**以字符串形式返回**，避免超出 JavaScript 安全整数范围时精度丢失。前端需转换为数值后再运算。

### 0.3 多语言

请求头 `X-Lang: zh` 或 `Accept-Language: zh-CN`，默认 `en`。

### 0.4 鉴权

登录后返回 token，后续请求带 `Authorization: Bearer <token>`。

服务端按 token 识别调用方身份类型，分为两类：

| 身份类型 | 来源 | 说明 |
|----------|------|------|
| `account` | 手机号 / 微信 / Apple 登录 | 账号级身份，关联 `user_id`，可访问账号接口及名下所有设备 |
| `device` | 设备号+密码登录 | 设备级身份，关联 `device_id`，只能访问该设备相关接口 |

**身份约束**：

- 设备级身份调账号接口（如 1.8 profile、1.9 我的设备列表）返回 `21010`。
- **账号级身份未绑定手机号时**（微信 / Apple 首次登录建号后尚未绑手机），除白名单外一律返回 `21003`，前端应引导用户走 1.6 绑定手机号。
- 设备级身份**不受** `21003` 约束——设备登录本身即为已验证身份，其绑定手机号流程走 1.11，不通过该约束控制。

**`21003` 白名单**（账号级身份未绑手机号时仍可访问）：

| 接口 | 说明 |
|------|------|
| 1.6 `POST /v1/auth/app/bind-phone` | 绑定手机号本身必须放行，否则无法完成绑定 |

> 登录类接口（1.1~1.5b、1.7、1.16）与 1.12 登出为公开接口，不需要 token，因此也不受本约束影响，无需列入白名单。

### 0.5 设备号传递约定

- 所有设备相关业务接口（定位、历史轨迹、指令下发等），**deviceId 走路径参数**，由前端传入。
- 手机号登录：前端从 1.9 设备列表获取设备列表，默认选中 `isDefault=true` 的设备，用户可切换。每次调业务接口时传入对应 deviceId。
- 设备登录：身份中已关联 deviceId，但前端仍从路径传入（保持一致）。服务端会校验路径 deviceId 与身份是否一致，不一致返回 `21010`。
- 示例：`GET /v1/devices/{deviceId}/location`、`POST /v1/devices/{deviceId}/command`

> **唯一例外**：1.10 `GET /v1/devices/current` 不带 deviceId，用于"前端尚未确定当前设备"的冷启动场景（设备登录取身份中的设备，手机号登录取默认设备）。新增接口一律遵循路径传参约定，不要参照 1.10；已知 deviceId 时应直接用 6.1 / 6.2。

### 0.6 权限与安全约束（强制）

本节为**接口契约的一部分**，所有接口实现必须满足，前端也需按此预期处理错误。

**① 设备归属校验（最高优先级）**

凡是接受 `deviceId`（路径参数、query 或 body）的接口，服务端**必须**校验该设备归属于当前调用方，校验不通过返回 `21011`：

| 身份类型 | 校验规则 |
|----------|----------|
| `account` | deviceId 必须在当前 `user_id` 名下已绑定的设备列表中 |
| `device` | deviceId 必须等于身份关联的 `device_id`（不允许访问其他设备） |

- 对接受**设备列表**的接口（如 12.1 `/v1/alarms` 的跨设备查询），不传设备参数时的默认范围是**当前用户名下全部设备**，绝不能是全库；显式传入的每一个 deviceId 都要逐个校验。
- 对接受 `fenceId`、`orderNo`、音频 `id` 等**间接资源标识**的接口，同样要校验该资源所属设备归属于当前调用方（这类 ID 通常连续可枚举，风险更高）。
- 指令下发类接口（10.1、8.1、9.3.2、9.4.2、7.3.2）涉及断油断电等物理操作，归属校验为**红线要求**。

**② 频率限制**

| 场景 | 要求 |
|------|------|
| 1.2 发送短信验证码 | 按手机号限制发送间隔与每日上限，并按调用方 IP 限制 |
| 短信验证码校验 | 必须有有效期、失败次数上限、一次性消费（验证通过即失效） |
| 1.4 / 1.7 密码登录 | 失败次数累计达阈值后锁定或强制图形验证码。设备号为 IMEI/SN，可枚举性强，此项为必需 |
| 指令下发类接口 | 单设备维度限流，防止高频下发 |
| 其他接口 | 按 IP + 用户维度的全局限流 |

**③ 其他**

- 7.2.2 `GET /v1/share/{token}` 为无需登录的公开接口，会暴露设备实时位置：token 必须由密码学安全随机源生成、长度足以抵抗枚举、带有效期且可主动撤销，并对访问频率做限制。
- 11.4 支付回调必须**幂等**：同一笔支付的重复通知只能生效一次（支付平台允许重复投递）。
- 修改登录密码、重置设备密码后，应吊销该主体已签发的其他 token。

---

### 0.7 业务码速查

| Code | Reason | 说明 |
|------|--------|------|
| 0 | SUCCESS | 成功 |
| 10001 | INVALID_ARGUMENT | 请求参数错误（缺参、格式/范围非法、schema 校验不过） |
| 10002 | UNAUTHORIZED | 未登录/token 过期 |
| 10005 | TOO_MANY_REQUESTS | 触发频率限制（0.6 ②），稍后重试 |
| 20001 | LOGIN_FAILED | 账号或密码错误 |
| 20002 | CAPTCHA_WRONG | 图形验证码错误 |
| 20004 | GATE_UNAVAILABLE | iot-runtime 不可用/上游错误 |
| 20005 | OLD_PASSWORD_WRONG | 旧密码错误 |
| 21001 | PHONE_EXISTS | 手机号已被占用 |
| 21002 | PASSWORD_NOT_SET | 账号未设置密码 |
| 21003 | PHONE_BIND_REQUIRED | 需先绑定手机号 |
| 21004 | SMS_CODE_WRONG | 短信验证码错误 |
| 21005 | WEAK_DEVICE_PASSWORD | 设备登录密码强度不达标（至少 8 位且不能为纯数字） |
| 21007 | NO_DEFAULT_DEVICE | 账号未绑定任何设备/无默认设备（1.10） |
| 21008 | DEVICE_ALREADY_BOUND | 设备已被绑定 |
| 21009 | PASSWORD_REQUIRED | 手机号未注册时必须同时设置新账号密码 |
| 21010 | DEVICE_IDENTITY_FORBIDDEN | 设备身份不能访问此接口 |
| 21011 | DEVICE_NOT_OWNED | 该设备不属于当前账号（越权访问，见 0.6 ①） |
| 21012 | DEVICE_PASSWORD_WRONG | 设备登录密码错误 |
| 21013 | WECHAT_ALREADY_BOUND | 该微信已绑定其他账号 |
| 21014 | PHONE_REQUIRED_BEFORE_UNBIND | 请先绑定手机号后再解绑微信 |
| 21015 | WECHAT_NOT_BOUND | 当前账号未绑定微信 |
| 21016 | SELF_SERVICE_UNAVAILABLE | 设备未关联手机号，无法自助找回密码（1.16；原 21011，DR-2 改号） |
| 21017 | CANNOT_UNBIND_LAST_DEVICE | 不能解绑最后一个设备 |
| 21018 | FENCE_NAME_EXISTS | 围栏名称已存在 |
| 21019 | FENCE_LIMIT_EXCEEDED | 围栏数量超限 |
| 21020 | SHARE_TOKEN_EXPIRED | 分享链接已过期 |
| 21021 | DEVICE_NOT_SUPPORT | 该设备不支持此功能 |
| 21022 | SELF_CHECK_NOT_AVAILABLE | 自检功能暂不可用 |
| 21023 | CMD_TIMEOUT | 指令超时未响应 |
| 21024 | ORDER_NOT_FOUND | 订单不存在 |
| 21025 | ORDER_STATUS_INVALID | 订单当前状态不允许此操作 |
| 21026 | PRODUCT_UNAVAILABLE | 产品不存在或已下架 |
| 21027 | FENCE_NOT_FOUND | 围栏不存在 |
| 22002 | OAUTH_NOT_CONFIGURED | 第三方登录服务未接入/未就绪 |

> **通用错误约定**：以下错误所有相关接口都可能返回，各接口的"错误"小节只列该接口**特有**的业务错误，不再逐一重复。
>
> | Code | 触发条件 |
> |------|----------|
> | 10001 | 请求参数错误。所有带参数的接口均可能返回 |
> | 10002 | 未登录、token 无效或已过期。所有需鉴权的接口均可能返回 |
> | 10005 | 触发频率限制（0.6 ②）。所有接口均可能返回 |
> | 20004 | iot-runtime 不可用。所有依赖实时数据/指令通道的接口均可能返回 |
> | 21003 | 账号级身份未绑定手机号，见 0.4 |
> | 21010 | 身份类型不匹配：设备身份调账号接口，或路径 deviceId 与设备身份不一致 |
> | 21011 | 设备（或其关联资源）不属于当前调用方，见 0.6 ①。**所有接受 deviceId / fenceId / orderNo / 音频 id 的接口均适用** |

---

## 1. 登录

### 1.1 获取图形验证码

```
GET /v1/auth/captcha
鉴权：无需登录
```

请求参数：无

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "captchaEnabled": true,
    "uuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "img": "iVBORw0KGgo...(base64)"
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| captchaEnabled | bool | 是否启用图形验证码 |
| uuid | string | 验证码唯一标识（后续请求需回传） |
| img | string | 验证码图片 base64 编码 |

---

### 1.2 发送短信验证码

```
POST /v1/auth/app/sms-code
鉴权：无需登录
```

说明：短信服务商未接入时固定 `123456`。

请求参数：
```json
{
  "phone": "18123954617",
  "uuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "code": "A3x9"
}
```
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| phone | string | 是 | 手机号 |
| uuid | string | 是 | 图形验证码 uuid（来自 1.1） |
| code | string | 是 | 图形验证码答案 |

返回示例：
```json
{ "code": 0, "msg": "验证码已发送", "data": null }
```

错误：
- `20002`：图形验证码错误

---

### 1.3 手机号 + 验证码登录

```
POST /v1/auth/login/phone-code
鉴权：无需登录
```

说明：未注册手机号自动建号。可同时设置密码（可选）。

请求参数：
```json
{
  "phone": "18123954617",
  "smsCode": "123456",
  "password": "mypassword"
}
```
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| phone | string | 是 | 手机号 |
| smsCode | string | 是 | 短信验证码 |
| password | string | 否 | 新注册时设置密码，已有账号时忽略 |

返回示例：
```json
{
  "code": 0,
  "msg": "登录成功",
  "data": {
    "token": "lot_app_xxxxxxxxxxxxx",
    "identityType": "account"
  }
}
```
| 字段 | 类型 | 说明 |
|------|------|------|
| token | string | 账号级 token |
| identityType | string | 固定 `"account"` |

错误：
- `21004`：短信验证码错误

---

### 1.4 手机号 + 密码登录

```
POST /v1/auth/login/phone-password
鉴权：无需登录
```

请求参数：
```json
{
  "phone": "18123954617",
  "password": "mypassword"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| phone | string | 是 | 手机号 |
| password | string | 是 | 登录密码 |
| code | string | 否 | 图形验证码答案（captchaEnabled=true 时需传，命名与 1.2 一致） |
| uuid | string | 否 | 图形验证码 uuid（captchaEnabled=true 时需传，来自 1.1） |

> 图形验证码两参数为风控预留定义（对应 0.6 ② 的"失败达阈值后强制图形验证码"），当前后端实现尚未接入，传入会被忽略。

返回示例：同 1.3

错误：
- `20001`：账号或密码错误
- `21002`：账号未设置密码

---

### 1.5 微信登录

```
POST /v1/auth/login/wechat
鉴权：无需登录
```

说明：按 `(provider="wechat", open_id)` 识别，首次登录自动建号。返回 `phoneBound` 指示是否需要绑定手机号。

请求参数：
```json
{
  "credential": "wx_login_code"
}
```
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| credential | string | 是 | 微信 `wx.login()` 返回的 code |

返回示例：
```json
{
  "code": 0,
  "msg": "登录成功",
  "data": {
    "token": "lot_app_xxxxxxxxxxxxx",
    "identityType": "account",
    "phoneBound": false
  }
}
```
| 字段 | 类型 | 说明 |
|------|------|------|
| token | string | 账号级 token |
| identityType | string | 固定 `"account"` |
| phoneBound | bool | 是否已绑手机号。`false` 时只能调 1.6，其余接口返回 `21003` |

---

### 1.5b Apple 登录

```
POST /v1/auth/login/apple
鉴权：无需登录
```

说明：行为同 1.5 微信登录——按 `(provider="apple", open_id)` 识别账号，首次登录自动建号，返回 `phoneBound` 指示是否需要绑定手机号（`false` 时受 0.4 的 `21003` 约束）。

请求参数：
```json
{ "credential": "apple_identity_token" }
```
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| credential | string | 是 | Apple 登录返回的 identityToken |

返回：同 1.5。

---

### 1.6 绑定手机号（账号级）

```
POST /v1/auth/app/bind-phone
鉴权：account token（含 phoneBound=false 的 token）
```

说明：第三方登录后绑定手机号，或已有账号换绑。需短信验证码。

请求参数：
```json
{
  "phone": "18123954617",
  "smsCode": "123456"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| phone | string | 是 | 手机号 |
| smsCode | string | 是 | 短信验证码 |

返回示例：
```json
{ "code": 0, "msg": "绑定成功", "data": null }
```

错误：
- `21001`：手机号已被其他账号占用
- `21004`：短信验证码错误

---

### 1.7 设备号 + 密码登录

```
POST /v1/auth/login/device
鉴权：无需登录
```

说明：用设备号+设备密码登录，返回设备级 token。`phoneBound` 为 `false` 时必须调 1.11 绑定手机号。

请求参数：
```json
{
  "deviceId": "87078795936",
  "password": "123456"
}
```
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| deviceId | string | 是 | 设备号（IMEI/SN） |
| password | string | 是 | 设备登录密码 |

返回示例：
```json
{
  "code": 0,
  "msg": "登录成功",
  "data": {
    "token": "lot_dev_xxxxxxxxxxxxx",
    "identityType": "device",
    "phoneBound": false
  }
}
```
| 字段 | 类型 | 说明 |
|------|------|------|
| token | string | 设备级 token |
| identityType | string | 固定 `"device"` |
| phoneBound | bool | 设备是否已绑定手机号。`false` 时只能调 1.11 和白名单，其余返回 `21003` |

错误：
- `21012`：设备密码错误

---

### 1.8 获取账号资料

```
GET /v1/auth/app/profile
鉴权：account token
```

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "phone": "18123954617",
    "nickName": "用户18123954617",
    "avatar": "",
    "deviceCount": 3,
    "phoneBound": true,
    "wechatBound": true
  }
}
```
| 字段 | 类型 | 说明 |
|------|------|------|
| phone | string | 手机号 |
| nickName | string | 昵称 |
| avatar | string | 头像 URL |
| deviceCount | int | 绑定的设备数量 |
| phoneBound | bool | 是否已绑定手机号 |
| wechatBound | bool | 是否已绑定微信 |

---

### 1.9 我的设备列表

```
GET /v1/auth/app/devices?page=1&pageSize=10
鉴权：account token
```

说明：返回当前账号绑定的设备，支持分页。`isDefault=true` 的为默认设备。

请求参数：仅分页参数，见 0.2。

返回示例（列表元素为**嵌套结构**：绑定关系字段在顶层，设备档案+实时态在 `device` 对象内）：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "items": [
      {
        "deviceId": "87078795936",
        "isDefault": true,
        "displayNo": "DEV001",
        "device": {
          "deviceId": "87078795936",
          "deviceName": "我的车",
          "displayNo": "DEV001",
          "deviceStatus": 1,
          "onlineStatus": 1,
          "motionState": 0,
          "motionStateKeepDuration": "3600",
          "powerPercent": 85,
          "charge": 0,
          "productType": 0,
          "rssi": 28,
          "satNum": 12,
          "lng": 113.123456,
          "lat": 22.654321,
          "lastPosAt": "2026-07-26 17:00:00"
        }
      }
    ],
    "total": 3,
    "page": 1,
    "pageSize": 10
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| items[].deviceId | string | 设备ID（IMEI/SN），与 device.deviceId 相同，顶层冗余便于直接取用 |
| items[].isDefault | bool | 是否默认设备 |
| items[].displayNo | string | 对外展示号 |
| items[].device | object | 设备档案 + 实时态，字段如下 |
| device.deviceName | string | 设备名称 |
| device.deviceStatus | int | 设备激活状态：1=已激活 2=待上电激活 -1=已过期（registry `device_active_status`） |
| device.onlineStatus | int | 在线状态：0-离线 1-在线 |
| device.motionState | int | 运动状态：0-静止 1-运动 |
| device.motionStateKeepDuration | int64 | 运动状态持续时长（秒），JSON 中为字符串（见 0.2） |
| device.powerPercent | int | 电量百分比 0-100 |
| device.charge | int | 充电状态：0-未充电 1-充电中 |
| device.productType | int | 0无线 1有线 |
| device.rssi | int | 信号强度 dBm |
| device.satNum | int | 卫星数 |
| device.lng / device.lat | double | 经纬度 |
| device.lastPosAt | string | 最后定位时间，无值时缺省 |
| total / page / pageSize | int | 分页信封，见 0.2 |

> 列表元素不含 speed/acc/posType 等瞬时字段——列表页不需要；单设备的完整实时态用 6.2。

---

### 1.10 获取当前设备信息

```
GET /v1/devices/current
鉴权：account 或 device token
```

说明：
- **设备登录**：后端从 token 取 deviceId，返回该设备信息。
- **手机号登录**：后端查 `is_default=true` 的设备返回。

返回结构与 [6.2 首页实时状态](#62-首页实时状态) 完全一致（同一结构 DeviceNow），字段表见 6.2。

错误：
- `21007`：account 身份名下无任何绑定设备/无默认设备

---

### 1.11 设备登录下绑定手机号

```
POST /v1/auth/device/bind-account
鉴权：device token（phoneBound=false 时允许）
```

说明：设备登录后未绑定手机号时调用。如果手机号已有账号则关联；没有则创建新账号，此时必须同时提供 `newAccountPassword`。

请求参数：
```json
{
  "phone": "18123954617",
  "smsCode": "123456",
  "newAccountPassword": "mypassword"
}
```
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| phone | string | 是 | 手机号 |
| smsCode | string | 是 | 短信验证码 |
| newAccountPassword | string | 条件 | 手机号未注册时**必填**（新账号必须设置密码，缺失返回 `21009`）；已有账号则忽略 |

返回示例：
```json
{ "code": 0, "msg": "绑定成功", "data": null }
```

错误：
- `21004`：短信验证码错误
- `21008`：该设备已被其他账号绑定
- `21009`：手机号未注册且未提供 `newAccountPassword`

---

### 1.12 登出

```
POST /v1/auth/app/logout
鉴权：公开接口（无需有效 token）
```

说明：带 token 调用时吊销该 token；token 缺失、无效或已过期时同样返回成功（幂等），与 0.4 的公开接口约定一致。

返回示例：
```json
{ "code": 0, "msg": "已退出登录", "data": null }
```

---

### 1.13 切换默认设备

```
POST /v1/auth/app/devices/default
鉴权：account token
```

请求参数：
```json
{ "deviceId": "87078795936" }
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| deviceId | string | 是 | 要设为默认的设备ID |

返回示例：
```json
{ "code": 0, "msg": "切换成功", "data": null }
```

---

### 1.14 绑定设备到账号

与 6.4 为同一接口，请求/返回/错误以 [6.4 绑定设备](#64-绑定设备) 为准。

---

### 1.15 修改设备登录密码

```
POST /v1/auth/app/devices/change-password
鉴权：account token
```

请求参数：
```json
{
  "deviceId": "87078795936",
  "newPassword": "newpass123"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| deviceId | string | 是 | 设备ID |
| newPassword | string | 是 | 新登录密码 |

返回示例：
```json
{ "code": 0, "msg": "修改成功", "data": null }
```

错误：
- `21005`：新设备密码强度不达标（至少 8 位且不能为纯数字）

---

### 1.16 设备密码找回

```
POST /v1/auth/device/reset-password
鉴权：无需登录
```

说明：设备已绑定手机号时可用。

请求参数：
```json
{
  "deviceId": "87078795936",
  "phone": "18123954617",
  "smsCode": "123456",
  "newPassword": "newpass123"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| deviceId | string | 是 | 设备ID |
| phone | string | 是 | 已绑定设备的手机号 |
| smsCode | string | 是 | 短信验证码 |
| newPassword | string | 是 | 新设备登录密码 |

返回示例：
```json
{ "code": 0, "msg": "重置成功", "data": null }
```

错误：
- `21005`：新设备密码强度不达标（至少 8 位且不能为纯数字）

---

## 2. 微信绑定

### 2.1 绑定微信

```
POST /v1/auth/app/bind-wechat
鉴权：account token
```

请求参数：
```json
{ "credential": "wx_login_code" }
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| credential | string | 是 | 微信 `wx.login()` 返回的 code |

返回示例：
```json
{ "code": 0, "msg": "绑定成功", "data": null }
```

错误：
- `21013`：该微信已绑定其他账号

---

### 2.2 解绑微信

```
POST /v1/auth/app/unbind-wechat
鉴权：account token
```

说明：必须有手机号才能解绑（不能是唯一登录方式）。

返回示例：
```json
{ "code": 0, "msg": "微信解绑成功", "data": null }
```

错误：
- `21014`：请先绑定手机号后再解绑微信
- `21015`：当前账号未绑定微信

---

### 2.3 查询已绑定第三方账号

```
GET /v1/auth/app/oauth-accounts
鉴权：account token
```

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "items": [
      { "provider": "wechat", "boundAt": "2026-07-26 15:30:00" }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| items[].provider | string | 第三方平台：wechat |
| items[].boundAt | string | 绑定时间 |

---

## 3. 我的页面菜单

### 3.1 获取我的页面菜单

```
GET /v1/auth/app/mine/menus
鉴权：account token
```

说明：根据当前登录身份（通过 token 的 `IdentityType`），返回不同的菜单列表。

返回示例（手机号登录）：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "accountLabel": {
      "primary": "18123954617",
      "secondary": "DEV001"
    },
    "menus": [
      { "code": "account_security", "title": "账号与安全" },
      { "code": "add_device", "title": "添加设备" },
      { "code": "auto_update", "title": "自动检测更新" },
      { "code": "recharge_orders", "title": "充值订单" },
      { "code": "operation_records", "title": "操作记录" },
      { "code": "about", "title": "关于" }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| accountLabel.primary | string | 第一行大字：手机号 |
| accountLabel.secondary | string | 第二行小字：设备展示号 displayNo |
| menus[].code | string | 菜单功能编码 |
| menus[].title | string | 菜单显示标题 |

### 3.2 获取我的页面菜单（设备登录）

```
GET /v1/devices/{deviceId}/mine/menus
鉴权：device token
```

说明：设备登录下的"我的"页面菜单。`accountLabel.secondary` 只在已绑定手机号时返回。

返回示例（设备登录，已绑定手机号）：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "accountLabel": {
      "primary": "87078795936",
      "secondary": "181****4617"
    },
    "menus": [
      { "code": "account_security", "title": "账号与安全" },
      { "code": "auto_update", "title": "自动检测更新" },
      { "code": "recharge_orders", "title": "充值订单" },
      { "code": "operation_records", "title": "操作记录" },
      { "code": "about", "title": "关于" }
    ]
  }
}
```

返回示例（设备登录，未绑定手机号）：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "accountLabel": {
      "primary": "87078795936",
      "secondary": ""
    },
    "menus": [
      { "code": "auto_update", "title": "自动检测更新" },
      { "code": "about", "title": "关于" }
    ]
  }
}
```

> **返回字段同 [3.1](#31-获取我的页面菜单)**，`accountLabel.primary` 为设备ID，`secondary` 为手机号（已绑定时显示，未绑定为空）。

---

## 4. 账号与安全

### 4.1 修改登录密码

```
PUT /v1/auth/app/password
鉴权：account token
```

请求参数：
```json
{
  "oldPassword": "oldpass123",
  "newPassword": "newpass456"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| oldPassword | string | 否 | 旧密码（第三方登录未设过密码时为空） |
| smsCode | string | 否 | 短信验证码（配合 1.2 获取）。未设置过密码的账号必传，此时 `oldPassword` 留空；已设密码的账号忽略 |
| newPassword | string | 是 | 新登录密码 |

说明：第三方登录用户未设过密码时，`oldPassword` 留空、改传 `smsCode` 走短信验证码校验。

返回示例：
```json
{ "code": 0, "msg": "修改成功", "data": null }
```

错误：
- `20005`：旧密码错误
- `21004`：短信验证码错误（走验证码校验路径时）

---

### 4.2 短信重置密码

```
POST /v1/auth/app/password/reset
鉴权：无需登录
```

请求参数：
```json
{
  "phone": "18123954617",
  "smsCode": "123456",
  "newPassword": "newpass456"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| phone | string | 是 | 手机号 |
| smsCode | string | 是 | 短信验证码 |
| newPassword | string | 是 | 新登录密码 |

返回示例：
```json
{ "code": 0, "msg": "重置成功", "data": null }
```

---

### 4.3 获取安全信息

```
GET /v1/auth/app/security
鉴权：account token
```

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "phone": "181****4617",
    "hasPassword": true,
    "wechatBound": true,
    "registeredAt": "2026-07-20 10:00:00"
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| phone | string | 手机号（中间4位脱敏） |
| hasPassword | bool | 是否已设置登录密码 |
| wechatBound | bool | 是否已绑定微信 |
| registeredAt | string | 注册时间 |

---

## 5. 应用配置

### 5.1 检测更新

```
GET /v1/app/version
鉴权：无需登录
```

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "currentVersion": "1.0.0",
    "latestVersion": "1.1.0",
    "hasUpdate": true,
    "updateDesc": "新增设备菜单",
    "downloadUrl": "https://cdn.example.com/app/release/1.1.0.apk",
    "forceUpdate": false
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| currentVersion | string | 当前安装版本号 |
| latestVersion | string | 最新可用版本号 |
| hasUpdate | bool | 是否有新版本可更新 |
| updateDesc | string | 更新说明 |
| downloadUrl | string | 新版本下载地址 |
| forceUpdate | bool | 是否强制更新（true=用户必须更新后才能继续使用） |

---

### 5.2 关于我们

```
GET /v1/app/about
鉴权：无需登录
```

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "appName": "铭智物联",
    "version": "1.0.0",
    "copyright": "Copyright © 2026",
    "website": "https://www.example.com",
    "email": "support@example.com"
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| appName | string | App 名称 |
| version | string | App 版本号 |
| copyright | string | 版权信息 |
| website | string | 官方网站地址 |
| email | string | 联系邮箱 |

---

## 6. 设备模块

> 数据来源约定：
> - 档案字段（deviceName、model、iccid、displayNo、激活/有效期等）来自 MySQL `lot_device`
> - 实时字段（电量、信号、经纬度、速度、ACC、里程等）来自 iot-runtime，不在 MySQL 存储
> - 接口返回时合并两源数据

### 6.1 设备详情（设备信息页）

```
GET /v1/devices/{deviceId}
鉴权：account 或 device token
```

说明：设备信息页的**档案**接口，以人维护的档案字段为主，附少量实时字段。在线状态、经纬度、电量等完整实时态用 6.2 获取，本接口不返回。

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "deviceId": "87078795936",
    "displayNo": "DEV001",
    "deviceName": "基础定位终端Pro",
    "deviceType": "TZ-A6L",
    "model": "多模终端主板V2.2(V1.01)",
    "iccid": "89861120225042234704",
    "deptName": "福建小盯科技有限公司",
    "activationStatus": 1,
    "activatedAt": "2026-01-31 18:16:55",
    "expiredAt": "2030-07-26",
    "installedAt": "2026-01-31",
    "initialMileage": "0",
    "productType": 0,
    "productCategoryType": 1,
    "speed": 0,
    "acc": 1,
    "direct": 180,
    "voltage": 12.5,
    "todayMileage": "35"
  }
}
```

| 字段 | 类型 | 来源 | 说明 |
|------|------|------|------|
| deviceId | string | MySQL | 设备号（IMEI/SN） |
| displayNo | string | MySQL | 对外展示号 |
| deviceName | string | MySQL | 设备名称 |
| deviceType | string | MySQL | 设备类型 |
| model | string | MySQL | 设备型号 |
| iccid | string | MySQL | SIM卡ICCID |
| deptName | string | MySQL | 所属组织名称 |
| activationStatus | int | MySQL | 激活状态：0未激活 1已激活 2已停机 |
| activatedAt | string | MySQL | 激活日期 |
| expiredAt | string | MySQL | 平台有效期 |
| installedAt | string | MySQL | 安装日期，YYYY-MM-DD |
| initialMileage | int64 | MySQL | 初始里程(KM)，JSON 中为字符串（见 0.2） |
| productType | int | MySQL | 0无线 1有线 |
| productCategoryType | int | MySQL | 产品品类类型（lot_product） |
| speed | double | iot-runtime | 当前速度(km/h) |
| acc | int | iot-runtime | ACC状态：1开 0关 |
| direct | int | iot-runtime | 方向角(度) |
| voltage | double | iot-runtime | 电压(V) |
| todayMileage | int64 | iot-runtime | 今日里程(米)，JSON 中为字符串（见 0.2） |

> 固件/硬件版本本期**不返回**（设备上报数据，按 doc/08 归 iot-runtime，透出依赖 D-5；落地后以新增字段提供，不占用现有字段名）。

---

### 6.2 首页实时状态

```
GET /v1/devices/{deviceId}/realtime
鉴权：account 或 device token
```

说明：返回首页需要的实时态核心字段（结构 DeviceNow，1.10 与本接口同结构，前端按需取用）。

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "deviceId": "87078795936",
    "displayNo": "DEV001",
    "deviceName": "87078795936",
    "onlineStatus": 1,
    "motionState": 0,
    "motionStateKeepDuration": "3600",
    "powerPercent": 94,
    "charge": 0,
    "productType": 0,
    "rssi": 28,
    "satNum": 12,
    "speed": 0,
    "acc": 1,
    "totalMileage": "12580",
    "todayMileage": "35",
    "direct": 180,
    "voltage": 12.5,
    "iccid": "89861120225042234704",
    "lng": 113.123456,
    "lat": 22.654321,
    "lastPosAt": "2026-07-26 17:00:00"
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| deviceId | string | 设备ID（IMEI/SN） |
| displayNo | string | 设备展示号（对外显示） |
| deviceName | string | 设备名称（用户自定义） |
| onlineStatus | int | 在线状态：1=在线 0=离线 |
| motionState | int | 运动状态：0=静止 1=运动 |
| motionStateKeepDuration | int64 | 运动状态持续时长（秒），JSON 中为字符串（见 0.2） |
| powerPercent | int | 电量百分比（0-100） |
| charge | int | 充电状态：0=未充电 1=充电中 |
| productType | int | 0无线 1有线 |
| rssi | int | GSM 信号强度 |
| satNum | int | GPS 卫星数量 |
| speed | double | 当前速度（km/h） |
| acc | int | ACC 状态：0=关闭 1=开启 |
| totalMileage | int64 | 累计里程（米），JSON 中为字符串（见 0.2） |
| todayMileage | int64 | 今日里程（米），JSON 中为字符串（见 0.2） |
| direct | int | 航向（度，0-360） |
| voltage | double | 电压（V） |
| iccid | string | SIM卡ICCID |
| lng | double | 经度 |
| lat | double | 纬度 |
| lastPosAt | string | 最后定位时间 YYYY-MM-DD HH:mm:ss，无值时缺省 |

> 本接口不返回 deviceStatus（激活状态属档案，见 6.1 activationStatus）、posType/posTypeName（定位类型仅轨迹点位提供，见 8.3）、offlineDuration（前端可由 lastPosAt 自行计算展示）。

---

### 6.3 设备列表（分页，用于首页下拉切换）

```
GET /v1/auth/app/devices?page=1&pageSize=10
鉴权：account token
```

同 1.9，返回分页的设备列表。前端首页下拉切换设备时使用。

---

### 6.4 绑定设备

```
POST /v1/auth/app/devices/bind
鉴权：account token
```

同 1.14，绑定前需校验设备密码（与设备登录同一套密码，DR-11；旧路由 `POST /v1/devices/bind` 与免密 displayNo 语义已退役）。

请求参数：
```json
{
  "deviceId": "87078795936",
  "password": "123456",
  "deviceName": "我的车"
}
```
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| deviceId | string | 是 | 设备号 |
| password | string | 是 | 设备登录密码 |
| deviceName | string | 否 | 设备名称（不传则默认用设备号） |

返回示例：
```json
{
  "code": 0,
  "msg": "绑定成功",
  "data": {
    "deviceId": "87078795936",
    "displayNo": "DEV001"
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| deviceId | string | 设备ID（IMEI/SN） |
| displayNo | string | 设备展示号（对外显示） |

错误：
- `21008`：设备已被其他账号绑定
- `21012`：设备密码错误

---

### 6.5 解绑设备

```
POST /v1/auth/app/devices/unbind
鉴权：account token
```

请求参数：
```json
{
  "deviceId": "87078795936"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| deviceId | string | 是 | 要解绑的设备ID |

返回示例：
```json
{ "code": 0, "msg": "解绑成功", "data": null }
```

错误：
- `21017`：不能解绑最后一个设备（账号下必须保留至少一台设备）

---

### 6.6 修改设备名称

```
PATCH /v1/devices/{deviceId}
鉴权：account 或 device token
```

请求参数：
```json
{
  "deviceName": "我的新车"
}
```
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| deviceName | string | 是 | 新名称，≤25字符 |

返回示例：
```json
{ "code": 0, "msg": "修改成功", "data": null }
```

---

## 7. 平台服务

> 流量卡、分享定位、声音安防 —— 功能页"平台服务"分组

### 7.1 流量卡 — 查询 SIM 卡信息

```
GET /v1/devices/{deviceId}/sim
鉴权：account 或 device token
```

说明：查询设备 SIM 卡信息（ICCID、运营商、套餐、流量使用情况）。

**数据来源**（两阶段合并）：
- ICCID / SIM 基本信息 → `lot_device.iccid`（或 iot-runtime 设备快照）
- 流量余额（total/used/remain）→ `lot_device_traffic` 表（购买充值后写入）
- 套餐名称/到期时间 → `lot_device_traffic` + `lot_order` 关联查询
- 运营商归属 → 根据 ICCID 前6位本地识别，无需对接运营商接口

> **流量充值**：用户点击"充值"按钮 → 跳转流量包列表（[11.1.2](#1112-流量包产品列表)）→ 下单支付。

请求：无额外参数（deviceId 走路径）。

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "iccid": "898602B81122C0123456",
    "carrier": "中国移动",
    "deviceId": "87078795936",
    "totalFlow": 10240,
    "usedFlow": 2560,
    "remainFlow": 7680,
    "packageName": "月享10G套餐",
    "expiredAt": "2026-08-31",
    "flowUnit": "MB"
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| iccid | string | SIM卡唯一标识 ICCID |
| carrier | string | 运营商：中国移动/中国联通/中国电信/中国广电；前缀无法识别时为"未知" |
| deviceId | string | 关联设备ID |
| totalFlow | number | 套餐总流量（MB） |
| usedFlow | number | 已用流量（MB） |
| remainFlow | number | 剩余流量（MB） |
| packageName | string | 套餐名称 |
| expiredAt | string | 套餐到期日期，YYYY-MM-DD |
| flowUnit | string | 流量单位，固定 "MB" |

---

### 7.2 分享定位

```
POST   /v1/devices/{deviceId}/share-location    — 生成分享链接
GET    /v1/share/{token}                          — 查看分享位置（无需登录）
DELETE /v1/devices/{deviceId}/share-location      — 撤销分享
鉴权：account 或 device token（GET /v1/share/{token} 无需登录）
```

说明：生成临时 token 分享设备实时位置给他人查看，token 有过期时间，过期后自动失效。与普通鉴权 token 独立。

- 重复调用 7.2.1 每次生成一条**新**分享，历史未过期分享不受影响（同一设备可同时存在多条有效分享）。
- 7.2.3 撤销的是该设备名下**所有**未过期分享，不支持按单条撤销。

#### 7.2.1 生成分享链接

```
POST /v1/devices/{deviceId}/share-location
```

请求参数：
```json
{
  "expireHours": 24
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| expireHours | int | 否 | 有效期（小时），默认 24，最大 168（7天） |

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "token": "G0DWnKbh3xQz7Rf2",
    "shareUrl": "https://app.qzwlvp.com/pagesMore/public/locate?code=G0DWnKbh3xQz7Rf2",
    "expiredAt": "2026-07-27 17:00:00"
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| token | string | 临时分享 token（16 字符 base62，密码学随机） |
| shareUrl | string | 完整分享链接 |
| expiredAt | string | 过期时间，YYYY-MM-DD HH:mm:ss |

#### 7.2.2 查看分享位置（公开接口）

```
GET /v1/share/{token}
无需登录
```

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "deviceName": "DEV001",
    "onlineStatus": 1,
    "powerPercent": 94,
    "lng": 113.123456,
    "lat": 22.654321,
    "lastPosAt": "2026-07-26 17:00:00",
    "speed": 35,
    "direct": 180
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| deviceName | string | 设备名称 |
| onlineStatus | int | 在线状态：1在线 0离线 |
| powerPercent | int | 电量百分比 |
| lng | double | 经度 |
| lat | double | 纬度 |
| lastPosAt | string | 最后定位时间 |
| speed | double | 速度（km/h） |
| direct | int | 航向（度） |

错误：
- `21020`：分享链接已过期或已被撤销

#### 7.2.3 撤销分享

```
DELETE /v1/devices/{deviceId}/share-location
```

请求：无额外参数。返回：`{"code": 0, "msg": "撤销成功", "data": null}`

新增数据库表 `lot_share_location`：DDL 权威版见 [design §4](./11-app-user-module-design.md#4-数据库变更全部-ddl)（已随 `migrations/mysql/device-app/002` 落库）。

---

### 7.3 声音安防 — 音频管理

```
GET  /v1/devices/{deviceId}/audios        — 音频列表
POST /v1/devices/{deviceId}/audios/trigger — 触发拾音
GET  /v1/devices/{deviceId}/audios/{id}/file — 获取音频文件
鉴权：account 或 device token
```

说明：仅 HLXT 设备支持拾音功能（`S_AUDIO_AL` 指令，参数 `open: true/false`）。音频链路：设备上报 Kafka 音频流 → iot-runtime 上传对象存储、元数据落 **Mongo**（DR-5），本模块代理 iot-runtime 查询。音频是设备上报数据，按 doc/08 红线不落 MySQL——管理面旧表 `lot_recording`/`lot_audio` 与本链路无关。

#### 7.3.1 音频列表

```
GET /v1/devices/{deviceId}/audios?page=1&pageSize=10
```

请求参数：仅分页参数，见 0.2。

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "items": [
      {
        "id": "a1b2c3d4e5f60718",
        "audioName": "音频_202607261600",
        "deviceId": "87078795936",
        "duration": 0,
        "fileUrl": "https://cdn.xxx.com/audio/xxx.mp3",
        "createdAt": "2026-07-26 16:00:00"
      }
    ],
    "total": 1,
    "page": 1,
    "pageSize": 10
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| id | string | 音频记录ID（iot-runtime eventId，字符串，**不是数字**） |
| audioName | string | 音频名称（服务端按上传时间生成） |
| deviceId | string | 设备ID |
| duration | int | 音频时长（秒）。**暂缺**：元数据补时长依赖 D-4，落地前恒为 0，前端勿据此渲染进度条总长 |
| fileUrl | string | 音频文件URL |
| createdAt | string | 创建时间 |

#### 7.3.2 触发拾音

```
POST /v1/devices/{deviceId}/audios/trigger
```

说明：下发 `S_AUDIO_AL` 指令（`open: true`）开启拾音。仅 HLXT 设备支持，设备离线或非 HLXT 设备返回错误。

请求参数：
```json
{ "duration": 60 }
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| duration | int | 否 | 拾音时长（秒），默认 60，最大 300。**本期仅做范围校验、不生效**——设备协议无时长参数，实际拾音时长由设备固件默认值决定 |

返回示例：
```json
{
  "code": 0,
  "msg": "拾音指令已下发",
  "data": {
    "requestId": "abc123",
    "cmdCode": "S_AUDIO_AL"
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| requestId | string | 指令请求ID |
| cmdCode | string | 指令编码 |

错误：
- `21021`：该设备不支持拾音（`S_AUDIO_AL` 仅 HLXT 协议设备支持）
- `21023`：指令已下发但设备未在超时时间内应答

> 设备离线时返回 `ret=10`。`S_AUDIO_AL` 在 registry 中为 `offline_policy: allowed`，可传 `canOffline=1` 待设备上线后补发。

#### 7.3.3 获取音频文件

```
GET /v1/devices/{deviceId}/audios/{id}/file
```

请求：无额外参数。返回：**302 重定向**到 CDN 文件地址，或直接返回二进制音频流。

---

## 8. 功能设置

> 立即定位、电子围栏、历史轨迹、定位模式、报表、告警设置、导航 —— 功能页"功能设置"分组

### 8.1 立即定位

```
POST /v1/devices/{deviceId}/locate
鉴权：account 或 device token
```

说明：下发 `A_POS_NOW` 指令要求设备立即上报当前位置。instruction 通过 iot-runtime gate 下发，设备收到后上报最新定位数据。

请求：无额外参数。

返回示例：
```json
{
  "code": 0,
  "msg": "指令已下发",
  "data": {
    "requestId": "req_202607261700_abc123",
    "cmdCode": "A_POS_NOW",
    "deviceId": "87078795936"
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| requestId | string | 指令请求ID，可通过 10.2 操作记录按此 ID 追溯执行结果 |
| cmdCode | string | 指令编码（A_POS_NOW） |
| deviceId | string | 目标设备ID |

错误：
- `21023`：指令已下发但设备未在超时时间内应答

> **`A_POS_NOW` 不支持离线补发**（registry 中为 `offline_policy: forbidden`——补发一条过期的定位请求没有意义）。设备离线时直接返回 `ret=10`，前端应提示"设备离线，请稍后重试"，不要提示"已排队，上线后执行"。

说明：指令下发为异步，下发成功后需等待设备上报新位置。前端下发后可调用 6.2（首页实时状态）轮询最新位置。

---

### 8.2 电子围栏 — C端 CRUD

```
GET    /v1/devices/{deviceId}/fences              — 围栏列表
GET    /v1/fences/{fenceId}                        — 围栏详情
POST   /v1/devices/{deviceId}/fences               — 创建围栏
PUT    /v1/fences/{fenceId}                         — 更新围栏
DELETE /v1/fences/{fenceId}                         — 删除围栏
鉴权：account 或 device token
```

说明：C端围栏关联到当前设备。围栏的权威存储在 **iot-runtime（Mongo `fence`）**——围栏进出告警的判定引擎只读那里，本模块全部代理 iot-runtime 的 fence 端点（DR-3）；MySQL `lot_fence*` 是管理面历史存储，不参与 C 端功能。形状仅支持圆形。

**坐标系约定**：本模块出入参经纬度一律为 **GCJ-02**（腾讯/高德地图坐标）。服务端负责与 iot-runtime 的 WGS-84 存储互转，前端直接用地图组件坐标即可，不要自行换算。

> ⚠️ **使能开关过渡注记**：`enterAlarmEnable` / `getOutAlarmEnable` 在 iot-runtime 扩展（D-2）落地前**只回显不生效**——绑定设备的进/出围栏告警恒为开启。D-2 落地后自动生效，契约不变。

#### 8.2.1 围栏列表

```
GET /v1/devices/{deviceId}/fences?page=1&pageSize=10
```

请求参数：仅分页参数，见 0.2。

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "items": [
      {
        "fenceId": "68",
        "fenceName": "公司周边",
        "fenceShapeType": 1,
        "fenceRadius": 200,
        "centerLat": 22.650091,
        "centerLng": 114.040375,
        "enterAlarmEnable": true,
        "getOutAlarmEnable": true,
        "createdAt": "2025-06-21 16:03:03",
        "updatedAt": "2025-07-22 07:32:40"
      }
    ],
    "total": 1,
    "page": 1,
    "pageSize": 10
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| fenceId | string | 围栏ID |
| fenceName | string | 围栏名称 |
| fenceShapeType | int | 形状类型：1=圆形（本期仅支持圆形） |
| fenceRadius | int | 半径（米） |
| centerLat | double | 围栏中心纬度 |
| centerLng | double | 围栏中心经度 |
| enterAlarmEnable | bool | 进入围栏告警使能 |
| getOutAlarmEnable | bool | 走出围栏告警使能 |
| createdAt | string | 创建时间 |
| updatedAt | string | 最后更新时间 |

#### 8.2.2 围栏详情

```
GET /v1/fences/{fenceId}
```

返回为**嵌套结构**：围栏本体在 `fence` 对象内（字段同 8.2.1 的 items 元素），外层附 `bindDeviceIds`：

```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "fence": {
      "fenceId": "68",
      "fenceName": "公司周边",
      "fenceShapeType": 1,
      "fenceRadius": 200,
      "centerLat": 22.650091,
      "centerLng": 114.040375,
      "enterAlarmEnable": true,
      "getOutAlarmEnable": true,
      "createdAt": "2025-06-21 16:03:03",
      "updatedAt": "2025-07-22 07:32:40"
    },
    "bindDeviceIds": ["87078795936"]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| fence | object | 围栏本体，字段同 8.2.1 的 items 元素 |
| bindDeviceIds | string[] | 关联设备ID列表（仅含当前用户可见设备） |

#### 8.2.3 创建围栏

```
POST /v1/devices/{deviceId}/fences
```

请求参数：
```json
{
  "fenceName": "公司周边",
  "centerLat": 22.650091,
  "centerLng": 114.040375,
  "fenceRadius": 200,
  "enterAlarmEnable": true,
  "getOutAlarmEnable": true
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| fenceName | string | 是 | 围栏名称，≤25字符 |
| centerLat | double | 是 | 围栏中心纬度 |
| centerLng | double | 是 | 围栏中心经度 |
| fenceRadius | int | 是 | 半径（米），≥50 |
| enterAlarmEnable | bool | 否 | 进入围栏告警使能，默认 false |
| getOutAlarmEnable | bool | 否 | 走出围栏告警使能，默认 false |

返回示例：
```json
{
  "code": 0,
  "msg": "创建成功",
  "data": { "fenceId": "100" }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| fenceId | string | 新创建的围栏ID |

错误：
- `21018`：同一设备下围栏名称已存在
- `21019`：该设备的围栏数量已达上限

#### 8.2.4 更新围栏

```
PUT /v1/fences/{fenceId}
```

请求参数：同创建（8.2.3），所有字段均可选（传入则更新，不传则保持）。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| fenceName | string | 否 | 围栏名称，≤25字符 |
| centerLat | double | 否 | 围栏中心纬度 |
| centerLng | double | 否 | 围栏中心经度 |
| fenceRadius | int | 否 | 半径（米），≥50 |
| enterAlarmEnable | bool | 否 | 进入围栏告警使能 |
| getOutAlarmEnable | bool | 否 | 走出围栏告警使能 |

返回：`{"code": 0, "msg": "更新成功", "data": null}`

错误：
- `21018`：同一设备下围栏名称已存在
- `21027`：围栏不存在

#### 8.2.5 删除围栏

```
DELETE /v1/fences/{fenceId}
```

请求：无额外参数。返回：`{"code": 0, "msg": "删除成功", "data": null}`

错误：
- `21027`：围栏不存在

---

### 8.3 历史轨迹

```
GET /v1/devices/{deviceId}/track?startTime=2026-07-26+00:00:00&endTime=2026-07-26+23:59:59&limit=5000
鉴权：account 或 device token
```

说明：查询设备在指定时间段内的轨迹点。时间跨度不得超过 7 天。

> **本接口不采用 page/pageSize 分页**，改用 `limit` 上限 + 截断标记：轨迹点是按时间连续的序列，翻页语义对地图绘制没有意义，前端需要的是"这段时间的完整轨迹"或"明确知道数据不完整"。追踪模式下（约 10s 一次上报）单日可产生约 8600 个点、7 天上限约 6 万个点，因此必须有上限保护。

请求参数：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| startTime | string | 是 | 开始时间，YYYY-MM-DD HH:mm:ss |
| endTime | string | 是 | 结束时间，YYYY-MM-DD HH:mm:ss，与 startTime 跨度不得超过 7 天 |
| posTypes | string | 否 | 定位类型过滤，逗号分隔，如 "1,2"。枚举见下方"定位类型（posType）"说明 |
| minSpeed | number | 否 | 最小速度过滤（km/h），过滤掉低于此速度的点，用于剔除静止时的定位抖动噪点。不传=不过滤 |
| limit | int | 否 | 单次返回的最大点数，默认 10000，最大 10000。超出时按时间正序截断，`truncated` 置为 `true` |

**定位类型（posType）枚举**

> 码值权威定义见 `contracts/enums/registry.yaml` 的 `pos_type`，下表由其派生。
> 注意 **2 是 WIFI、3 是基站**，不是 "GPS/LBS/WIFI" 的直觉顺序。

| 值 | 名称 | 说明 |
|----|------|------|
| 0 | 未定位 | 本次上报未取得定位 |
| 1 | 卫星定位 | GPS/北斗等卫星定位，精度最高 |
| 2 | WIFI定位 | 当前设备协议不产生此值 |
| 3 | 基站定位 | 单基站定位，精度较低 |
| 4 | 多基站定位 | 当前设备协议不产生此值 |
| 5 | 混合定位 | 当前设备协议不产生此值 |

前端展示定位方式时直接使用接口返回的 `posTypeName`，不要自行维护码值→中文的映射表。

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "items": [
      {
        "deviceId": "87078795936",
        "posAt": "2026-07-26 08:00:00",
        "posType": 1,
        "posTypeName": "卫星定位",
        "lat": 22.650091,
        "lng": 114.040375,
        "altitude": 15,
        "speed": 35.5,
        "direct": 180,
        "mileage": "12580",
        "satNum": 12
      }
    ],
    "total": 60480,
    "truncated": true
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| items[].deviceId | string | 设备ID |
| items[].posAt | string | 设备定位时间 |
| items[].posType | int | 定位类型码值，见上方枚举 |
| items[].posTypeName | string | 定位类型中文名，可直接展示 |
| items[].lat | double | 纬度 |
| items[].lng | double | 经度 |
| items[].altitude | int | 海拔（米） |
| items[].speed | double | 速度（km/h） |
| items[].direct | int | 航向（度，0-360） |
| items[].mileage | string | 累计里程（米）。**JSON 中为字符串**，见下方"int64 字段的序列化约定" |
| items[].satNum | int | 卫星数 |
| total | int | 时间范围内命中的**真实总数**（不是 items 的条数，发生截断时 `total > items.length`） |
| truncated | bool | 是否发生截断。`true` 表示还有数据未返回，前端应提示用户缩小时间范围 |

> int64 字段（如本接口的 `mileage`）在 JSON 中以字符串形式返回，约定见 0.2 "大整数字段"。

**字段用途对照**（各字段在轨迹回放页面的作用）：

| 字段 | 用途 |
|------|------|
| lat / lng | polyline 顶点坐标；播放时为当前进度的 marker 位置 |
| direct | 设备图标朝向的旋转角度（0-360°，正北为 0） |
| speed | 播放时的实时车速；可用于按速度区间给轨迹线分段变色 |
| posAt | 时间轴刻度、播放进度的时间基准 |
| posType | 定位方式图例。基站/WIFI 定位误差远大于 GPS，建议用不同颜色标出低精度点 |
| mileage | 区间里程 = 末点 `mileage` − 首点 `mileage`（注意先转数值） |
| satNum | 可选，定位质量角标 |
| total / truncated | `truncated=true` 时提示"数据未完整展示，请缩小时间范围" |

**使用建议**：

1. 查询入口建议提供单日预设（今天/昨天/前天）而非自由跨天区间，把单次查询点数控制在万级以内。
2. 移动端地图组件在千级点位以上绘制 polyline 会有性能压力，建议前端按距离阈值抽稀后再绘制。
3. `truncated=true` 时提示用户缩小时间范围，本期不提供自动分段续拉。

---

### 8.4 定位模式

```
GET /v1/devices/{deviceId}/location-mode  — 查询当前定位模式
PUT /v1/devices/{deviceId}/location-mode  — 设置定位模式
鉴权：account 或 device token
```

说明：定位模式控制设备上报频率。通过 `I_POS_MOD_LEVEL` 指令下发，参数 `level` 映射为：
- 1 = 追踪模式（高频上报，约 10s 一次）
- 2 = 普通模式（中频上报，约 30s 一次）
- 3 = 省电模式（低频上报，约 120s 一次）

> `I_POS_MOD_LEVEL` 在 `contracts/commands/registry.yaml` 中声明的 `level` 取值范围是 **1~5**，本接口当前只对 C 端开放 1~3 三档；4/5 档暂不暴露给用户。前端**以 8.4.1 返回的 `availableModes` 为准渲染选项**，不要硬编码三档——后续开放更多档位时接口会自动带出，无需前端改版。

#### 8.4.1 查询当前定位模式

```
GET /v1/devices/{deviceId}/location-mode
```

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "modeLevel": 2,
    "modeName": "普通模式",
    "modeDesc": "约30秒上报一次定位",
    "availableModes": [
      { "level": 1, "name": "追踪模式", "desc": "约10秒上报一次定位" },
      { "level": 2, "name": "普通模式", "desc": "约30秒上报一次定位" },
      { "level": 3, "name": "省电模式", "desc": "约120秒上报一次定位" }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| modeLevel | int | 当前模式级别 |
| modeName | string | 当前模式名称 |
| modeDesc | string | 当前模式说明 |
| availableModes | array | 可用模式列表（根据设备型号返回） |
| availableModes[].level | int | 模式级别 |
| availableModes[].name | string | 模式名称 |
| availableModes[].desc | string | 模式说明 |

#### 8.4.2 设置定位模式

```
PUT /v1/devices/{deviceId}/location-mode
```

请求参数：
```json
{ "level": 1 }
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| level | int | 是 | 模式级别：1=追踪 2=普通 3=省电。取值必须来自 8.4.1 返回的 `availableModes[].level` |

返回示例：
```json
{
  "code": 0,
  "msg": "指令已下发",
  "data": {
    "requestId": "req_xxx",
    "cmdCode": "I_POS_MOD_LEVEL",
    "level": 1
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| requestId | string | 指令请求ID |
| cmdCode | string | 指令编码 I_POS_MOD_LEVEL |
| level | int | 下发的定位模式级别 |

错误：
- `21021`：该设备不支持定位模式设置
- `21023`：指令已下发但设备未在超时时间内应答

---

### 8.5 报表

```
GET /v1/devices/{deviceId}/reports/trip?startDate=2026-07-01&endDate=2026-07-26&page=1&pageSize=10
GET /v1/devices/{deviceId}/reports/stay?startDate=2026-07-01&endDate=2026-07-26&page=1&pageSize=10
鉴权：account 或 device token
```

说明：行程报表和停留报表，由 iot-runtime 基于轨迹**实时分段计算**（DR-4），本模块代理查询并做分页与字段映射，不落库、不建定时任务（`lot_report_*` 两表不参与）。

> **覆盖范围**：轨迹原始数据保留 30 天，`startDate` 早于 30 天前的部分**查不到**——对应日期返回空段，不报错。单次查询日期跨度 ≤31 天，超出返回 `10001`。

#### 8.5.1 行程报表

```
GET /v1/devices/{deviceId}/reports/trip
```

请求参数：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| startDate | string | 是 | 开始日期，YYYY-MM-DD |
| endDate | string | 是 | 结束日期，YYYY-MM-DD |
| page | int | 否 | 页码，默认 1 |
| pageSize | int | 否 | 每页条数，默认 10，最大 50 |

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "items": [
      {
        "id": "123",
        "deviceId": "87078795936",
        "startedAt": "2026-07-26 08:00:00",
        "endedAt": "2026-07-26 09:30:00",
        "startLat": 22.6500910,
        "startLng": 114.0403750,
        "endLat": 22.6800000,
        "endLng": 114.1000000,
        "distance": 15.50,
        "duration": 5400,
        "maxSpeed": 80.00,
        "avgSpeed": 10.33
      }
    ],
    "total": 1,
    "page": 1,
    "pageSize": 10
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| id | int64 | 行程记录ID |
| deviceId | string | 设备ID |
| startedAt | string | 行程开始时间 |
| endedAt | string | 行程结束时间 |
| startLat | double | 起点纬度 |
| startLng | double | 起点经度 |
| endLat | double | 终点纬度 |
| endLng | double | 终点经度 |
| distance | double | 行程距离（km） |
| duration | int | 行程时长（秒） |
| maxSpeed | double | 最高速度（km/h） |
| avgSpeed | double | 平均速度（km/h） |

#### 8.5.2 停留报表

```
GET /v1/devices/{deviceId}/reports/stay
```

请求参数：同行程报表。

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "items": [
      {
        "id": "456",
        "deviceId": "87078795936",
        "startedAt": "2026-07-26 09:30:00",
        "endedAt": "2026-07-26 10:00:00",
        "lat": 22.6800000,
        "lng": 114.1000000,
        "duration": 1800
      }
    ],
    "total": 1,
    "page": 1,
    "pageSize": 10
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| id | int64 | 停留记录ID |
| deviceId | string | 设备ID |
| startedAt | string | 停留开始时间 |
| endedAt | string | 停留结束时间 |
| lat | double | 停留位置纬度 |
| lng | double | 停留位置经度 |
| duration | int | 停留时长（秒） |

---

### 8.6 告警设置

```
GET  /v1/devices/{deviceId}/alarm-settings         — 查询告警配置
PUT  /v1/devices/{deviceId}/alarm-settings         — 保存告警配置
GET  /v1/devices/{deviceId}/alarms                 — 告警记录列表
鉴权：account 或 device token
```

说明：告警配置存储于 iot-runtime（通过 `/alarm/alarmSetting/getByDeviceId` / `/alarm/alarmSetting/edit`）。告警记录来自 iot-runtime `/alarm/page`。

#### 8.6.1 查询告警配置

```
GET /v1/devices/{deviceId}/alarm-settings
```

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "deviceId": "87078795936",
    "deviceName": "DEV001",
    "alarmItems": [
      {
        "alarmCode": "S_SHAKE_AL",
        "alarmName": "震动告警",
        "alarmEnable": true,
        "alarmValue": "3",
        "alarmValueDesc": "中灵敏度"
      },
      {
        "alarmCode": "S_LOW_POWER_AL",
        "alarmName": "低电告警",
        "alarmEnable": true,
        "alarmValue": "",
        "alarmValueDesc": "开关"
      },
      {
        "alarmCode": "S_REMOVE_AL",
        "alarmName": "拆除告警",
        "alarmEnable": false,
        "alarmValue": "",
        "alarmValueDesc": "开关"
      }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| deviceId | string | 设备ID |
| deviceName | string | 设备名称 |
| alarmItems | array | 告警配置项列表 |
| alarmItems[].alarmCode | string | 告警类型编码 |
| alarmItems[].alarmName | string | 告警类型名称（中文） |
| alarmItems[].alarmEnable | bool | 是否启用 |
| alarmItems[].alarmValue | string | 告警阈值/参数值 |
| alarmItems[].alarmValueDesc | string | 阈值描述文案 |

#### 8.6.2 保存告警配置

```
PUT /v1/devices/{deviceId}/alarm-settings
```

请求参数：
```json
{
  "alarmItems": [
    { "alarmCode": "S_SHAKE_AL", "alarmEnable": true, "alarmValue": "3" },
    { "alarmCode": "S_LOW_POWER_AL", "alarmEnable": true, "alarmValue": "" }
  ]
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| alarmItems | array | 是 | 要更新的告警配置项（只传修改过的） |
| alarmItems[].alarmCode | string | 是 | 告警类型编码 |
| alarmItems[].alarmEnable | bool | 是 | 是否启用 |
| alarmItems[].alarmValue | string | 否 | 告警阈值，按告警类型定义 |

返回：`{"code": 0, "msg": "保存成功", "data": null}`

#### 8.6.3 告警记录列表

无独立接口。单设备告警记录使用 12.1 `GET /v1/alarms` 并将设备筛选参数固定为该设备，参数与返回字段以 12.1 为准。

---

### 8.7 导航

说明：导航功能无后端接口。前端从 6.2（首页实时状态）获取设备经纬度后，调用微信小程序 `wx.openLocation` API 打开地图导航。后端无需新增接口。

---

## 9. 设备设置

> 设备信息、自检、远程开关、远程设置 —— 功能页"设备设置"分组

### 9.1 设备信息

引用 6.1 `GET /v1/devices/{deviceId}` 接口，返回设备完整档案。功能页直接使用该接口展示设备信息。

---

### 9.2 自检

```
GET  /v1/devices/{deviceId}/self-check  — 查询最新自检结果
POST /v1/devices/{deviceId}/self-check  — 触发自检
鉴权：account 或 device token
```

说明：设备自检功能。自检指令为新增指令码，设备收到后返回自检结果（GPS 状态、GSM 信号、电池状态、ACC 状态、电压等）。自检结果由 iot-runtime 从设备上报的遥测数据中解析，缓存最新结果。

> 自检结果由设备最近一次上报的遥测数据组装。主动触发自检（9.2.2）依赖设备协议支持，当前 `SELF_CHECK` 尚未纳入指令契约，本期仅提供查询。

#### 9.2.1 查询最新自检结果

```
GET /v1/devices/{deviceId}/self-check
```

请求：无额外参数（deviceId 走路径）。

说明：自检结果由服务端基于设备最新遥测快照实时组装，共五项：GPS定位、GSM信号、电池状态、ACC状态、电压。

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "deviceId": "87078795936",
    "overallStatus": 1,
    "items": [
      { "itemCode": "gps",     "itemName": "GPS定位",  "status": 1, "detail": "卫星数12" },
      { "itemCode": "gsm",     "itemName": "GSM信号",  "status": 1, "detail": "信号强度28" },
      { "itemCode": "battery", "itemName": "电池状态", "status": 1, "detail": "94%" },
      { "itemCode": "acc",     "itemName": "ACC状态",  "status": 1, "detail": "车辆熄火" },
      { "itemCode": "voltage", "itemName": "电压",     "status": 1, "detail": "12.5V" }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| deviceId | string | 设备ID |
| overallStatus | int | 整体状态：1=全部通过 0=存在异常 |
| items | array | 自检项目列表 |
| items[].itemCode | string | 检查项编码（唯一标识） |
| items[].itemName | string | 检查项名称（中文，可直接展示） |
| items[].status | int | 状态：1=正常 0=异常 |
| items[].detail | string | 详细数据 |

错误：
- `21022`：自检功能暂不可用（设备从未上报过可用于组装自检结果的遥测数据）

#### 9.2.2 触发自检（本期可选）

```
POST /v1/devices/{deviceId}/self-check
```

请求：无额外参数。

返回示例：
```json
{
  "code": 0,
  "msg": "自检指令已下发",
  "data": {
    "requestId": "req_xxx",
    "cmdCode": "SELF_CHECK"
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| requestId | string | 指令请求ID |
| cmdCode | string | 指令编码 SELF_CHECK |

错误：
- `21022`：自检功能暂不可用
- `21021`：该设备不支持自检指令

> **待设备协议确认后实现**：`SELF_CHECK` 目前**不在** `contracts/commands/registry.yaml` 中，需与设备厂商确认指令码与参数后先补入 registry，再实现本接口。

---

### 9.3 远程开关

```
GET  /v1/devices/{deviceId}/switch-status  — 查询开关状态列表
POST /v1/devices/{deviceId}/switch         — 下发开关指令
鉴权：account 或 device token
```

说明：将设备远程控制功能统一展示为开关列表，每个开关对应一条指令。不走单指令下发 API，而是由业务层封装成统一的开关操作。所有开关指令通过通用的 `POST /v1/devices/{deviceId}/commands` 下发（参数由开关名称映射为 `cmdCode` + `params`）。

#### 9.3.1 查询开关状态

```
GET /v1/devices/{deviceId}/switch-status
```

说明：根据设备型号（协议类型）返回可用的开关列表及当前状态。状态优先取 iot-runtime 遥测快照；快照未透出的开关退而取该设备该指令最近一次成功下发的参数；两者都没有时为 `unknown`。

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "deviceId": "87078795936",
    "switches": [
      {
        "switchCode": "device_power",
        "switchName": "设备关机",
        "switchIcon": "power",
        "status": "off",
        "statusText": "已开机",
        "cmdCode": "S_CLOSE",
        "cmdParams": { "open": false }
      },
      {
        "switchCode": "defense",
        "switchName": "设防/撤防",
        "switchIcon": "shield",
        "status": "off",
        "statusText": "已撤防",
        "cmdCode": "S_DEFENSE",
        "cmdParams": { "open": false }
      },
      {
        "switchCode": "oil_electricity",
        "switchName": "断油断电",
        "switchIcon": "engine",
        "status": "off",
        "statusText": "正常供油",
        "cmdCode": "S_DIS_OIL_ELE",
        "cmdParams": { "cut": false }
      },
      {
        "switchCode": "shake_alarm",
        "switchName": "震动告警",
        "switchIcon": "vibration",
        "status": "on",
        "statusText": "已开启",
        "cmdCode": "S_SHAKE_AL",
        "cmdParams": { "level": 3 }
      }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| deviceId | string | 设备ID |
| switches | array | 可用开关列表 |
| switches[].switchCode | string | 开关编码（唯一标识） |
| switches[].switchName | string | 开关名称（中文） |
| switches[].switchIcon | string | 开关图标标识 |
| switches[].status | string | 当前状态："on" / "off" / **"unknown"**（无快照且无下发记录，statusText 为"待同步"）。前端开关组件需处理第三态，勿把 unknown 当 off 渲染 |
| switches[].statusText | string | 状态描述文案 |
| switches[].cmdCode | string | 对应指令编码 |
| switches[].cmdParams | object | 指令参数（翻转为反向值下发） |

#### 9.3.2 切换开关

开关的下发**直接使用 10.1 通用指令接口**，不另设专用接口：

```
POST /v1/devices/{deviceId}/commands
```

前端从 9.3.1 拿到某个开关的 `cmdCode` 与 `cmdParams` 后，把 `cmdParams` 中的状态值改为目标状态，直接作为 10.1 的 `cmdCode` + `params` 提交即可。

示例——将「设备关机」开关从当前的"已开机"切换为关机：

9.3.1 返回该开关为 `{"switchCode":"device_power","cmdCode":"S_CLOSE","cmdParams":{"open":false}}`，则提交：

```json
{
  "cmdCode": "S_CLOSE",
  "params": { "open": true }
}
```

请求参数与返回结构完全同 10.1，`switchCode` 仅用于前端自身的状态管理，不需要提交给服务端。

---

### 9.4 远程设置

```
GET  /v1/devices/{deviceId}/remote-settings  — 查询可设置的远程配置项
POST /v1/devices/{deviceId}/remote-settings  — 下发远程设置
鉴权：account 或 device token
```

说明：远程设置通过已有的命令树（`GET /v1/devices/{deviceId}/commands`）加载可用指令构建配置表单。用户修改设置后通过通用 `POST /v1/devices/{deviceId}/commands` 接口下发对应指令。

#### 9.4.1 查询可设置项

```
GET /v1/devices/{deviceId}/remote-settings
```

说明：根据设备可用的命令树（`lot_cmd` 表），筛选标记为"远程设置"类的指令，返回可配置项列表。每个配置项为一个指令模板。

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "deviceId": "87078795936",
    "settings": [
      {
        "settingCode": "pos_mod_level",
        "settingName": "定位模式",
        "settingDesc": "控制设备定位上报频率",
        "cmdCode": "I_POS_MOD_LEVEL",
        "paramsDef": [
          {
            "key": "level",
            "label": "上报模式",
            "type": "select",
            "options": [
              { "value": 1, "label": "追踪模式" },
              { "value": 2, "label": "普通模式" },
              { "value": 3, "label": "省电模式" }
            ]
          }
        ]
      },
      {
        "settingCode": "shake_alarm_level",
        "settingName": "震动告警灵敏度",
        "settingDesc": "控制震动告警触发灵敏度",
        "cmdCode": "S_SHAKE_AL",
        "paramsDef": [
          {
            "key": "level",
            "label": "灵敏度",
            "type": "select",
            "options": [
              { "value": 1, "label": "低" },
              { "value": 2, "label": "中低" },
              { "value": 3, "label": "中" },
              { "value": 4, "label": "中高" },
              { "value": 5, "label": "高" }
            ]
          }
        ]
      }
    ]
  }
}
```

> `S_SHAKE_AL` 在 registry 中声明的 `level` 范围是 **0~9**，本接口只对 C 端开放 1~5 档并映射为中文档位。前端**以 `paramsDef[].options` 渲染选项**，不要硬编码档位数量。

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| deviceId | string | 设备ID |
| settings | array | 可设置项列表 |
| settings[].settingCode | string | 设置编码（唯一标识） |
| settings[].settingName | string | 设置名称（中文） |
| settings[].settingDesc | string | 设置说明 |
| settings[].cmdCode | string | 对应指令编码 |
| settings[].paramsDef | array | 参数定义（用于前端渲染表单与组装下发参数） |
| paramsDef[].key | string | 参数键名 |
| paramsDef[].label | string | 参数标签 |
| paramsDef[].type | string | 输入类型："select"/"number"/"switch" |
| paramsDef[].options | array | 选项列表（type=select 时） |

#### 9.4.2 保存远程设置

设置项的下发**直接使用 10.1 通用指令接口**，不另设专用接口：

```
POST /v1/devices/{deviceId}/commands
```

前端按 9.4.1 返回的 `paramsDef` 渲染表单，用户提交后按 `paramsDef[].key` 组装 `params` 对象，连同 `cmdCode` 一起作为 10.1 的参数提交。

示例——将「定位模式」设为追踪模式：

9.4.1 返回该设置项 `cmdCode="I_POS_MOD_LEVEL"`、paramsDef 含 `key="level"`，用户选择了 `level=1`，则提交：

```json
{
  "cmdCode": "I_POS_MOD_LEVEL",
  "params": { "level": 1 }
}
```

请求参数与返回结构完全同 10.1，`settingCode` 仅用于前端自身的表单管理，不需要提交给服务端。

---

## 10. 通用指令下发与操作记录

> 指令下发（Send） + 历史记录查询（List），基于 `lot_device_cmd_log` 表。

### 10.1 指令下发

```
POST /v1/devices/{deviceId}/commands
鉴权：account 或 device token
```

说明：通用指令下发接口，几乎所有设备控制操作都通过此接口。前端无需自行处理不同指令的参数差异——业务接口（立即定位、定位模式、远程开关、远程设置等）在服务端将业务参数映射为 `cmdCode` + `params` 后调用此接口。

请求参数（示例为断油断电，一条支持离线补发的指令）：
```json
{
  "cmdCode": "S_DIS_OIL_ELE",
  "params": { "cut": true },
  "canOffline": 1,
  "ttlSeconds": 86400,
  "appSource": "app"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| cmdCode | string | 是 | 指令编码，取值与参数结构以 `contracts/commands/registry.yaml` 为准 |
| params | object | 否 | 指令参数，须符合该指令在 registry 中声明的 `params_schema` |
| canOffline | int | 否 | 1=离线时缓存待补发，0=仅在线下发。**仅对 registry 中 `offline_policy: allowed` 的指令有效**，对 `forbidden` 的指令传 1 会被拒绝，详见下方"离线下发约束" |
| ttlSeconds | int | 否 | 离线补发的有效期（秒），仅 `canOffline=1` 时有意义。不传取该指令的默认值，上限见 registry 的 `max_ttl_seconds`（当前多数指令为 7 天）。超时未补发则任务作废。**过渡注记**：iot-runtime 支持 ttl 透传（D-1）落地前，本参数只做上限校验、不生效，离线缓存 TTL 按 iot-runtime 默认值 |
| appSource | string | 否 | 来源标识，如 "app" |

**离线下发约束**

指令是否允许离线补发由 registry 的 `offline_policy` 决定，前端不可自行假定：

| offline_policy | 含义 | 典型指令 |
|----------------|------|----------|
| `allowed` | 可离线缓存，设备上线后补发 | `S_DIS_OIL_ELE`、`S_CLOSE`、`S_DEFENSE`、`S_SHAKE_AL`、`I_POS_MOD_LEVEL`、`S_AUDIO_AL` |
| `forbidden` | 只能在线下发，设备离线直接失败 | `A_POS_NOW`（立即定位——补发一条过期的定位请求无意义） |

对 `forbidden` 的指令，设备离线时返回 `ret=10`，前端应提示"设备离线，请稍后重试"，而不是提示"已排队"。

**超时约定**：指令下发后等待设备应答的超时时间由 registry 的 `ack_timeout_ms` 定义（当前所有指令均为 10 秒）。超时未收到应答返回 `21023`。

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "deviceId": "87078795936",
    "requestId": "req_xxx",
    "cmdCode": "S_DIS_OIL_ELE",
    "ret": 0,
    "msg": "下发成功"
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| deviceId | string | 目标设备ID |
| requestId | string | 指令请求ID，可通过 10.2 操作记录按此 ID 追溯执行结果 |
| cmdCode | string | 指令编码 |
| ret | int | 结果码：0=下发成功 10=设备离线 12=该设备不支持此指令 |
| msg | string | 结果描述 |

错误：
- `21021`：该设备协议不支持此指令（等价于 `ret=12`，视实现选择其一返回）
- `21023`：指令已下发但设备在 `ack_timeout_ms` 内未应答

### 10.2 操作记录

```
GET /v1/command-records?page=1&pageSize=10&deviceIds=87078795936
鉴权：account 或 device token
```

说明：查询当前用户对设备下发的指令历史记录。对应"我的"页面 → 操作记录。

| 请求参数 | 类型 | 必填 | 说明 |
|----------|------|------|------|
| page | int | 否 | 页码，默认 1 |
| pageSize | int | 否 | 每页条数，默认 10，最大 50 |
| deviceIds | string | 否 | 设备ID筛选，可重复传参多选（`deviceIds=a&deviceIds=b`）。不传=当前用户所有设备；显式传入时逐个做归属校验（见 0.6 ①）。**参数名是复数**，传 `deviceId` 不生效 |

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "total": 25,
    "page": 1,
    "pageSize": 10,
    "items": [
      {
        "id": "1",
        "deviceId": "87078795936",
        "cmdName": "立即定位",
        "cmdCode": "A_POS_NOW",
        "cmdContent": "{}",
        "channel": "app",
        "operator": "18123954617",
        "sentAt": "2026-07-26 19:30:00",
        "result": "success",
        "canOffline": 1,
        "offlineEffect": false
      }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| total | int | 总条数 |
| page | int | 当前页码 |
| pageSize | int | 每页条数 |
| items[].id | int64 | 记录ID，JSON 中为字符串（见 0.2） |
| items[].deviceId | string | 目标设备ID |
| items[].cmdName | string | 指令名称（中文，如"立即定位"） |
| items[].cmdCode | string | 指令编码（英文，如 A_POS_NOW），参考 registry.yaml |
| items[].cmdContent | string | 指令内容（JSON 字符串） |
| items[].channel | string | 下发渠道：app / web |
| items[].operator | string | 操作人（手机号或账号标识） |
| items[].sentAt | string | 下发时间 YYYY-MM-DD HH:mm:ss |
| items[].result | string | 下发结果：pending=处理中 / success=成功 / fail=失败（success/fail 对应下发时的 ret；设备后续应答内容本期不回写） |
| items[].canOffline | int | 是否支持离线：1=是 0=否 |
| items[].offlineEffect | bool | 离线指令是否仍在生效中 |

---

## 11. VIP与充值

> VIP 服务购买与流量充值共用订单体系。前端选产品 → 创建订单 → 支付 → 后端充值到对应设备。

### 11.1 产品列表

#### 11.1.1 VIP 产品列表

```
GET /v1/vip/products
鉴权：account token
```

说明：返回当前上架的 VIP 套餐列表。按 `sort_order` 降序排列。

请求：无额外参数。

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "items": [
      {
        "id": 1,
        "name": "月度VIP",
        "price": 29.90,
        "originalPrice": 39.90,
        "productType": 1,
        "productTypeName": "订阅包",
        "durationType": 1,
        "durationTypeName": "固定天数",
        "durationDays": 30,
        "totalQuota": 10000,
        "quotaUnit": 1,
        "quotaUnitName": "分钟",
        "serviceContent": "语音通话10000分钟\n实时定位\n历史轨迹查询",
        "purchaseNotes": "购买后立即生效，有效期30天"
      }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| id | int | 产品ID |
| name | string | 套餐名称 |
| price | number | 售价（元） |
| originalPrice | number | 原价/划线价（元），0表示无划线 |
| productType | int | 产品类型：1-订阅包 2-按量包 3-单次服务 |
| productTypeName | string | 产品类型中文 |
| durationType | int | 有效期类型：1-固定天数 2-终身 3-永久 |
| durationTypeName | string | 有效期类型中文 |
| durationDays | int | 有效期天数（固定天数时有效） |
| totalQuota | int | 总量配额 |
| quotaUnit | int | 配额单位：0-不适用 1-分钟 2-次 3-天 |
| quotaUnitName | string | 配额单位中文；不适用时为空字符串 |
| serviceContent | string | 套餐内容描述（换行分隔） |
| purchaseNotes | string | 购买说明 |

> **注意**：此处 `productType` 是 **VIP 产品自身的分类**（订阅包/按量包/单次服务），与 11.2 订单接口里的 `productType`（1-VIP 2-流量，用于区分购买的是 VIP 还是流量包）是两个不同维度的字段，仅字段名相同、含义不同，前后端对接时注意区分，不要混用。

#### 11.1.2 流量包产品列表

```
GET /v1/traffic/products
鉴权：account token
```

说明：返回当前上架的流量包列表。按 `sort_order` 降序排列。

请求：无额外参数。

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "items": [
      {
        "id": 1,
        "name": "1G流量包",
        "trafficMb": 1024,
        "price": 9.90,
        "originalPrice": 15.00,
        "validityType": 1,
        "validityTypeName": "当月有效",
        "validityDays": 0,
        "purchaseNotes": "当月有效，月底清零，不可结转"
      }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| id | int | 产品ID |
| name | string | 产品名称 |
| trafficMb | int | 流量大小（MB） |
| price | number | 售价（元） |
| originalPrice | number | 原价/划线价（元），0表示无划线 |
| validityType | int | 有效期类型：1-当月有效 2-固定天数 |
| validityTypeName | string | 有效期类型中文 |
| validityDays | int | 有效期天数（固定天数时有效，当月有效为0） |
| purchaseNotes | string | 购买说明 |

---

### 11.2 订单

> 订单体系统一处理 VIP 和流量购买：
> - `product_type=1` → VIP 产品，关联 `lot_vip_product`
> - `product_type=2` → 流量产品，关联 `lot_traffic_product`
>
> 注意：这里的 `productType` 表示"购买的产品大类"，与 11.1.1 VIP 产品列表里表示"VIP 套餐分类"的同名字段 `productType` 含义不同，见 11.1.1 的注意事项。

#### 11.2.1 创建订单

```
POST /v1/orders
鉴权：account token
```

说明：选择产品和设备后创建待支付订单。订单创建后15分钟未支付自动过期。

请求参数：
```json
{
  "productType": 2,
  "productId": 1,
  "deviceId": "87078795936",
  "payChannel": 1
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| productType | int | 是 | 产品类型：1-VIP 2-流量 |
| productId | int | 是 | 产品ID |
| deviceId | string | 是 | 购买的目标设备ID |
| payChannel | int | 是 | 支付渠道：1-微信 2-支付宝 |

返回：完整订单详情，结构同 [11.2.3](#1123-订单详情)（`orderStatus=0` 待支付）。订单对外唯一标识是 `orderNo`（`LO` + yyMMddHHmmss + 6 位随机，共 20 字符），**不暴露自增 ID**。

错误：
- `21026`：产品不存在或已下架

#### 11.2.2 发起支付

```
POST /v1/orders/{orderNo}/pay
鉴权：account token
```

说明：对已创建的待支付订单发起支付，返回支付参数供前端调起微信/支付宝 SDK。

请求：无 Body（orderNo 走路径）。

返回示例（微信支付，小程序 **JSAPI** 参数集，直接透传 `wx.requestPayment`）：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "orderNo": "LO260726202101482913",
    "payChannel": 1,
    "payParams": {
      "appId": "wx1234567890",
      "timeStamp": "1751386860",
      "nonceStr": "abc123",
      "package": "prepay_id=wx26102100000000",
      "signType": "RSA",
      "paySign": "SIGN_STRING_HERE"
    }
  }
}
```

返回示例（支付宝）：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "orderNo": "LO260726202101482913",
    "payChannel": 2,
    "payParams": {
      "orderString": "alipay_sdk=alipay-sdk-xxx&app_id=xxx&..."
    }
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| orderNo | string | 订单号 |
| payChannel | int | 支付渠道：1-微信 2-支付宝 |
| payParams | object | 支付参数（内容取决于渠道与端型，前端透传给对应 SDK，勿自行拼装） |

> **注意**：`payParams` 的具体结构取决于支付渠道。微信小程序返回 JSAPI 参数集 `appId/timeStamp/nonceStr/package/signType/paySign`（透传 `wx.requestPayment`）；支付宝返回 `orderString`。金额展示请取订单详情（11.2.3）的 `payAmount`，本接口不返回金额。

错误：
- `21015`：微信渠道但当前账号未绑定微信（JSAPI 下单需要 openid，先走 2.1 绑定）
- `21024`：订单不存在
- `21025`：订单当前状态不允许支付（已支付 / 已取消 / 已过期）

#### 11.2.3 订单详情

```
GET /v1/orders/{orderNo}
鉴权：account token
```

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "orderNo": "LO260726202101482913",
    "productType": 2,
    "productTypeName": "流量充值",
    "productId": "1",
    "productName": "1G流量包",
    "deviceId": "87078795936",
    "productPrice": 9.90,
    "payAmount": 9.90,
    "payChannel": 1,
    "payChannelName": "微信支付",
    "orderStatus": 1,
    "orderStatusName": "已支付",
    "paidAt": "2026-07-26 20:22:00",
    "expiredAt": "2026-07-26 20:36:00",
    "createdAt": "2026-07-26 20:21:00"
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| orderNo | string | 订单号（`LO` + yyMMddHHmmss + 6 位随机，共 20 字符） |
| productType | int | 产品类型：1-VIP 2-流量 |
| productTypeName | string | 产品类型中文 |
| productId | int64 | 产品ID，JSON 中为字符串（见 0.2） |
| productName | string | 产品名称快照 |
| deviceId | string | 购买的目标设备ID |
| productPrice | number | 产品单价快照（元） |
| payAmount | number | 实付金额（元） |
| payChannel | int | 支付渠道：1-微信 2-支付宝 |
| payChannelName | string | 支付渠道中文 |
| orderStatus | int | 订单状态：0-待支付 1-已支付 2-已取消 3-已过期 4-退款中 5-已退款 |
| orderStatusName | string | 订单状态中文 |
| paidAt | string | 支付完成时间（未支付为 null/缺省） |
| expiredAt | string | 订单过期时间 |
| createdAt | string | 创建时间 |

错误：
- `21024`：订单不存在

#### 11.2.4 订单列表

```
GET /v1/orders?page=1&pageSize=10&orderStatus=&productType=
鉴权：account token
```

| 请求参数 | 类型 | 必填 | 说明 |
|----------|------|------|------|
| page | int | 否 | 页码，默认1 |
| pageSize | int | 否 | 每页条数，默认 10，最大 50 |
| orderStatus | int | 否 | 筛选状态：0-待支付 1-已支付 2-已取消 3-已过期 4-退款中 5-已退款。不传=全部 |
| productType | int | 否 | 筛选类型：1-VIP 2-流量。不传=全部 |

返回：分页信封（见 0.2），`items` 元素为**完整订单详情**，结构同 [11.2.3](#1123-订单详情)。

#### 11.2.5 取消订单

```
POST /v1/orders/{orderNo}/cancel
鉴权：account token
```

说明：仅待支付状态（orderStatus=0）的订单可取消。

请求：无 Body。

返回示例：
```json
{ "code": 0, "msg": "已取消", "data": null }
```

错误：
- `21024`：订单不存在
- `21025`：订单当前状态不允许取消（仅 `orderStatus=0` 待支付订单可取消）

---

### 11.3 设备 VIP 状态查询

```
GET /v1/devices/{deviceId}/vip
鉴权：account 或 device token
```

说明：查询指定设备**当前生效中**的 VIP 服务状态（聚合结果，不返回历史服务列表；购买记录看 11.2.4 订单列表）。

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "hasVip": true,
    "vipProductId": "1",
    "serviceEnd": "2026-08-19 12:00:00",
    "remainDays": 24
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| hasVip | bool | 是否有生效中的VIP服务 |
| vipProductId | int64 | 生效中服务关联的VIP产品ID，JSON 中为字符串（见 0.2）；无VIP时为 "0" |
| serviceEnd | string | 服务结束时间；null/缺省 = 永久生效 |
| remainDays | int | 剩余天数；-1 = 永久生效；无VIP时为 0 |

---

### 11.4 支付回调（服务端内部）

```
POST /v1/callback/pay/wechat    — 微信支付结果通知
POST /v1/callback/pay/alipay    — 支付宝支付结果通知
鉴权：无需用户 token（通过签名验证）
```

说明：支付平台异步通知支付结果，由支付服务内部消费，前端无需直接调用。回调验证通过后需完成：
1. 订单状态置为「已支付」并记录支付时间
2. **流量充值**：为目标设备累加流量额度，重算剩余量与到期时间
3. **VIP 购买**：为目标设备写入 VIP 服务记录，设置服务起止时间与生效状态

> **幂等要求（强制）**：支付平台允许重复投递同一笔支付的通知，回调处理**必须幂等**——同一笔支付重复到达时，订单状态、流量额度、VIP 记录都只能生效一次，不得重复累加。

请求参数（微信回调示例）：
```json
{
  "id": "evt_xxx",
  "create_time": "2026-07-26T20:22:00+08:00",
  "resource_type": "encrypt-resource",
  "event_type": "TRANSACTION.SUCCESS",
  "summary": "支付成功",
  "resource": {
    "algorithm": "AEAD_AES_256_GCM",
    "ciphertext": "...",
    "associated_data": "",
    "nonce": "..."
  }
}
```

> **说明**：回调参数格式由支付平台决定，此处仅作示意。后端需实现签名验证和解密逻辑。

---

## 12. 消息中心

> "消息" Tab 页面，展示设备上报的告警事件，聚合当前用户名下**所有设备**的告警（8.6.3 为单设备视角，数据同源）。
>
> 已读状态按「用户 × 告警」维度记录：同一条告警对不同用户的已读状态互相独立。

### 12.1 消息列表

```
GET /v1/alarms?page=1&pageSize=10&startTime=2026-07-01+00:00:00&endTime=2026-07-26+23:59:59
鉴权：account 或 device token
```

说明：查询当前用户所有设备的告警消息列表（跨设备）。与 8.6.3（单个设备的告警列表）不同，此接口自动聚合用户绑定的所有设备的告警。

| 请求参数 | 类型 | 必填 | 说明 |
|----------|------|------|------|
| page | int | 否 | 页码，默认 1 |
| pageSize | int | 否 | 每页条数，默认 10，最大 50 |
| deviceIds | string | 否 | 设备ID筛选，逗号分隔多选。不传=当前用户名下全部设备；显式传入时每个 deviceId 都做归属校验（见 0.6 ①） |
| startTime | string | 否 | 开始时间 YYYY-MM-DD HH:mm:ss |
| endTime | string | 否 | 结束时间 YYYY-MM-DD HH:mm:ss |
| alarmCodes | string | 否 | 告警类型筛选，可重复传参多选（`alarmCodes=SOS&alarmCodes=SHAKE`），不传=全部，见下方告警类型表。**参数名是复数** |

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "total": 25,
    "page": 1,
    "pageSize": 10,
    "items": [
      {
        "id": "a1b2c3d4e5f60718",
        "deviceId": "87078795936",
        "deviceName": "DEV001",
        "alarmTitle": "震动告警",
        "alarmCode": "SHAKE",
        "alarmName": "震动告警",
        "alarmValue": "3",
        "hasLocation": true,
        "lat": 22.6500910,
        "lng": 114.0403750,
        "alarmedAt": "2026-07-26 08:30:00",
        "readFlag": false
      },
      {
        "id": "b2c3d4e5f6071829",
        "deviceId": "87078795936",
        "deviceName": "DEV001",
        "alarmTitle": "低电告警",
        "alarmCode": "LOW_POWER",
        "alarmName": "低电告警",
        "alarmValue": "18",
        "hasLocation": false,
        "lat": 0,
        "lng": 0,
        "alarmedAt": "2026-07-26 09:00:00",
        "readFlag": true
      }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| total | int | 总条数 |
| page | int | 当前页码 |
| pageSize | int | 每页条数 |
| items[].id | string | 告警稳定键（16 位 hex 字符串，**不是数字**），12.3 标记已读用它 |
| items[].deviceId | string | 设备ID |
| items[].deviceName | string | 设备名称 |
| items[].alarmTitle | string | 告警标题（设备上报原文） |
| items[].alarmCode | string | 告警类型编码，见下方告警类型表 |
| items[].alarmName | string | 告警类型名称（中文，可直接展示） |
| items[].alarmValue | string | 告警值（触发时的电量/档位/速度等，随告警类型而异，可为空） |
| items[].hasLocation | bool | 告警是否携带位置。**false 时 lat/lng 无意义，前端不要把 (0,0) 画到地图上** |
| items[].lat | double | 告警发生位置纬度（hasLocation=true 时有效） |
| items[].lng | double | 告警发生位置经度（hasLocation=true 时有效） |
| items[].alarmedAt | string | 告警发生时间 YYYY-MM-DD HH:mm:ss |
| items[].readFlag | bool | 是否已读 |

**告警类型（`alarmCode`）**

告警类型统一使用**字符串编码**，与设备上报的原始告警编码一致，不做数字映射。编码与中文名的**唯一事实源是 `contracts/enums/registry.yaml` 的 `alarm_code`（label_zh）**，下表为由 registry 派生的 C 端常用子集（勿手工改此表，改 registry 后同步）：

| alarmCode | 名称（registry label_zh） | 说明 |
|-----------|------|------|
| `SOS` | SOS告警 | 设备触发 SOS 按钮 |
| `SHAKE` | 震动告警 | 设备检测到异常震动 |
| `FENCE_IN` | 进围栏告警 | 设备进入电子围栏 |
| `FENCE_OUT` | 出围栏告警 | 设备离开电子围栏 |
| `LOW_POWER` | 低电告警 | 设备内置电池电量低于阈值 |
| `MAIN_LOW_POWER` | 主电低压告警 | 外接电源电压偏低 |
| `OVER_SPEED` | 超速告警 | 超过设定速度上限 |
| `MOVE` | 位移告警 | 设防状态下发生位移 |
| `POWER_OFF` | 主电源断开告警 | 外部电源断开 |
| `REMOVE` | 拆除告警 | 设备被拆卸 |
| `COLLISION` | 碰撞告警 | 检测到碰撞 |
| `ROLLOVER` | 侧翻告警 | 检测到侧翻 |

> - 完整枚举见 registry（另含急加速/急减速/急刹车/急转弯/高温/信号弱/声控/伪基站/外电低电/干扰等）。前端遇到未列出的 `alarmCode` 时，应回退展示接口返回的 `alarmName`，不要因为不认识编码而丢弃该条消息。
> - 筛选参数为 `alarmCodes`（可重复传参多选），见上方请求参数表。

**告警事件编码 与 告警配置编码的对应关系**

8.6.1 / 8.6.2 的告警**配置**用的是设备指令编码（`S_*_AL`，用于下发开关和阈值），本节的告警**事件**用的是上报编码。两者不同，对应关系如下，前端从消息列表跳转到对应告警设置项时按此映射：

| 告警事件 `alarmCode` | 对应配置项 `alarmCode`（8.6） |
|---------------------|------------------------------|
| `SHAKE` | `S_SHAKE_AL` |
| `LOW_POWER` | `S_LOW_POWER_AL` |
| `REMOVE` | `S_REMOVE_AL` |
| `FENCE_IN` / `FENCE_OUT` | 无对应指令，由 8.2 围栏的 `enterAlarmEnable` / `getOutAlarmEnable` 控制 |
| `SOS` / `COLLISION` / `ROLLOVER` 等 | 无开关，设备固有能力，不可配置 |

### 12.2 未读消息数

```
GET /v1/alarms/unread-count
鉴权：account 或 device token
```

说明：获取当前用户所有设备的未读告警数量，用于消息 Tab 红点/角标。

返回示例：
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "unreadCount": 5
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| unreadCount | int | 当前用户所有设备的未读告警数量。**统计窗口为近 30 天**（与告警数据保留期一致），**封顶 99**（角标语义，展示"99+"即可） |

### 12.3 标记已读

```
POST /v1/alarms/read
鉴权：account 或 device token
```

说明：将指定告警标记为已读，或一键全部已读。

请求参数：
```json
{
  "alarmIds": ["1", "2", "3"]
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| alarmIds | string[] | 否 | 要标记的告警ID列表（与 12.1 返回的 `id` 一致，16 位 hex 字符串）。**不传或传空数组 = 一键全部已读** |

返回示例：
```json
{ "code": 0, "msg": "已标记3条", "data": null }
```

---

## 附录

### 数据库变更

数据结构的权威定义在 [design §4](./11-app-user-module-design.md#4-数据库变更全部-ddl)，并已随 `migrations/mysql/device-app/002~004` 落库，本文档不再维护 DDL 副本。

> 本节原有的 DDL 草稿与已落地迁移存在多处分叉（`lot_device_vip` 缺幂等键 `uk_order_id`、`lot_device_traffic` 缺 `package_name`、`lot_device` 多出违反 doc/08 红线的 `firmware_version/hardware_version` 两列等），已删除以免误用。各接口的数据来源（MySQL 表 / iot-runtime）见 design §1.2 数据链路总表与 DR-3/4/5。

### 新增错误码

错误码统一维护在 [0.7 业务码速查](#07-业务码速查)，本节不再重复列表，避免两处分叉。本期新增的错误码为：`21009`、`21011`、`21013`~`21015`、`21017`~`21027`（均已并入 0.7）。

### 完整接口汇总

> 本表为全部接口的索引与状态清单。
>
> - **鉴权**：`无`=无需登录，`account`=账号级，`device`=设备级，`account+device`=两者均可。
> - **状态**：
>   - `已实现` — 后端已提供，可直接对接
>   - `待实现` — **本文档为设计定义，后端尚未提供**，前端不要按此对接
>   - `待对齐` — 后端有对应能力，但路径/方法/入参与本文档定义不一致，联调前需先对齐（差异见"备注"列）
>   - `不适用` — 无独立后端接口（纯前端能力或复用其他接口）
> - **备注**：标注复用关系与已知差异。复用引用不重复计入接口总数。

| 序号 | 模块 | 方法 | 路径 | 鉴权 | 状态 | 说明 | 备注 |
|------|------|------|------|------|------|------|------|
| 1.1 | 登录 | GET | `/v1/auth/captcha` | 无 | 已实现 | 获取图形验证码 | |
| 1.2 | 登录 | POST | `/v1/auth/app/sms-code` | 无 | 已实现 | 发送短信验证码 | |
| 1.3 | 登录 | POST | `/v1/auth/login/phone-code` | 无 | 已实现 | 手机号+验证码登录 | |
| 1.4 | 登录 | POST | `/v1/auth/login/phone-password` | 无 | 已实现 | 手机号+密码登录 | |
| 1.5 | 登录 | POST | `/v1/auth/login/wechat` | 无 | 已实现 | 微信登录 | |
| 1.5b | 登录 | POST | `/v1/auth/login/apple` | 无 | 已实现 | Apple 登录 | 行为同 1.5，见 1.5b 小节 |
| 1.6 | 登录 | POST | `/v1/auth/app/bind-phone` | account | 已实现 | 绑定手机号（账号级） | **21003 白名单**，见 0.4 |
| 1.7 | 登录 | POST | `/v1/auth/login/device` | 无 | 已实现 | 设备号+密码登录 | |
| 1.8 | 登录 | GET | `/v1/auth/app/profile` | account | 已实现 | 获取账号资料 | |
| 1.9 | 登录 | GET | `/v1/auth/app/devices` | account | 已实现 | 我的设备列表 | |
| 1.10 | 登录 | GET | `/v1/devices/current` | account+device | 已实现 | 获取当前设备信息 | 不走 deviceId 路径参数，见 0.5 说明 |
| 1.11 | 登录 | POST | `/v1/auth/device/bind-account` | device | 已实现 | 设备登录下绑定手机号 | 设备身份不受 21003 约束 |
| 1.12 | 登录 | POST | `/v1/auth/app/logout` | account+device | 已实现 | 登出 | 公开接口，token 过期也可幂等调用 |
| 1.13 | 登录 | POST | `/v1/auth/app/devices/default` | account | 已实现 | 切换默认设备 | |
| 1.14 | 登录 | POST | `/v1/auth/app/devices/bind` | account | 已实现 | 绑定设备到账号 | 与 6.4 为同一接口 |
| 1.15 | 登录 | POST | `/v1/auth/app/devices/change-password` | account | 已实现 | 修改设备登录密码 | |
| 1.16 | 登录 | POST | `/v1/auth/device/reset-password` | 无 | 已实现 | 设备密码找回 | |
| 2.1 | 微信 | POST | `/v1/auth/app/bind-wechat` | account | 已实现 | 绑定微信 | |
| 2.2 | 微信 | POST | `/v1/auth/app/unbind-wechat` | account | 已实现 | 解绑微信 | |
| 2.3 | 微信 | GET | `/v1/auth/app/oauth-accounts` | account | 已实现 | 查询已绑定第三方账号 | |
| 3.1 | 菜单 | GET | `/v1/auth/app/mine/menus` | account | 已实现 | 我的页面菜单（手机号登录） | |
| 3.2 | 菜单 | GET | `/v1/devices/{deviceId}/mine/menus` | device | 已实现 | 我的页面菜单（设备登录） | |
| 4.1 | 安全 | PUT | `/v1/auth/app/password` | account | 已实现 | 修改登录密码 | 现有同名能力属于后台账号体系，不作用于 App 账号 |
| 4.2 | 安全 | POST | `/v1/auth/app/password/reset` | 无 | 已实现 | 短信重置密码 | |
| 4.3 | 安全 | GET | `/v1/auth/app/security` | account | 已实现 | 获取安全信息 | |
| 5.1 | 配置 | GET | `/v1/app/version` | 无 | 已实现 | 检测更新 | |
| 5.2 | 配置 | GET | `/v1/app/about` | 无 | 已实现 | 关于我们 | |
| 6.1 | 设备 | GET | `/v1/devices/{deviceId}` | account+device | 已实现 | 设备详情 | |
| 6.2 | 设备 | GET | `/v1/devices/{deviceId}/realtime` | account+device | 已实现 | 首页实时状态 | |
| 6.3 | 设备 | GET | `/v1/auth/app/devices` | account | 已实现 | 设备列表（分页，首页下拉切换用） | 与 1.9 为同一接口 |
| 6.4 | 设备 | POST | `/v1/auth/app/devices/bind` | account | 已实现 | 绑定设备 | 与 1.14 为同一接口；deviceId+设备密码（DR-11），旧路径 `/v1/devices/bind` 已退役 |
| 6.5 | 设备 | POST | `/v1/auth/app/devices/unbind` | account | 已实现 | 解绑设备 | 已按本文档路径/入参落地；旧路径 `/v1/devices/unbind` 已退役 |
| 6.6 | 设备 | PATCH | `/v1/devices/{deviceId}` | account+device | 已实现 | 修改设备名称 | |
| 7.1 | 流量卡 | GET | `/v1/devices/{deviceId}/sim` | account+device | 已实现 | SIM卡信息查询 | |
| 7.2.1 | 分享 | POST | `/v1/devices/{deviceId}/share-location` | account+device | 已实现 | 生成分享链接 | |
| 7.2.2 | 分享 | GET | `/v1/share/{token}` | 无 | 已实现 | 查看分享位置（公开） | |
| 7.2.3 | 分享 | DELETE | `/v1/devices/{deviceId}/share-location` | account+device | 已实现 | 撤销分享 | |
| 7.3.1 | 安防 | GET | `/v1/devices/{deviceId}/audios` | account+device | 已实现 | 音频列表 | |
| 7.3.2 | 安防 | POST | `/v1/devices/{deviceId}/audios/trigger` | account+device | 已实现 | 触发拾音 | |
| 7.3.3 | 安防 | GET | `/v1/devices/{deviceId}/audios/{id}/file` | account+device | 已实现 | 获取音频文件 | |
| 8.1 | 定位 | POST | `/v1/devices/{deviceId}/locate` | account+device | 已实现 | 立即定位 | |
| 8.2.1 | 围栏 | GET | `/v1/devices/{deviceId}/fences` | account+device | 已实现 | 围栏列表 | |
| 8.2.2 | 围栏 | GET | `/v1/fences/{fenceId}` | account+device | 已实现 | 围栏详情 | |
| 8.2.3 | 围栏 | POST | `/v1/devices/{deviceId}/fences` | account+device | 已实现 | 创建围栏 | 已按本文档路径落地并带归属校验；旧路径 `/v1/fences` 已退役 |
| 8.2.4 | 围栏 | PUT | `/v1/fences/{fenceId}` | account+device | 已实现 | 更新围栏 | |
| 8.2.5 | 围栏 | DELETE | `/v1/fences/{fenceId}` | account+device | 已实现 | 删除围栏 | |
| 8.3 | 轨迹 | GET | `/v1/devices/{deviceId}/track` | account+device | 已实现 | 历史轨迹查询 | |
| 8.4.1 | 模式 | GET | `/v1/devices/{deviceId}/location-mode` | account+device | 已实现 | 查询定位模式 | |
| 8.4.2 | 模式 | PUT | `/v1/devices/{deviceId}/location-mode` | account+device | 已实现 | 设置定位模式 | |
| 8.5.1 | 报表 | GET | `/v1/devices/{deviceId}/reports/trip` | account+device | 已实现 | 行程报表 | |
| 8.5.2 | 报表 | GET | `/v1/devices/{deviceId}/reports/stay` | account+device | 已实现 | 停留报表 | |
| 8.6.1 | 告警 | GET | `/v1/devices/{deviceId}/alarm-settings` | account+device | 已实现 | 查询告警配置 | |
| 8.6.2 | 告警 | PUT | `/v1/devices/{deviceId}/alarm-settings` | account+device | 已实现 | 保存告警配置 | |
| 8.6.3 | 告警 | - | - | - | 不适用 | 告警记录列表（单设备） | 由 12.1 `/v1/alarms` 带设备筛选参数覆盖，无独立子路径 |
| 8.7 | 导航 | - | - | - | 不适用 | 无后端接口，前端调微信 openLocation | 经纬度取自 6.2 |
| 9.1 | 设置 | - | - | - | 不适用 | 设备信息 | 复用 6.1，无独立接口 |
| 9.2.1 | 自检 | GET | `/v1/devices/{deviceId}/self-check` | account+device | 已实现 | 查询自检结果 | |
| 9.2.2 | 自检 | POST | `/v1/devices/{deviceId}/self-check` | account+device | 待实现 | 触发自检 | 待设备协议确认，本期可不实现 |
| 9.3.1 | 开关 | GET | `/v1/devices/{deviceId}/switch-status` | account+device | 已实现 | 查询开关状态 | |
| 9.3.2 | 开关 | - | - | - | 不适用 | 切换开关 | 直接使用 10.1 通用指令接口，无专用接口 |
| 9.4.1 | 设置 | GET | `/v1/devices/{deviceId}/remote-settings` | account+device | 已实现 | 查询可设置的远程配置项 | |
| 9.4.2 | 设置 | - | - | - | 不适用 | 保存远程设置 | 直接使用 10.1 通用指令接口，无专用接口 |
| 10.1 | 指令 | POST | `/v1/devices/{deviceId}/commands` | account+device | 已实现 | 通用指令下发 | |
| 10.2 | 指令 | GET | `/v1/command-records` | account+device | 已实现 | 操作记录（分页） | |
| 11.1.1 | VIP | GET | `/v1/vip/products` | account | 已实现 | VIP 产品列表 | |
| 11.1.2 | 流量 | GET | `/v1/traffic/products` | account | 已实现 | 流量包产品列表 | |
| 11.2.1 | 订单 | POST | `/v1/orders` | account | 已实现 | 创建订单 | |
| 11.2.2 | 订单 | POST | `/v1/orders/{orderNo}/pay` | account | 已实现 | 发起支付 | |
| 11.2.3 | 订单 | GET | `/v1/orders/{orderNo}` | account | 已实现 | 订单详情 | |
| 11.2.4 | 订单 | GET | `/v1/orders` | account | 已实现 | 订单列表（分页） | |
| 11.2.5 | 订单 | POST | `/v1/orders/{orderNo}/cancel` | account | 已实现 | 取消订单 | |
| 11.3 | VIP | GET | `/v1/devices/{deviceId}/vip` | account+device | 已实现 | 设备VIP状态查询 | |
| 11.4 | 支付 | POST | `/v1/callback/pay/wechat` | 无（签名验证） | 已实现 | 微信支付结果回调（内部） | |
| 11.4 | 支付 | POST | `/v1/callback/pay/alipay` | 无（签名验证） | 已实现 | 支付宝支付结果回调（内部） | |
| 12.1 | 消息 | GET | `/v1/alarms` | account+device | 已实现 | 消息列表（跨设备分页） | |
| 12.2 | 消息 | GET | `/v1/alarms/unread-count` | account+device | 已实现 | 未读消息数 | |
| 12.3 | 消息 | POST | `/v1/alarms/read` | account+device | 已实现 | 标记已读 | |

**状态统计**

| 状态 | 行数 | 说明 |
|------|------|------|
| 已实现 | 71 | 全部功能节均已交付（含原"待对齐"4 项，已按本文档定义的路径/入参落地） |
| 待实现 | 1 | 仅 9.2.2 触发自检（待设备协议确认，本期不实现） |
| 不适用 | 5 | 8.7 导航、9.1 设备信息、8.6.3 单设备告警（复用 12.1）、9.3.2 开关下发、9.4.2 设置下发 |
| **合计** | **77** | 其中 6.3/6.4 与 1.9/1.14 为同一接口的复用引用，去重后为 **71 个独立接口**（含 2 个支付回调内部接口） |

> **前端注意**：除 9.2.2 外均可直接对接；每个"已实现"接口在 `apps/device-app/backend/internal/server/acceptance_*_test.go` 均有对应验收测试。
