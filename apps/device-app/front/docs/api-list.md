# API 接口清单

> 从打包产物中静态提取，共 **155** 个接口（按 `METHOD + URL` 去重）。
> `{...}` 表示该段是运行时拼接的变量，尖括号内为反编译出的表达式。

## 服务端地址

- `http://h5.akbee.com/v1`
- `https://m.qzwlvp.com/download/qzwl/`
- `https://app.qzwlvp.com/pagesMore/public/locate`
- `https://work.weixin.qq.com/kfid/kfc8d9c8750e70bab5f`
- `https://m.qzwlvp.com/docs/about/privacy-policy.html`
- `https://m.qzwlvp.com/docs/about/service-agreement.html`
- `https://shop.zhitugps.com/mobile/pages/login/auto-login`

## 接口一览

### account

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| POST | `/account/bind-apple` | `openId: t.openId`<br>`authorizationCode: t.authorizationCode`<br>`identityToken: t.identityToken` | `app-service.js` |
| POST | `/account/bind-wechat` | `code: t.code`<br>`type: t.type` | `app-service.js` |
| POST | `/account/cancellation` | `phoneNumber: t.phoneNumber`<br>`code: t.code` | `app-service.js` |
| POST | `/account/unbind-{t.mode}` |  | `app-service.js` |
| GET | `/account/user/oauth` |  | `app-service.js` |

### alarm-log

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| DELETE | `/alarm-log/{t.id}` |  | `app-service.js` |
| DELETE | `/alarm-log/batch` | `<t.data>` | `app-service.js` |
| DELETE | `/alarm-log/clear?terminalId={n.id}` |  | `app-service.js` |
| GET | `/alarm-log/statistics` | `type: t.type` | `app-service.js` |

### amap

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/amap/config/district?extensions=all&keywords={t}` |  | `app-service.js` |
| GET | `/amap/config/district?extensions=all&keywords=100000&subdistrict=3` |  | `app-service.js` |

### app

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| POST | `/app/bind-phone` | `applicationId: u.default.applicationId`<br>`username: t.username`<br>`password: (0, s.default)(t.password).toUpperCase()`<br>`phoneNumber: t.phoneNumber`<br>`captcha: t.captcha` | `app-service.js` |

### app-ad

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/app-ad/click/{n.id}` |  | `app-service.js` |
| GET | `/app-ad/publish/{o.default.applicationId}` |  | `app-service.js` |

### application-configuration

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/application-configuration` |  | `app-service.js` |

### auth

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| POST | `/auth/bind-user/apple` | `<f(f({}, uni.getSystemInfoSync()), {}, { applicationId: u.default.applicationId, pushClientId: d.default.state.app.pushClientId, openId: n.openId, authorizationCode: n.authorizationCode, identityToken: n.identityToken, username: n.username, verifyCode: n.verifyCode })>` | `app-service.js` |
| POST | `/auth/bind-user/wechat` | `<f(f({}, uni.getSystemInfoSync()), {}, { applicationId: u.default.applicationId, pushClientId: d.default.state.app.pushClientId, code: n.code, type: n.type, username: n.username, verifyCode: n.verifyCode })>` | `app-service.js` |
| POST | `/auth/login` | `<f(f({}, uni.getSystemInfoSync()), {}, { applicationId: u.default.applicationId, username: t.username, password: t.password, pushClientId: d.default.state.app.pushClientId })>` | `app-service.js` |
| POST | `/auth/login/apple` | `<f(f({}, uni.getSystemInfoSync()), {}, { applicationId: u.default.applicationId, openId: t.openId, authorizationCode: t.authorizationCode, identityToken: t.identityToken, pushClientId: d.default.state.app.pushClientId })>` | `app-service.js` |
| POST | `/auth/login/wechat` | `<f(f({}, uni.getSystemInfoSync()), {}, { applicationId: u.default.applicationId, code: t.code, type: t.type, pushClientId: d.default.state.app.pushClientId })>` | `app-service.js` |
| POST | `/auth/register` | `phoneNumber: t.phoneNumber`<br>`password: (0, s.default)(t.password).toUpperCase()`<br>`code: t.code` | `app-service.js` |
| PUT | `/auth/reset-pwd` | `phoneNumber: t.phoneNumber`<br>`password: t.password`<br>`code: t.code` | `app-service.js` |
| PUT | `/auth/update-pwd` | `oldPassword: t.oldPassword`<br>`newPassword: t.password` | `app-service.js` |

### captcha

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/captcha` |  | `app-service.js` |

### command

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/command/page` | `terminalId: t.terminalId`<br>`page: i.page`<br>`limit: i.limit` | `app-service.js` |

### enterprise

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/enterprise/tree` |  | `app-service.js` |

### fence

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| DELETE | `/fence/{t}` |  | `app-service.js` |

### notice

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/notice/{t}` |  | `app-service.js` |
| GET | `/notice/latest` |  | `app-service.js` |

### order

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/order/{t.id}` |  | `app-service.js` |
| GET | `/order/{t}` |  | `app-service.js` |
| POST | `/order/create` | `clientType: s.default.state.app.sysInfo.uniPlatform`<br>`deviceId: s.default.state.app.sysInfo.deviceId`<br>`productId: t.productId`<br>`provider: t.provider`<br>`terminalId: t.terminalId`<br>`openid: t.openid \|\| ""`<br>`iccid: t.iccid \|\| ""` | `app-service.js` |
| GET | `/order/page` | `page: t.page`<br>`limit: t.limit`<br>`terminalId: t.terminalId` | `app-service.js` |
| POST | `/order/refund` | `orderId: t.orderId`<br>`requestFee: t.requestFee`<br>`refundReason: t.refundReason`<br>`contactName: t.contactName`<br>`contactTel: t.contactTel`<br>`allowCall: t.allowCall` | `app-service.js` |
| GET | `/order/topup/page` | `page: n.page`<br>`limit: n.limit` | `app-service.js` |

### pages

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/pages/app-updateVersions/pages/upgrade-popup?local_storage_key=__package_info__` |  | `app-service.js` |
| GET | `/pages/dev/push-message` |  | `pagesMore/my/developers/push-msgs.js` |
| GET | `/pages/home/home` |  | `app-service.js`<br>`pagesCore/login/bind-tel-more.js`<br>`pagesCore/login/bind-tel.js` |
| GET | `/pages/signin/index` |  | `pagesCore/login/bind-tel-more.js` |

### pagesCore

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/pagesCore/account/revise-userInfo` |  | `pages/my/my.js` |
| GET | `/pagesCore/login/bind-tel-more?type=apple` |  | `pagesCore/login/index.js` |
| GET | `/pagesCore/login/bind-tel-more?type=weixin` |  | `pagesCore/login/index.js` |
| GET | `/pagesCore/login/bind-tel?terminalNo={e.username}&password={e.password}` |  | `pagesCore/login/index.js` |
| GET | `/pagesCore/login/find-pas?phone={this.username}` |  | `pagesCore/login/index.js` |
| GET | `/pagesCore/login/index` |  | `pages/home/home.js`<br>`pagesMore/my/developers/developers.js`<br>`pagesCore/account/revise-pwd.js`<br>…(+2) |
| GET | `/pagesCore/login/index?back={!0}` |  | `app-service.js`<br>`pages/ability/index.js`<br>`pages/home/home.js`<br>…(+33) |
| GET | `/pagesCore/login/register` |  | `pagesCore/login/index.js` |
| GET | `/pagesCore/webframe?url={t.advertisingContent[e].linkUrl}` |  | `pages/home/home.js` |

### pagesFunc

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/pagesFunc/deviceInfo/index` |  | `pages/ability/index.js` |
| GET | `/pagesFunc/terminal/alerts-set/index` |  | `pages/ability/index.js` |
| GET | `/pagesFunc/terminal/audio/index` |  | `pages/ability/index.js` |
| GET | `/pagesFunc/terminal/corral/info?enclosureType={[0, 2, 3][e.tapIndex]}` |  | `pagesFunc/terminal/corral/list.js` |
| GET | `/pagesFunc/terminal/corral/info?fenceId={e.id}` |  | `pagesFunc/terminal/corral/list.js` |
| GET | `/pagesFunc/terminal/corral/list` |  | `pages/ability/index.js` |
| GET | `/pagesFunc/terminal/device-card` |  | `pages/ability/index.js` |
| GET | `/pagesFunc/terminal/list/index?bind={!0}` |  | `pages/home/home.js` |
| GET | `/pagesFunc/terminal/locate-mode/index` |  | `pages/ability/index.js` |
| GET | `/pagesFunc/terminal/locus/index` |  | `pages/ability/index.js` |
| GET | `/pagesFunc/terminal/remote-setup/index` |  | `pages/ability/index.js` |
| GET | `/pagesFunc/terminal/remote-setup/list` |  | `pages/ability/index.js` |
| GET | `/pagesFunc/terminal/self-detection` |  | `pages/ability/index.js` |
| GET | `/pagesFunc/terminal/trip-report/detail` |  | `pagesFunc/app-sub-service.js` |
| GET | `/pagesFunc/terminal/trip-report/list` |  | `pages/ability/index.js` |

### pagesMore

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/pagesMore/message/statement?id={e.id}` |  | `pages/msg/index.js` |
| GET | `/pagesMore/message/table?alarmType={e}&current={this.currentTime + 1}` |  | `pages/msg/index.js` |
| GET | `/pagesMore/my/developers/push-msgs` |  | `pagesMore/my/developers/developers.js` |
| GET | `/pagesMore/my/support` |  | `pagesPay/app-sub-service.js`<br>`pagesPay/card/index.js`<br>`pagesPay/value-added/index.js`<br>…(+3) |
| GET | `/pagesMore/notice/index` |  | `pages/home/home.js` |

### pagesPay

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/pagesPay/appreciation/index` |  | `pages/ability/index.js`<br>`pages/home/home.js` |
| GET | `/pagesPay/card/index?iccid={this.iccid}` |  | `pagesFunc/terminal/device-card.js` |
| GET | `/pagesPay/list/indent-device` |  | `pages/ability/index.js` |
| GET | `/pagesPay/list/specifics?id={t.id}` |  | `pagesPay/list/indent.js` |
| GET | `/pagesPay/paySuccess/index?outTradeNo={i.data.outTradeNo}&payTime={i.data.payTime}&totalFee={i.data.totalFee}` |  | `pagesPay/app-sub-service.js` |
| GET | `/pagesPay/paySuccess/index?outTradeNo={s.data.outTradeNo}&payTime={s.data.payTime}&totalFee={s.data.totalFee}` |  | `pagesPay/card/index.js`<br>`pagesPay/value-added/index.js` |
| GET | `/pagesPay/value-added/index` |  | `pagesFunc/app-sub-service.js`<br>`pages/ability/index.js`<br>`pages/home/home.js` |
| GET | `/pagesPay/value-added/index?type=3&alarm=0` |  | `pagesFunc/terminal/alerts-set/wx.js` |
| GET | `/pagesPay/value-added/index?type=3&alarm=1` |  | `pagesFunc/terminal/alerts-set/phone.js` |
| GET | `/pagesPay/value-added/index?type=3&alarm=2` |  | `pagesFunc/terminal/alerts-set/messages.js` |

### pay

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/pay/provider` |  | `app-service.js` |

### position-share-record

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| POST | `/position-share-record` | `terminalId: t.deviceId`<br>`userId: t.userId`<br>`duration: t.duration` | `app-service.js` |

### record

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| DELETE | `/record/{n}` |  | `app-service.js` |
| POST | `/record/always` | `terminalId: t.deviceId`<br>`isOpen: t.state` | `app-service.js` |
| POST | `/record/auto` | `terminalId: t.deviceId`<br>`isAuto: t.state`<br>`seconds: 30` | `app-service.js` |
| GET | `/record/page` | `terminalId: o`<br>`limit: a.limit`<br>`recordId: c \|\| 0`<br>`updateType: l \|\| 0`<br>`createTimeStart: f`<br>`createTimeEnd: m` | `app-service.js` |
| PUT | `/record/read` | `id: t.id` | `app-service.js` |
| POST | `/record/send` | `terminalId: t.deviceId`<br>`seconds: t.timeValue` | `app-service.js` |
| GET | `/record/status` | `terminalId: t.deviceId` | `app-service.js` |

### service-package

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/service-package/{t.path}` | `terminalId: t.deviceId` | `app-service.js` |
| GET | `/service-package/simcard` | `iccid: t.iccid` | `app-service.js` |

### simcard

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/simcard/card-info/{t.iccid}` |  | `app-service.js` |
| GET | `/simcard/get-card-alarm/{n.iccid}` |  | `app-service.js` |

### sms-code?phoneNumber={t.phoneNumber}&captchaId={t.captchaId}&captchaCode={t.captchaCode}

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/sms-code?phoneNumber={t.phoneNumber}&captchaId={t.captchaId}&captchaCode={t.captchaCode}` |  | `app-service.js` |

### system

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| PUT | `/system/user/nickname` | `nickName: t.nickName` | `app-service.js` |
| GET | `/system/user/user-info` |  | `app-service.js` |

### terminal

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| PUT | `/terminal` | `id: t.terminalId`<br>`terminalName: t.deviceName` | `app-service.js` |
| GET | `/terminal/{t.deviceID}` |  | `app-service.js` |
| POST | `/terminal/bind` | `terminalNo: t.terminalNo`<br>`password: (0, u.default)(t.password).toUpperCase()` | `app-service.js` |
| POST | `/terminal/cut-buffer` | `terminalId: t.TerminalId`<br>`isCutButter: t.isCutButter` | `app-service.js` |
| GET | `/terminal/cut-buffer/{t.terminalId}` |  | `app-service.js` |
| POST | `/terminal/factory` | `terminalId: t.TerminalId` | `app-service.js` |
| PUT | `/terminal/filter` | `id: t.terminalId`<br>`lbs: t.Lbs`<br>`wifi: t.Wifi \|\| 0`<br>`mix: t.Mix \|\| 0`<br>`lbsLocation: t.LbsLocation \|\| 0`<br>`wifiLocation: t.WifiLocation \|\| 0`<br>`mixLocation: t.MixLocation \|\| 0` | `app-service.js` |
| GET | `/terminal/funcs/{n.id}` |  | `app-service.js` |
| POST | `/terminal/garrison` | `terminalId: t.deviceId`<br>`isGarrison: t.isSetDefence` | `app-service.js` |
| GET | `/terminal/garrison/{t.deviceId}` |  | `app-service.js` |
| PUT | `/terminal/icon` | `id: t.terminalId`<br>`iconType: t.iconType` | `app-service.js` |
| POST | `/terminal/locate` | `TerminalId: n` | `app-service.js` |
| GET | `/terminal/page` | `<c>` | `app-service.js` |
| GET | `/terminal/params-info/{t.terminalId}` |  | `app-service.js` |
| GET | `/terminal/power/{t.terminalId}` |  | `app-service.js` |
| POST | `/terminal/restart` | `terminalId: t.TerminalId` | `app-service.js` |
| POST | `/terminal/send-command` | `terminalId: t.deviceId`<br>`command: t.directive` | `app-service.js` |
| POST | `/terminal/set-params` | `terminalId: t.deviceId`<br>`params: t.param` | `app-service.js` |
| POST | `/terminal/set-power` | `terminalId: t.deviceId`<br>`powerOn: t.state` | `app-service.js` |
| GET | `/terminal/statistics` | `<a>` | `app-service.js` |
| POST | `/terminal/unbind` | `id: t.id` | `app-service.js` |
| PUT | `/terminal/update-pwd` | `terminalNo: t.terminalNo`<br>`oldPassword: t.oldPassword`<br>`newPassword: t.password` | `app-service.js` |
| GET | `/terminal/value-added/{t.terminalId}` |  | `app-service.js` |
| POST | `/terminal/white-list` | `terminalId: t.deviceId`<br>`phoneList: t.phoneList` | `app-service.js` |
| GET | `/terminal/white-list/{t.deviceId}` |  | `app-service.js` |

### terminal-alarm-setting

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/terminal-alarm-setting/{n.device.selectedTerminal.id}` | `appId: s.default.applicationId` | `app-service.js` |
| POST | `/terminal-alarm-setting/set-fence-alarm` | `id: t.id`<br>`status: t.status` | `app-service.js` |
| POST | `/terminal-alarm-setting/set-low-power-alarm` | `id: t.id`<br>`status: t.status` | `app-service.js` |
| POST | `/terminal-alarm-setting/set-offline-alarm` | `id: t.id`<br>`status: t.status` | `app-service.js` |
| POST | `/terminal-alarm-setting/set-power-off-alarm` | `id: t.id`<br>`status: t.status` | `app-service.js` |
| POST | `/terminal-alarm-setting/set-push-alarm` | `id: t.id`<br>`status: t.status`<br>`pushClientId: a.app.pushClientId` | `app-service.js` |
| POST | `/terminal-alarm-setting/set-rest-alarm` | `id: t.id`<br>`status: t.status` | `app-service.js` |
| POST | `/terminal-alarm-setting/set-sms-alarm` | `id: t.id`<br>`status: t.status` | `app-service.js` |
| POST | `/terminal-alarm-setting/set-sms-phone-number` | `id: t.id`<br>`smsPhoneNo1: t.alarmSmsList[0]`<br>`smsPhoneNo2: t.alarmSmsList[1]`<br>`smsPhoneNo3: t.alarmSmsList[2]`<br>`smsPhoneNo4: t.alarmSmsList[3]`<br>`smsPhoneNo5: t.alarmSmsList[4]`<br>`smsPhoneNo6: t.alarmSmsList[5]` | `app-service.js` |
| POST | `/terminal-alarm-setting/set-sos-alarm` | `id: t.id`<br>`status: t.status` | `app-service.js` |
| POST | `/terminal-alarm-setting/set-speed-alarm` | `id: t.id`<br>`status: t.status` | `app-service.js` |
| POST | `/terminal-alarm-setting/set-tear-alarm` | `id: t.id`<br>`status: t.status` | `app-service.js` |
| POST | `/terminal-alarm-setting/set-tel-alarm` | `id: t.id`<br>`status: t.status` | `app-service.js` |
| POST | `/terminal-alarm-setting/set-tel-phone-number` | `id: t.id`<br>`telPhoneNo1: t.alarmTelList[0]`<br>`telPhoneNo2: t.alarmTelList[1]`<br>`telPhoneNo3: t.alarmTelList[2]`<br>`telPhoneNo4: t.alarmTelList[3]`<br>`telPhoneNo5: t.alarmTelList[4]`<br>`telPhoneNo6: t.alarmTelList[5]` | `app-service.js` |
| POST | `/terminal-alarm-setting/set-vibration-alarm` | `id: t.id`<br>`status: t.status` | `app-service.js` |
| POST | `/terminal-alarm-setting/set-voice-alarm` | `id: t.id`<br>`status: t.status` | `app-service.js` |
| POST | `/terminal-alarm-setting/set-wechat-alarm` | `id: t.id`<br>`wechatNickname: t.nickname`<br>`wechatHeadimgurl: t.headImgUrl`<br>`wechatOpenUnionid: t.unionId`<br>`status: !0` | `app-service.js` |

### terminal-vip

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/terminal-vip/list/type` | `terminalId: t.terminalId`<br>`type: t.type` | `app-service.js` |

### upgrade-app-version

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| POST | `/upgrade-app-version/check-version` | `<t>` | `app-service.js` |

### user-alarm-setting

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/user-alarm-setting` |  | `app-service.js` |

### v2/alarm-log

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/v2/alarm-log/{t.alarmId}` |  | `app-service.js` |
| GET | `/v2/alarm-log/page` | `<o>` | `app-service.js` |

### v2/fence

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/v2/fence` | `<n[0]>` | `app-service.js` |
| GET | `/v2/fence/{n}` |  | `app-service.js` |
| GET | `/v2/fence/page?terminalId={t.terminalId}` |  | `app-service.js` |

### v2/map

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/v2/map/geocode/regeo` | `location: ("").concat(t.longitude, ",").concat(t.latitude)` | `app-service.js` |

### v2/position-share-record

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/v2/position-share-record/code?code={t.code}` |  | `app-service.js` |
| GET | `/v2/position-share-record/lbs-info/code?code={t.code}` |  | `app-service.js` |

### v2/terminal

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/v2/terminal/{l}` |  | `app-service.js` |
| GET | `/v2/terminal/ids` | `ids: l.join(",")` | `app-service.js` |

### v2/track

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/v2/track/info?terminalId={a}&startTime={s}&endTime={u}` |  | `app-service.js` |

### v2/trip

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/v2/trip/stopover/page` | `terminalId: t.deviceId`<br>`page: a.page`<br>`limit: a.limit \|\| 20`<br>`startTime: l`<br>`endTime: f` | `app-service.js` |
| GET | `/v2/trip/trip/page` | `terminalId: t.deviceId`<br>`page: a.page`<br>`limit: a.limit \|\| 20`<br>`startTime: l`<br>`endTime: f` | `app-service.js` |

### wx

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/wx/get-wx-user-info` | `code: t.code`<br>`type: t.type` | `app-service.js` |
| POST | `/wx/js-sign` | `url: t.url` | `app-service.js` |

### {t.type}

| Method | URL | 请求参数 | 出现位置 |
| --- | --- | --- | --- |
| GET | `/{t.type}/dates` | `terminalId: t.terminalId` | `app-service.js` |
