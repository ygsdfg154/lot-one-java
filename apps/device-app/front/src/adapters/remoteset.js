/**
 * 远程设置 / 开关 / 告警开关的"厂商项名 → 契约"映射。
 *
 * 反编译产物里每个入口带一个字符串 `param`（`OffOn`/`Garrison`/`Vibration`…），原厂靠
 * `/terminal/set-params` 一个接口按 `FieldName` 打通所有设置。契约把这件事拆成三类，
 * 各有权威源：
 *
 *   - **开关类**（9.3.1 `switches[]`）：当前态取 `switchStatus`（含 `unknown` 第三态），
 *     下发把 `cmdParams` 里的状态值翻转后走 10.1；
 *   - **告警开关类**（8.6.1 `alarmItems[]`）：当前态取 `alarmEnable`，下发走 8.6.2 PUT
 *     （不是指令——告警开关存在平台/iot-runtime 侧，不是每次都要打到设备）；
 *   - **档位类**（9.4.1 `settings[]` 给定义 + 8.4.1 给当前值）：下发走 10.1。
 *
 * 一个入口到底属于哪类由这张表决定，页面不再自己拼接口。
 */

/** 开关类：param → 9.3.1 的 switchCode。 */
export const SWITCH_OF = {
  OffOn: 'device_power', //     开关机   S_CLOSE   {open}
  Garrison: 'defense', //       布防/撤防 S_DEFENSE {open}
  Buffer: 'oil_electricity', // 断油断电 S_DIS_OIL_ELE {cut}
};

/** 告警开关类：param → 8.6.1 的 alarmCode。 */
export const ALARM_OF = {
  Vibration: 'S_SHAKE_AL',
  TamperAlarm: 'S_REMOVE_AL',
  LowBatteryAlarm: 'S_LOW_POWER_AL',
  VoiceAlarm: 'S_AUDIO_AL',
  SosAlarm: 'SOS',
  CutPowerAlarm: 'POWER_OFF',
  SpeedAlarm: 'OVER_SPEED',
};

/** 带阈值的告警项：开启时 `alarmValue` 必填（超速的阈值就是限速值）。 */
export const ALARM_WITH_VALUE = { SpeedAlarm: { unit: 'km/h', max: 200 } };

/** 入口归类：'switch' | 'alarm' | 'family' | 'custom' | 'unsupported'。 */
export function kindOf(param) {
  if (SWITCH_OF[param]) return 'switch';
  if (ALARM_OF[param]) return 'alarm';
  if (param === 'white') return 'family';
  // 自定义文本指令：registry 里是 CUSTOM_CMD（content ≤512），能力位 customCmd 决定入口
  if (param === 'custom') return 'custom';
  return 'unsupported';
}

/**
 * 9.3.1 的一个开关 → 组件要的 `{on, unknown}`。
 *
 * `switchStatus` 是三态：`unknown` 表示既没有遥测快照也没有下发记录，此时**不能当成关**
 * ——用户会看到一个"已关闭"的假状态，然后点开关反而把设备关了。
 */
export function switchState(sw) {
  if (!sw) return { on: false, unknown: true, statusText: '' };
  return {
    on: sw.switchStatus === 'on',
    unknown: sw.switchStatus !== 'on' && sw.switchStatus !== 'off',
    statusText: sw.switchStatusText || '',
  };
}

/**
 * 开关下发参数：把 9.3.1 给的 `cmdParams` 里的布尔位翻成目标态。
 *
 * 哪个键是状态位由后端给（`S_CLOSE` 是 `open`、`S_DIS_OIL_ELE` 是 `cut`），前端不猜键名：
 * 取 `cmdParams` 里第一个布尔值的键。整个对象原样带回，避免丢掉别的参数。
 */
export function switchCmd(sw, on) {
  const params = { ...(sw && sw.cmdParams ? sw.cmdParams : {}) };
  const boolKey = Object.keys(params).find((k) => typeof params[k] === 'boolean');
  if (boolKey) params[boolKey] = !!on;
  return { cmdCode: sw && sw.cmdCode, params };
}
