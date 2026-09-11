/**
 * 厂商功能位（`terminalFuncs`）适配。
 *
 * 反编译产物的模板里到处是厂商的**数字功能 id**：`v-if="terminalFuncShow(43)"` 分散在十几个
 * 页面里。这些 id 本身没有语义，但把它们逐个换成语义字段要动十几个模板，收益只是少一层
 * 映射；放在这里反而让"入口凭什么显隐"集中在一个文件、能被测试覆盖。原厂靠
 * `/terminal/funcs/{id}` 返回 `[{id}]` 决定显隐，本平台的权威依据换成两处：
 *
 *   - 契约 6.1 `capabilities`（由产品命令树推导的一组布尔）——设备**能不能收**这条指令；
 *   - 契约 8.6.1 `alarmItems[].alarmCode`——这台设备**有哪些可配的告警项**。
 *
 * 所以这里做一次翻译：capabilities + 已加载的告警项 → 厂商 id 数组，`funcShowHandler`
 * 不用改就能继续用。宁可少画一个入口，也不要画出点了必然 21021 的入口。
 */

/** 平台侧功能：与机型无关，所有设备一致可用（契约 6.1 "设备能力"小节的注）。 */
const ALWAYS = () => true;
/** 契约未提供的能力：入口直接隐藏，避免画出一个点了没反应的按钮。 */
const NEVER = () => false;

/**
 * 厂商 id → 判定规则。
 *
 * `caps` 是 6.1 的 capabilities；`codes` 是 8.6.1 的 alarmCode 集合，**未加载时为 null**
 * ——此时告警类项按默认值显示，避免设置页首帧整页空白。已加载但为空集是另一回事：
 * 那表示这台设备确实没有可配告警项，应当全部隐藏。
 */
const RULES = {
  // —— 指令类：必须有对应指令码，否则设备收不到 ——
  1: (c) => !!c.defense, //          布防/撤防         S_DEFENSE
  19: (c) => !!c.locate, //          立即定位          A_POS_NOW
  22: (c) => !!c.powerOff, //        远程开关机        S_CLOSE
  28: (c) => !!c.locate, //          立即定位（另一处入口）
  29: (c) => !!c.restart, //         终端重启          A_RESET

  12: (c) => !!c.oilCut, //          断油断电          S_DIS_OIL_ELE（i18n key 叫 buffer）
  10001: (c) => !!c.posMode, //      定位模式（原"上传间隔"）I_POS_MOD_LEVEL

  // —— 平台侧功能：不设开关 ——
  3: ALWAYS, //                      历史轨迹（8.3）
  16: ALWAYS, //                     电子围栏（8.2）
  18: ALWAYS, //                     电量展示（快照字段，无值时页面显示 -）
  52: ALWAYS, //                     流量卡信息（7.1，无购买记录时字段为 0，仍可看）
  57: ALWAYS, //                     分享定位（7.2）
  58: ALWAYS, //                     报表（8.5）
  // 亲情号（9.5）：号码存平台侧总是可用（通知渠道会用），所以入口恒显示；
  // 下发指令 S_FAMILY_NUM 的协议帧待文档，后端按下发结果给 pendingSync，
  // 前端据此提示"已保存，待设备同步"而不是"设置成功"
  35: ALWAYS, //                     亲情号码（9.5）

  31: (c) => !!c.customCmd, //       自定义文本指令      CUSTOM_CMD
  14: (c) => !!c.audio, //           声音安防入口（功能页宫格）S_AUDIO_AL
  20: (c) => !!c.audio, //           声控声音安防        S_AUDIO_AL

  // —— 以下几项的指令码与参数已在 contracts/commands/registry.yaml 定稿，**协议帧体
  // 待厂商文档**（support-matrix.yaml 里 supported:false）。入口照常按能力位显隐：
  // 产品把指令配上了就出现，点下去网关 REJECTED、如实回"设备不支持"，不会静默成功。
  // 协议接入当天前端一行都不用改 ——
  42: (c) => !!c.factoryReset, //     恢复出厂设置      A_FACTORY_RESET
  26: (c) => !!c.audioAlways, //      持续声音安防      S_AUDIO_ALWAYS

  // —— 告警类：按 8.6.1 这台设备实际返回的 alarmCode 显隐 ——
  43: alarmRule('S_SHAKE_AL', (c) => !!c.shakeAlarm), // 震动告警（含灵敏度）
  44: alarmRule('OVER_SPEED', ALWAYS), //               超速告警（阈值型，平台侧配置）
  45: alarmRule('S_REMOVE_AL', ALWAYS), //              拆除告警
  46: alarmRule('S_AUDIO_AL', (c) => !!c.audio), //     声控声音安防（拾音）
  55: alarmRule('S_LOW_POWER_AL', ALWAYS), //           低电告警
  59: alarmRule('SOS', ALWAYS), //                      SOS 告警
  60: alarmRule('POWER_OFF', ALWAYS), //                主电源断开告警
  47: alarmRule('MOVE', NEVER), //                      静止/位移告警——8.6 暂无此配置项
  65: alarmRule('OFFLINE', NEVER), //                   离线告警——8.6 暂无此配置项
};

/**
 * 告警类判定：8.6.1 已加载时**只认返回的码**（这台设备到底能配什么，后端说了算，
 * 返回空数组就是"一项都不能配"）；还没加载（codes 为 null）时退回 `fallback`，
 * 让设置页首帧不至于全空。
 */
function alarmRule(code, fallback) {
  return (caps, codes) => (codes ? codes.has(code) : fallback(caps));
}

/** 厂商 id 全集（测试与文档用；顺序即上面的书写顺序）。 */
export const VENDOR_FUNC_IDS = Object.keys(RULES).map(Number);

/**
 * capabilities（+ 可选的 8.6.1 告警码集合）→ 厂商功能位数组 `[{id}]`。
 *
 * caps 为空（详情还没回来 / 设备未分配产品）时返回空数组：`funcShowHandler` 对空数组
 * 返回 false，等于"先都不画"，比画出来再报错好。
 */
export function toVendorFuncs(caps, alarmCodes) {
  // 注意区分 null（详情还没回来 → 一个都不画）与 {}（设备未分配产品，能力全 false →
  // 平台侧功能照旧可用）。两者都返回平台功能的话，切设备的空档期会闪一批入口出来。
  if (!caps) return [];
  // alarmCodes 同理：null/undefined = 还没拉过 8.6.1，[] = 拉过了、没有可配项
  const codes =
    alarmCodes == null ? null : alarmCodes instanceof Set ? alarmCodes : new Set(alarmCodes);
  return VENDOR_FUNC_IDS.filter((id) => RULES[id](caps, codes)).map((id) => ({ id }));
}
