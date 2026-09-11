# de-code 前端接入自有后端 — 改造清单与实施计划

对象：`apps/device-app/front/de-code`（uni-app v2 / Vue2 / Vuex，反编译还原工程）
目标后端：`apps/device-app/backend`（kratos，HTTP `:8010`，契约 `doc/api/device-app-api.md` + `api/backend/v1/*.proto`）

---

> **更新（后端补齐已完成）**：本文档第一版列出的"后端无能力（🚫）"共 20 项，除下方
> **五项确实卡设备协议/样本**的以外，后端已全部补齐并交付（契约见
> `doc/api/device-app-api.md`，补齐规格与决策见 `doc/design/device-app-gapfill-spec.md`）。
> 新增可用接口一览：
>
> | 前端功能 | 现在可用的接口 |
> |---|---|
> | 逆地理编码（地址文案） | `GET /v1/geo/regeo?lat=&lng=` |
> | 设备统计（首页概览） | `GET /v1/auth/app/devices/statistics` |
> | 支付渠道列表 | `GET /v1/pay/channels` |
> | 改昵称/头像/性别 | `PATCH /v1/auth/app/profile` |
> | 设备能力开关（替代 12 个 `enableXxx`） | `GET /v1/devices/{deviceId}` 的 `capabilities` |
> | 定位方式/心跳/离线时长/SIM 手机号/型号展示名 | 6.1/6.2 新增 `posType`+`posTypeName`/`lastGateAt`/`offlineDuration`/`msisdn`/`deviceTypeDisplayName` |
> | Apple 绑定/解绑 | `POST /v1/auth/app/bind-apple`、`unbind-apple`（1.8/4.3 带 `appleBound`） |
> | APP 推送开关 + 推送 ID 注册 | `PUT /v1/auth/app/push-token`（+ notify-channels 的 `appPush`） |
> | 音频已读 / 音频删除 | `POST .../audios/read`、`POST .../audios/dismiss`（列表带 `readFlag`） |
> | 亲情号码 | `GET/PUT /v1/devices/{deviceId}/family-numbers`（`pendingSync=true`，见下） |
> | 公告（首页弹窗+列表+详情） | `GET /v1/notices`、`/v1/notices/latest`、`/v1/notices/detail?id=` |
> | 首页广告位 + 点击埋点 | `GET /v1/app-ads`、`POST /v1/app-ads/{id}/click` |
> | 订单退款申请/进度 | `POST`/`GET /v1/orders/{orderNo}/refund` |
> | 告警分类统计（角标） | `GET /v1/alarms/statistics` |
> | 告警详情（推送/深链） | `GET /v1/alarms/detail?id=&deviceId=&alarmedAt=` |
> | 日历打点（哪几天有数据） | `GET /v1/devices/{deviceId}/data-dates?type=&month=` |
> | 行政区树 + 边界（行政区围栏） | `GET /v1/regions/tree`、`/v1/regions/{adcode}/boundary` |
> | 微信 JS-SDK 签名（H5） | `POST /v1/wx/js-sign` |
>
> **仍然不可用的五项（卡协议/样本，不是后端偷懒）**：恢复出厂设置（registry 无指令码）、
> 亲情号码**下发**（无指令码，接口只存储回显 `pendingSync=true`，前端必须提示"已保存，
> 待设备同步"而不是"设置成功"）、音频持续/定时模式与码率（硬件不支持）、LBS 基站开关
> （协议只有上行查询）、音频真实时长（`duration` 恒 0，需真实音频样本才能算）。
> 另外告警的"结束点坐标"（老 App 的 `endLng/endLat`）上游只有一组坐标，无数据源。
>
> 下方正文仍是第一版的逐 action 对拍结果，**🚫 标记请按上表改读为"已可用"**；
> 其余（⚠️ 字段错、❌ 老路径）结论不变。
>
> **另外：契约做了一轮字段类型统一（详见契约附录"字段类型整理"），适配层按新名对接**：
>
> | 影响的前端读法 | 新契约 |
> |---|---|
> | 告警 `lat`/`lng` 曾是字符串 | 现在是**数字**，无位置时为 `null`（配合 `hasLocation` 判空，别再 `parseFloat`） |
> | 告警 `alarmValue` | 恒为字符串 |
> | 实时态/详情"最后通信时间" | `lastGateAt`（不是 `lastGateTime`） |
> | 远程开关三态 | `switchStatus` / `switchStatusText`（不是 `status`/`statusText`） |
> | 行政区树层级 | `regionLevel`（不是 `level`） |
> | 推送注册端型 | `platform` 传**数字** 1/2/3（与检测更新同一套编码），不是 `"android"` |
> | 告警统计 `count`/`total`、报表 `duration` | int32 **数字**（不是 int64 字符串），不用 `toNum` |
> | 公告发布时间 | `publishedAt`（不是 `publishAt`） |
> | 音频"已读" | `readFlag`（与告警列表同名，不是 `isRead`） |
> | 远程设置参数定义 | `paramDefs`（不是 `paramsDef`） |
>
> 契约里的硬规则（0.2 新增）：**一个字段只有一种类型**；int64 → JSON 字符串、int32 → 数字、
> 经纬度一律 double、时间点一律 `xxxAt`、枚举码旁必有 `xxxName`。适配层的 `toNum` 只需用在
> int64 字段上（`totalMileage`/`todayMileage`/`mileage`/`motionStateKeepDuration`/各类 `id`）。

---

## 零、接线进度（持续更新）

| 阶段 | 内容 | 状态 |
|---|---|---|
| P0 基础设施 | `common/env.js`（环境配置单一出口）、`common/qs.js`（数组→重复参数）、`common/request.js` 重写（X-Lang / 信封 / 业务码分流 / 去 store 循环依赖）、`adapters/`（DTO→视图模型，`id = deviceId`）、`api/`（auth/device/alarm/track/share/geo）、jest 接入、devServer 代理 `/v1`→`:8010`（端口 8090） | ✅ |
| P1 登录与账号 | account.js（删企业树、Apple 绑手机号/绑定/解绑改契约路径、注销改 cancel-account、补 4.3 安全信息）、user.js（`nickName` 字段名修正、改资料改 PATCH `/auth/app/profile`） | ✅ |
| P2 设备主链路 | terminal.js（1.9 列表嵌套结构、批量实时态改用列表、1.13 切默认设备）、device.js（6.1 详情+capabilities、绑定/解绑、图标、分享、轨迹、日历打点、逆地理） | ✅ |
| P3 消息中心 | alarmLog.js（12.1 重复参数、`hasLocation` 判空、**已读 vs 删除分开**、12.2 未读数、12.4 统计、12.5 详情带提示） | ✅ |
| P4 控制类与设置 | remoteSet.js（9.3 开关三态 / 9.4 paramDefs / 10.1 指令 / 10.2 记录，三类权威源见 `adapters/remoteset.js`）、alarm.js（8.6 告警项 + 8.6.2b 通知渠道与**两份独立号码名单**）、fence.js（8.2 CRUD + 多边形/行政区，去掉坐标换算）、audio.js（只留协议支持的声控模式）、report.js（8.5 行程/停留） | ✅ |
| P5 商城与收尾 | order.js（11.2 **两步支付** + 11.6 退款独立接口 + 金额元/分换算）、packageInfo.js（11.1 VIP/流量产品、11.3 设备 VIP）、协议无能力的入口按功能位隐藏 | ✅ |

### 本轮补给后端的缺口（对接时发现，均已实现并验收）

| 缺口 | 影响 | 处置 |
|---|---|---|
| `capabilities.customCmd` 未透出 | registry 里本有 `CUSTOM_CMD`，"自定义指令"入口只能一直藏着 | 补能力位 |
| 8.6.2b 号码名单只有一份 | 电话与短信收件人现实中不同（语音按次计费且打扰人），合成一份等于砍能力 | 拆 `telPhones`/`smsPhones`（迁移 015） |
| 围栏进/出开关回显恒 true | 用户存"仅出围栏提醒"，下次打开还是"进出都提醒" | 落 BFF 私有存储（迁移 016） |
| 7.3.2 拾音硬编码 `open:true` | 开了关不掉，只能等固件超时 | 加 `open` 参数 |
| `S_AUDIO_AL` 不在开关白名单 | 拿不到"现在是开还是关" | 加进 9.3.1（三态） |
| `switchCode` 输出指令码 | 前端得按协议标识写界面逻辑 | 按契约改语义码 |
| 7.3.1 无时间范围 | 音频页按天看，只能拉全部再前端过滤，分页必漏 | 补 `startTime/endTime` |
| 6.7 图标无 `rotatable` | 宠物/货物图标跟着航向转会躺倒 | 补字段并补上契约小节 |
| 8.4 档位文案 | 省电模式写"约120秒"，协议实际是 1 小时 | 按协议改文案 |
| `/fence/bound` 按遥测过滤 | 从未上报的设备，围栏"列表可见、详情 21011" | 归属只看绑定关系（iot-runtime 侧） |
| 错误一律收敛 20004 且不落日志 | 真因是 MySQL 缺列，日志只说"网关不可用" | 转换前记原始错误 |

单测：`npm test`（59 个，覆盖 qs 序列化 / 设备与告警适配器 / api 路径与参数对拍）。
联调：`npm run dev:h5` → `http://localhost:8090`，`/v1` 由 devServer 代理到 `:8010`。
已实测走通：图形验证码 → 短信码 → 手机号登录 → 1.9 设备列表（嵌套结构 + posTypeName）
→ 6.2 实时态 → 1.18 设备统计 → 3.1 我的菜单。

---

## 一、结论先说

1. **接口层的唯一改造点是 Vuex store**。全工程 155 个网络调用全部集中在 `src/store/modules/*.js` 的 action 里（`src/common/request.js` 是唯一出口），页面只 `mapActions` + 读 `state`，不直接发请求。
2. **上一轮已经改了约 40%，但只改了 URL、没改字段**。`account/alarmLog/order/packageInfo/report/fence/audio/remoteSet` 里已经有一批 `/v1` 契约路径，可响应解析仍按老厂商结构读（`data.list` / `data.count` / `data.lbsInfo` / `data.fenceData`），**跑起来会静默拿到 undefined，比没改更危险**。这是本轮工作量的主体。
3. **页面模板基本不用动**：页面读的是 `selectedTerminal.id`（87 处）、`terminalName`、`lon/lat`、`status` 这套厂商视图模型。只要在 store 里加一层适配器把契约 DTO 归一化成同名字段（关键：`id = deviceId`），30+ 个页面文件不必改。**只有 5 个功能的页面结构必须重做**（告警设置、远程开关、订单支付、围栏形状、消息删除语义）。
4. **有 20 项功能后端没有对应能力**，需要拍板"下线入口"还是"等后端"（见第五节 D4）。
5. **后端 proto 比契约文档新**：图标库、告警渠道、消息清空、轨迹删除、行政区边界、VIP 分类、账号注销、设备共享等十余项在 proto/openapi 里有、文档里没有。**以 proto 为准**，文档待回写。
6. 已实测：契约文档 12.1 写的 `deviceIds` "逗号分隔多选" **是错的**，后端只认重复参数 `deviceIds=a&deviceIds=b`。`alarmCodes` 同理。

---

## 二、基础设施改造（P0，所有模块的前置）

| 编号 | 现状 | 目标 |
|---|---|---|
| R1 | `svc/6093.js` 里 `serviceRoot: "http://h5.akbee.com/v1"`；`request.js` 里还有一行 `http://h5.akbee.com → http://` 的替换 hack | 改为可配置 base（联调 `http://127.0.0.1:8010/v1`）；H5 走 devServer 代理 `/v1`；删掉替换 hack。`pagesMore/my/developers` 的环境切换列表同步改 |
| R2 | 请求头只有 `Content-Type` + `Authorization` | 补 `X-Lang: zh`，否则 `msg` 全是英文 |
| R3 | 数组参数用 `join(",")`（`alarmCodes`）或只传单值 | uni.request 的 `data` 对象产不出重复 key → api 层统一手工拼 query，数组序列化成重复参数。**实测逗号分隔无效** |
| R4 | int64 字段直接参与运算/比较 | `motionStateKeepDuration`/`totalMileage`/`todayMileage`/`mileage`/`initialMileage`/`id`/`productId`/`vipProductId`/`deleted` 在 JSON 里是**字符串**，适配层统一 `toNum` |
| R5 | 只处理 `401/10002/9006` | 补 `10005` 限流、`21003` 引导绑手机号、`21010/21011` 越权、`20004` 上游不可用（应提示"数据暂不可用"而不是通用重试 toast）、`21023` 指令超时、`ret=10` 设备离线（**code=0，不是错误**） |
| R6 | 判空只覆盖 `null`/`""` | protojson 对 optional 未设置字段**不输出**，判空要同时覆盖 `undefined` |
| R7 | 无 | 新增 `src/api/*`（只管 URL/方法/参数序列化）+ `src/adapters/*`（契约 DTO ↔ 页面视图模型，纯函数可单测）；store 只做状态与流程编排 |

---

## 三、逐模块改造清单

图例：**✅ 已对齐** / **⚠️ 路径已换但字段错** / **❌ 仍指向老后端** / **🚫 后端无能力** / **➕ 后端有、前端没接**

### 3.1 account.js（登录/账号）

| 状态 | action | 现状 | 目标 |
|---|---|---|---|
| ✅ | GetSendImgCode / SendSmsCode / SignIn / SignUp / SignInWx / SignInApple / BindUserWx / BindUserPhone / ResetPassword / ChangeAuthPassword / GetUserAccountOauth / BindWechatAccount | 已是契约路径与字段 | 仅补错误码文案 |
| ⚠️ | 登录成功后的 `setLogedIn` | 判 `res.data.user` 分支恒不成立（契约只回 `{token,identityType,phoneBound}`） | 删死分支；**`phoneBound=false` 必须跳绑手机号**（否则除 1.6 外全部 21003） |
| ❌ | GetEnterpriserTree | `/enterprise/tree` | 删除（C 端无企业树，`enterpriseId` 全部分支下线） |
| ❌ | BindUserApple | `/auth/bind-user/apple` + 一堆 vendor 字段 | `POST /v1/auth/app/bind-phone` `{phone,smsCode}`（与 BindUserWx 同接口） |
| ❌ | UnbindAccount | `/account/unbind-{mode}` | `POST /v1/auth/app/unbind-wechat`（**只有微信**） |
| ❌ | Cancellation | `/account/cancellation` `{phoneNumber,code}` | `POST /v1/auth/app/cancel-account` `{password}` 或 `{smsCode}`（错误码 21029/21004） |
| 🚫 | BindAppleAccount | `/account/bind-apple` | 后端无 Apple 绑定/解绑接口 |
| ➕ | — | — | `GET /v1/auth/app/security`（account-safety 页要的 hasPassword/wechatBound/registeredAt） |
| ➕ | — | — | 设备登录 `POST /v1/auth/login/device`、设备身份绑手机 `POST /v1/auth/device/bind-account`、设备密码找回 `POST /v1/auth/device/reset-password`（对应 `bind-tel` / `find-pas` 页面） |

> 另需确认：老代码对密码做 `MD5(...).toUpperCase()`（`terminal/bind`、`update-pwd` 路径上仍有），后端按明文 + bcrypt 校验，**必须去掉 MD5**。

### 3.2 user.js

| 状态 | action | 现状 | 目标 |
|---|---|---|---|
| ⚠️ | GetSystemUserInfo | 路径对，但读 `data.nickname` | 契约字段是 `nickName`（昵称当前显示不出来） |
| 🚫 | SetSystemUserInfo | `/system/user/nickname` | `PATCH /v1/users/me` 是 **to-B 后台账号**，不作用于 App 账号 → 后端无改昵称接口 |
| ⚠️ | `userType` 推导 | vendor 3=游客 / 2=设备 | 按 `identityType` 派生，统一 pages 里的 `userType==3` 判断 |

### 3.3 terminal.js（首页主链路，改动最大）

| 状态 | action | 现状 | 目标 |
|---|---|---|---|
| ⚠️ | GetTerminalList | `/v1/auth/app/devices` ✅；请求带 `limit/enterpriseId/deviceState/searchKey`（都不支持）；响应读 `data.list`/`data.count` | 只有 `page/pageSize`（上限 50）；响应是 `{items,total,page,pageSize}`，每项**嵌套** `{deviceId,isDefault,displayNo,device:{...}}` → 适配为 `{id:deviceId, terminalNo:deviceId, terminalName:device.deviceName, ...device}` |
| ⚠️ | GetTerminalInfo | `/v1/devices/{id}/realtime` ✅；响应读 `data.lbsInfo.*` / `data.terminalTypeInfo.terminalTypeExtend.*` / `data.deviceState` | 契约是**扁平**字段：`onlineStatus/motionState/powerPercent/charge/rssi/satNum/speed/acc/voltage/direct/totalMileage/todayMileage/lng/lat/lastPosAt/iccid/displayNo`；**没有 terminalTypeInfo**（12 个 `enableXxx` 能力开关无来源 → D2） |
| ❌ | GetTerminalInfos | `/v2/terminal/ids` 批量实时 | 无对应接口。改用 1.9 列表（每项已含实时态，一次请求出全部 marker），不要 N 次并发 6.2 |
| ✅ | ChangeTerminalPassword | 路径字段都对 | 补 21005 弱密码提示 |
| ⚠️ | `utils.deviceStatus(deviceState, motion)` | 入参是 vendor `deviceState` | 改按 `onlineStatus` + `motionState` 计算 |
| ➕ | — | — | `POST /v1/auth/app/devices/default` 切换默认设备（现在只在本地存 `lastSelectedId`） |

### 3.4 device.js

| 状态 | action | 现状 | 目标 |
|---|---|---|---|
| ⚠️ | GetDeviceTrack | 路径 ✅；时间格式 `YYYY/MM/DD HH:mm:ss`、无 limit、响应按老结构读 | 时间必须 `YYYY-MM-DD HH:mm:ss`；补 `limit`（默认/上限 10000）；响应 `{items,total,truncated}`，点位字段 `posAt/lng/lat/direct/speed/mileage/posType/posTypeName/altitude/satNum`；跨度 >7 天前端先拦；`truncated=true` 提示缩小范围 |
| ⚠️ | GetDeviceInfo | `/v1/devices/{id}` ✅ | 字段全变：`deviceType/model/iccid/deptName/activationStatus/activatedAt/expiredAt/installedAt/initialMileage/productType/productCategoryType/speed/acc/direct/voltage/todayMileage/iconId/isDefaultPassword`；页面读的 `terminalTypeDisplayName`（24 处）、`msisdn` 需适配或下线 |
| ⚠️ | GetSharePosition | `/v1/share/{token}` ✅；读 `locatetime/deviceState/motion/lon/lat` | 契约是 `deviceName/onlineStatus/powerPercent/lng/lat/lastPosAt/speed/direct`；错误码 21020 |
| ✅ | AddSharePosition | `expireHours` 对 | 返回 `{token,shareUrl,expiredAt}`，页面取值校对 |
| ✅ | BindTerminal / UnBindTerminal | `deviceId/password/deviceName` 对 | 21008 已被绑定 / 21012 密码错 / 21017 最后一台不能解绑 |
| ✅ | SetDeviceInfo | PATCH `deviceName` | 前置 ≤25 字校验 |
| ⚠️ | GetValueAdded / GetDeviceVipTypeList | `/v1/devices/{id}/vip` ✅；传 `type: 6` | 参数是 `categoryId`；返回 `hasVip/vipProductId/serviceEnd/remainDays` + `items[]`（按分类展开，含 `totalQuota/remainingQuota/quotaUnitName`） |
| ⚠️ | GetDeviceInit | 内含三个老接口 + `expirationTime/startingTime/isTrial` 判活 | 拆成 7.1 sim + 11.3 vip + 指令树；`activationState` 判定逻辑整段重写 |
| ❌ | SetTerminalIcon | `/terminal/icon` `{id,iconType}` | `PUT /v1/devices/{deviceId}/icon` `{iconId}`；图标集改从 `GET /v1/device-icons` 拉（现在是本地常量） |
| 🚫 | GetDeviceStatistics | `/terminal/statistics` | 无对应（首页在线/离线统计）→ 用 1.9 自算或后端补 |
| 🚫 | GetGeocode / GetSelectedDeviceAddress | `/v2/map/geocode/regeo` | 无逆地理接口 → **D1 待决策**（影响首页/轨迹/报表/消息的地址文案） |
| 🚫 | SetTerminalFilter | `/terminal/filter`（lbs/wifi/mix 过滤） | 无对应；`I_GPS_WIFI` 只是"定位优先级"，语义不同 |
| 🚫 | GetListDates | `/{type}/dates`（日历有数据打点） | 无对应 |

### 3.5 alarm.js（告警设置 — 页面必须重做）

| 状态 | action | 现状 | 目标 |
|---|---|---|---|
| ✅ | GetAlarmSettings | 路径已对 | 响应 `alarmItems[{alarmCode,alarmName,alarmEnable,alarmValue,alarmValueDesc}]`，**按数组渲染**，不再是固定 16 个开关 |
| ❌ | 17 个 `set-*-alarm` | `/terminal-alarm-setting/set-xxx` 各一个接口 | 合并成 `PUT /v1/devices/{deviceId}/alarm-settings` `{alarmItems:[...]}`（只传改动项）。**后端只支持 4 个可配项**：`S_SHAKE_AL`(灵敏度 1~5) / `S_LOW_POWER_AL` / `S_REMOVE_AL` / `S_AUDIO_AL`(声控声音安防)。vendor 的 SOS/超速/位移/主电断开/静止/离线/语音等**无配置项**（设备固有能力）；围栏进出告警走 8.2 的 `enterAlarmEnable/getOutAlarmEnable` |
| ❌ | SetWechatOn / SetWechatAlarm / SetTelAlarmNotice / SetSmsAlarmNotice / SetAlarmTel / SetAlarmSms | 6 个接口 + `telPhoneNo1..6` / `smsPhoneNo1..6` 平铺字段 | `GET/PUT /v1/devices/{deviceId}/notify-channels` `{wechatPush,smsNotify,telNotify,notifyPhones[]}`（号码改数组，上限 6） |
| 🚫 | SetPushOn | `set-push-alarm` + `pushClientId` | 后端无 APP 推送开关/推送 ID 注册 |
| ⚠️ | GetTelAlarmSum | `/user-alarm-setting`（电话告警余量） | 改用 11.3 `items[].totalQuota/remainingQuota/quotaUnitName` |

### 3.6 alarmLog.js（消息中心）

| 状态 | action | 现状 | 目标 |
|---|---|---|---|
| ⚠️ | GetAlermList / GetAlermOrg | `/v1/alarms` ✅ 已有内联适配 | `alarmCodes` 的 `join(",")` **无效**，改重复参数；`pageSize` 上限 50；**`hasLocation=false` 时不得画地图**（现在无条件把 (0,0) 转坐标） |
| ❌ | DelAlermLog / BatchDeleteAlarm / AllDeleteAlarm | 全都打到 `/v1/alarms/read`（**标记已读 ≠ 删除**） | `POST /v1/alarms/dismiss`（空数组 = 一键清空） |
| ➕ | — | — 真正的"标记已读" `POST /v1/alarms/read` 目前没人调 | 进详情/点击时标已读；`GET /v1/alarms/unread-count` 驱动 Tab 角标（30 天窗口、封顶 99） |
| 🚫 | GetAlarmDetail | `/v2/alarm-log/{id}` | **无单条详情接口** → 详情页改用列表项本地数据；`endLng/endLat` 无来源，相关 UI 降级 |
| 🚫 | GetAlarmStatistics | `/alarm-log/statistics` | 无对应 → 前端按列表聚合或后端补 |
| ⚠️ | 告警类型 | 数字 `alarmType` | 契约是字符串 `alarmCode`（SOS/SHAKE/FENCE_IN/...），筛选 tab 的数字映射全换；未知码回退 `alarmName` 展示、**不得丢弃该条** |

### 3.7 audio.js（声音安防）

| 状态 | action | 现状 | 目标 |
|---|---|---|---|
| ⚠️ | GetAudioList | 路径 ✅；把 `data` 当数组用，`page` 取自不存在的 state 字段 | 响应 `{items,total,page,pageSize}`；`id` 是**字符串**；`duration` 恒 0（不要拿它画进度条总长）；用 `fileUrl` 或 `GET .../audios/{id}/file`(302) 播放 |
| ✅ | SendAudioCommand | `duration` 对 | 21021 不支持拾音、`ret=10` 离线 |
| 🚫 | AtouSendAudioCommand / AlwaysSendAudioCommand / GetautoStatus | `/record/auto`、`/record/always`、`/record/status` | 定时/持续模式硬件不支持（`doc/14`）→ UI 去掉；声控开关走 8.6 的 `S_AUDIO_AL` |
| 🚫 | DeleteAudio / PutAudioRead | `/record/{id}`、`/record/read` | 无对应（音频删除/已读） |

### 3.8 fence.js（围栏）

| 状态 | action | 现状 | 目标 |
|---|---|---|---|
| ⚠️ | GetUserEnclosure | 路径 ✅ | 响应 `{items,total}`；字段 `fenceId/fenceName/fenceShapeType/fenceRadius/centerLat/centerLng/enterAlarmEnable/getOutAlarmEnable/points[]` |
| ⚠️ | AddFence | 把页面对象整体当 body 发（`fenceData.points` 等 vendor 结构） | 按 `FenceMutation` 组装：`{fenceName,centerLat,centerLng,fenceRadius,enterAlarmEnable,getOutAlarmEnable,fenceShapeType,points[]}`；圆形 `fenceShapeType=1`（radius ≥50），多边形 `=2`（3~100 顶点） |
| ⚠️ | 坐标转换 | AddFence/FenceDetails 里做 WGS84↔GCJ02 互转 | **契约出入参就是 GCJ-02，前端不要再转**（现在等于转反了一次） |
| ⚠️ | FenceDetails | 路径 ✅；读 `data.fenceData.points` | 响应是 `{fence:{...},bindDeviceIds:[]}` 嵌套 |
| ❌ | GetCodeRegion / GetAllRegion | `/amap/config/district` | 单个行政区边界 → `GET /v1/regions/{adcode}/boundary`（返回可直接当 `points` 的顶点集）；三级区划树后端无对应 → 前端内置区划 JSON |
| — | 错误码 | — | 21018 重名 / 21019 超限（默认 10 个/设备）/ 21027 不存在；使能开关本期**只回显不生效** |

### 3.9 remoteSet.js（远程开关/设置/指令/操作记录）

| 状态 | action | 现状 | 目标 |
|---|---|---|---|
| ⚠️ | GetCommandRecord | `/v1/command-records` ✅ | 读 `data.list`/`count` → `items`/`total`；字段 `cmdName/cmdCode/cmdContent/channel/operator/sentAt/result/canOffline/offlineEffect`（`setListTransition` 依赖的 vendor 字段要重写） |
| ⚠️ | GetTerminalGarrison / GetCutBuffer / GetTerminalPower | 三个 action 都打 `/switch-status`（重复请求），页面按单个布尔值读 | 一次请求拿 `switches[]`；**三态 `on/off/unknown`，`unknown` 不得渲染成 off**；后端开关白名单只有 4 个：`S_DEFENSE`/`S_CLOSE`/`S_DIS_OIL_ELE`/`S_SHAKE_AL` |
| ❌ | SetTerminalGarrison / SetCutBuffer / SetTerminalPower | `/terminal/garrison`、`/terminal/cut-buffer`、`/terminal/set-power` | 统一走 10.1：`S_DEFENSE{open}` / `S_DIS_OIL_ELE{cut}` / `S_CLOSE{open}` |
| ❌ | SetResetTerminal | `/terminal/restart` | 10.1 `A_RESET`（无参数） |
| ⚠️ | GetTerminalParams / SetTerminalParams | `/remote-settings` ✅ / `/terminal/set-params` ❌ | 按 `settings[].paramsDef` 渲染表单（**禁止硬编码档位**），提交走 10.1 `{cmdCode,params}`。后端可设置项：定位模式、震动灵敏度、飞行模式档位、定位优先级(HLXT 才有) |
| ⚠️ | Locateing | 8.1 ✅ | `ret=10` 是"设备离线"（`code=0`），提示"稍后重试"，**不要说"已排队"**（A_POS_NOW 不支持离线补发） |
| ✅ | SendCommand | 10.1 ✅ | 补 `canOffline/ttlSeconds/appSource`；对 `forbidden` 指令传 `canOffline=1` 会 10001 |
| 🚫 | SetFactoryReset | `/terminal/factory` | registry 无恢复出厂指令 |
| 🚫 | GetWhiteTel / SetWhiteTel | `/terminal/white-list`（亲情号码） | 无对应指令；**与 notify-channels 的 notifyPhones 不是同一语义**，不要混用 |
| ➕ | 定位模式页 | 现在走 remote-settings + set-params | 改用专用 `GET/PUT /v1/devices/{id}/location-mode`，按 `availableModes` 渲染 |
| ➕ | 自检页 | 现在拼 remote-settings + switch-status | 改用 `GET /v1/devices/{id}/self-check`（五项：GPS/GSM/电池/ACC/电压，**无"存储空间"项**；21022 从未上报）；触发自检本期无接口 → 按钮去掉 |

### 3.10 report.js（报表）

| 状态 | 现状 | 目标 |
|---|---|---|
| ⚠️ | 路径与 `startDate/endDate/page/pageSize` ✅；读 `data.list`；字段读 `startTime/endTime/startLon/startLat/endLon/endLat` | 响应 `items/total`；行程字段 `startedAt/endedAt/startLat/startLng/endLat/endLng/distance/duration/maxSpeed/avgSpeed`；**停留只有单点 `lat/lng`**（老代码读起终两组）；跨度 ≤31 天、>30 天前的日期返回空段不报错 |
| ⚠️ | `SetReportInfo` 里用数组上不存在的 `.count` 判分页 | 按 `total` 判 `nomore` |

### 3.11 order.js / packageInfo.js（VIP 与充值）

| 状态 | action | 现状 | 目标 |
|---|---|---|---|
| ⚠️ | GetTopupOrderPage / GetDeviceOrderPage | `/v1/orders` ✅ | `items/total`；订单字段 `orderNo/orderStatus/orderStatusName/payAmount/productName/paidAt/expiredAt/createdAt`（老页面读 `outTradeNo/totalFee/payTime/status`，含 paySuccess 页的 URL 参数） |
| ⚠️ | CreateCardPackageOrderAuth | `/v1/orders` ✅ | 返回是**完整订单详情**，不含支付参数 |
| ➕ | — | 老代码直接拿 create 的返回调 `uni.requestPayment` | 必须两步：`POST /v1/orders/{orderNo}/pay` 拿 `payParams` 再透传 SDK；微信未绑定 21015 / 状态不允许 21025 |
| ➕ | — | — | `POST /v1/orders/{orderNo}/cancel` 取消订单（15 分钟未付自动过期） |
| ⚠️ | GetSimInfo / GetSimCardPackage | 会把 `iccid` 当 deviceId 拼进路径 | 只能用 deviceId；字段 `iccid/carrier/totalFlow/usedFlow/remainFlow/packageName/expiredAt/flowUnit`；无购买记录时全 0/null 是**正常态**不是错误 |
| ⚠️ | GetPackage | `/v1/vip/products` ✅ | `items[]`：`id/name/price/originalPrice/productType/productTypeName/durationDays/totalQuota/quotaUnit/quotaUnitName/serviceContent/purchaseNotes` |
| ➕ | — | — | `GET /v1/vip/categories`（增值服务多 tab）、`GET /v1/traffic/products`（流量包列表） |
| 🚫 | GetPayProvider | `/pay/provider` | 无对应 → 前端固定 1=微信 2=支付宝 |
| 🚫 | SendRefund | `/order/refund` | 无对应（退款申请） |

### 3.12 app.js / sys.js / wechat.js

| 状态 | action | 现状 | 目标 |
|---|---|---|---|
| ❌ | GetApplicationConfiguration | `/application-configuration` | 拆成 `GET /v1/app/about`（appName/version/copyright/website/email/privacyPolicyUrl/agreementUrl）+ 前端本地常量（vendor 的 pushAlarm/wechatAlarm/telAlarm/activation 开关） |
| ❌ | 检测更新 | `svc/bd05` → `/upgrade-app-version/check-version` | `GET /v1/app/version?platform=&version=`（platform 1安卓/2iOS/3小程序） |
| 🚫 | GetNoticeLatest / GetNoticeDetails | `/notice/*` | 无对应（公告） |
| 🚫 | GetAdvertising / ClickAd | `/app-ad/*` | 无对应（首页广告位） |
| 🚫 | GetWechatUser / GetWxSign | `/wx/get-wx-user-info`、`/wx/js-sign` | 无对应；微信告警绑定改走 `notify-channels.wechatPush` |
| ➕ | 我的页面 | 菜单硬编码 | `GET /v1/auth/app/mine/menus`（account）/ `GET /v1/devices/{id}/mine/menus`（device）服务端菜单驱动，三种身份形态菜单不同 |
| ➕ | — | — | 设备共享查看：`POST/GET /v1/auth/app/devices/{id}/shares`、`.../shares/revoke`、`GET /v1/auth/app/devices/shared-with-me` |

---

## 四、实施计划

每个阶段结束都要过"单测 + 契约回归 + 该阶段页面点检"三道门，不攒到最后。

### P0 基础设施（0.5 天）
- R1~R7 全部；`src/api` + `src/adapters` 骨架；jest + babel-jest 接入；`vue.config.js` 加 devServer 代理（`/v1 → :8010`）与端口（8080 被占，用 8090）。
- 门禁：`npm run test` 绿；`npm run dev:h5` 能起；`/v1/app/about` 能通。

### P1 登录与账号（1 天）
1.1~1.16、2.1~2.3、3.1/3.2、4.1~4.3、5.1/5.2 + 注销。含设备号登录、设备身份绑手机、设备密码找回、服务端菜单。
- 门禁：四种登录形态各跑通；`phoneBound=false` 走 21003 引导；改密后旧 token 失效（10002）。

### P2 设备主链路（1.5 天）— 做完就是一个能用的 App
1.9/1.10/6.1/6.2/6.6 + 绑定/解绑/默认设备/图标；首页 marker、下拉切换、设备信息页。适配器 `normalizeDeviceRow` / `normalizeDeviceNow` / `normalizeDeviceDetail`（关键：`id = deviceId`）。
- 门禁：从未上报的设备档案字段有值、实时字段缺省且 `code=0`（降级不报错）；解绑最后一台 21017；他人设备 21011。

### P3 只读功能页（1.5 天）
7.1 SIM / 7.2 分享（含公开查看页）/ 7.3 音频列表 / 8.3 轨迹 / 8.5 报表 / 9.2 自检 / 12.1~12.3 消息。
- 门禁：`truncated=true` 提示缩小范围；`hasLocation=false` 不画地图；跨度超限前端先拦；未读角标 99+。

### P4 控制类与设置（2 天）
8.1 立即定位 / 8.4 定位模式 / 8.6 告警设置 + 渠道 / 8.2 围栏 CRUD（含多边形与行政区）/ 9.3 开关 / 9.4 远程设置 / 10.1 指令 / 10.2 记录。
**页面重做集中在这里**：告警设置页（16 开关 → 4 可配项 + 渠道页）、远程开关页（列表化 + 三态）、围栏编辑页（形状 + 不再自转坐标）。
- 门禁：`unknown` 三态渲染正确；离线 `ret=10` 文案区分；`forbidden` 指令不传 `canOffline=1`；指令限流 10s/3 条触发 10005 有正确提示。

### P5 商城与收尾（1 天）
11.1~11.3 产品/订单/支付两步/取消/VIP 分类/流量包；下线 🚫 项入口（按 D4 决定）；回写 `doc/api` 的文档缺口；更新 `docs/api-list.md` 为新契约对照表。

---

## 五、测试方案

| 层 | 内容 | 工具 | 门禁 |
|---|---|---|---|
| 单测 | 适配器纯函数（嵌套→扁平、int64 转数值、三态映射、告警码映射、坐标不再转换）；api 层 URL/参数序列化（**重复参数**、时间格式、跨度校验、分页上限） | jest + babel-jest（新增） | adapters/api 覆盖率 ≥80%，先写测试再改实现 |
| 契约回归 | 把契约字段表编码成断言表，拿真 token 打真后端，逐接口断言字段存在性/类型/信封 | 新增 `tools/contract-check.js`（node，零依赖） | 每阶段结束全绿；字段漂移一眼可见 |
| 黑盒错误矩阵 | 手册 §5 的 7 条通用矩阵（无 token/身份不符/越权/参数非法/限流/未绑手机/HTTP 恒 200）+ 各模块特有码 | 复用 `test/app-user-blackbox/`（已有套件，python + shell） | 越权用例是红线：凡接受 deviceId/fenceId/orderNo/音频 id 的接口逐个测 |
| H5 冒烟 | 遍历全部路由收集 console 错误，已内置预期错误白名单 | 已有 `tools/smoke.js`（puppeteer） | 新增错误数为 0 |
| 真机 | 地图 / 扫码 / 支付 / 推送只能真机 | `npm run build:app-plus` → HBuilderX | P2/P4/P5 各一轮 |

---

## 六、本地环境（现状）

**已经起好的**
- device-app backend：`:8010`（`apps/device-app/backend/bin/backend -conf configs/config.yaml`），日志在 scratchpad。已验证：图形验证码 → 短信码 → 手机号登录 → 我的菜单 → 绑定设备 → 6.1/6.2 全链路可达。
- MySQL `lot`（本机 3306）、Redis（6379、16380）本来就在跑；`lot` 库有 App 用户模块全部表和夹具设备。
- 前端依赖已装（`npm install`，1512 个包；`npm ci` 会因 lock 与 package.json 不同步而失败，用 `npm install`）。
- H5 dev server：`npm run dev:h5` 能起（Node 25 + webpack4 靠 npm scripts 里那两个兼容开关），8080 被别的进程占用后自动落到 **`:8081`**，页面已能加载。

**联调夹具**
- 账号 `13800001234`；联调环境短信码固定 `123456`，图形码答案固定 `1234`（uuid 仍需有效且一次性）。
- 设备 `13800138000`、`13800138001`（密码 `123456`，已绑到上面这个账号）；`13800138003` 属另一账号（可用于越权用例）；`bb-blackbox-device-3` 密码 `DevPass9903`。

**还缺的（会直接影响联调）**
1. **iot-runtime litebiz `:9080` 没起** → 实时态/轨迹/告警/围栏/音频/报表/开关/自检/指令**全部返回 20004**。目前只有 MySQL 侧接口（登录/账号/菜单/绑定/订单/产品/SIM/版本/图标）能联调。预编译二进制在 `services/iot-runtime/target/release/litebiz`（7/27，可能落后 HEAD）；依赖 Mongo（本机 27017 无监听，docker 上是 27018）+ Redis 16380（在跑）。
2. **本地库缺唯一键**：`lot_app_user_device` 只有主键和 `deleted_at` 索引，缺 `migrations/mysql/device-app/001` 里的 `uk_device_id` —— 表是 GORM automigrate 建的。后果实测过：同一设备能被两个账号绑定，之后归属校验必然 21011（假越权）。建议补索引再联调。
3. H5 的 8080 端口被别的进程（`wxgzh`）占着，dev server 已自动落到 8081；devServer 代理还没配（浏览器直连 `:8010` 会跨域）。

---

## 七、待拍板（影响工作量与页面取舍）

- **D1 逆地理编码**：后端加 `/v1/geo/regeo` 代理（key 留在服务端，和老架构一致）vs 前端直连高德/百度 web API（`work.md` 里有 web AK）。影响首页、轨迹、报表、消息四处地址文案。
- **D2 设备能力开关**：页面有 12 个 `enableXxx` 和 24 处 `terminalTypeDisplayName`，契约无对应。用 `GET /v1/devices/{id}/commands` 指令树推导 vs 后端补 capability 接口 vs 一律放开。
- **D3 坐标系**：围栏契约明确 GCJ-02；轨迹/报表/告警/实时态**没写**。要后端确认，否则地图整体偏移。
- **D4 无后端能力的 20 项怎么处理**（下线入口 / 等后端 / 前端本地实现）：公告、首页广告、退款、亲情号码、恢复出厂、音频删除+已读+定时/持续模式、告警统计、告警详情、日历数据打点、改昵称、APP 推送开关、Apple 绑定/解绑、定位过滤、企业树、设备统计、支付渠道列表、微信 JS-SDK 签名、微信用户资料、三级区划树。
- **D5 契约文档回写**：`doc/api/device-app-api.md` v1.2 落后 proto 十余项（图标库、告警渠道、消息清空、轨迹删除、行政区边界、VIP 分类、账号注销、设备共享、围栏多边形、`DeviceVipReply.items`），且 12.1 的 `deviceIds` "逗号分隔"写法与实现不符。
