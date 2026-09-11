/**
 * 设备 DTO → 页面视图模型。
 *
 * 页面（30+ 个文件、87 处）读的是原厂那套字段名：`selectedTerminal.id`、`terminalName`、
 * `lon/lat`、`status`、`battery`… 契约给的是另一套（`deviceId`/`deviceName`/`lng/lat`/
 * `onlineStatus`+`motionState`/`powerPercent`）。在这里做一次归一，页面模板就不用动——
 * **关键是 `id = deviceId`**：老代码把 `id` 当设备主键一路传给业务接口，而契约的路径参数
 * 正是 deviceId，两者对齐后调用链天然成立。
 *
 * 坐标：契约出入参一律 GCJ-02（见 doc/api 0.2「坐标系（全局）」），**这里不做任何换算**。
 * 老代码在 store 里做 WGS84↔GCJ02 互转，那是按原厂后端（WGS84 出参）写的，对着新契约
 * 转一次等于把坐标转错约 600 米。
 */
import { toNum, isBlank } from './num.js';

/** 在线状态（契约 6.2 onlineStatus）。 */
export const ONLINE = 1;
export const OFFLINE = 0;

/** 激活状态（契约 1.9 device.deviceStatus，registry device_active_status）。 */
export const ACTIVE = 1;
export const PENDING_ACTIVATION = 2;
export const EXPIRED = -1;

/**
 * 状态文案 key（i18n），对齐 common/utils.js 的既有 key 集合。
 *
 * 原厂是单字段 `deviceState`（0未使用/1在线/2离线/3关机）+ motion；契约拆成了
 * `onlineStatus` + `motionState` + `deviceStatus`（激活态）三个正交字段，这里按
 * 页面既有的展示语义合成。
 *
 * @param {Object} d 契约设备对象（DeviceNow / DeviceRow）
 * @param {'list'|boolean} [motionMode] 'list' = 列表页只区分在线/离线，不细分动/静
 * @returns {string}
 */
export function statusKeyOf(d, motionMode) {
  if (!d) return 'common.device.status.unknown';
  if (toNum(d.deviceStatus) === PENDING_ACTIVATION) return 'common.device.status.unused';
  if (toNum(d.onlineStatus) !== ONLINE) return 'common.device.status.offline';
  if (motionMode === 'list') return 'common.device.status.online';
  return toNum(d.motionState) === 1
    ? 'common.device.status.exercise'
    : 'common.device.status.static';
}

/**
 * 方向角 → 八方位文案 key（沿用 utils.deviceDirection 的取值区间，避免两套映射）。
 * @param {number} direct
 * @returns {string}
 */
export function directionKeyOf(direct) {
  const deg = ((toNum(direct) % 360) + 360) % 360;
  const idx = Math.floor(((deg + 22.5) % 360) / 45);
  return [
    'common.direction.north',
    'common.direction.northeast',
    'common.direction.east',
    'common.direction.southeast',
    'common.direction.south',
    'common.direction.southwest',
    'common.direction.west',
    'common.direction.northwest',
  ][idx];
}

/**
 * 过滤设备名称：如果设备名称是系统默认按 "设备ID + 名称"（例如 "242546345334名称"）自动生成的，
 * 去掉多余的 "名称" 后缀，还设备名以干净的 设备ID/别名。
 *
 * @param {string} name 原始名称
 * @param {string} [deviceId] 设备ID
 * @param {string} [displayNo] 设备展示号
 * @returns {string}
 */
export function cleanDeviceName(name, deviceId, displayNo) {
  if (!name) return displayNo || deviceId || '';
  const str = String(name).trim();
  if (deviceId && str === `${deviceId}名称`) return deviceId;
  if (displayNo && str === `${displayNo}名称`) return displayNo;
  if (/^\d{7,20}名称$/.test(str)) return str.replace(/名称$/, '');
  return str;
}

/**
 * 实时态（契约 6.2 DeviceNow / 1.10）→ 视图模型。
 *
 * @param {Object} dto
 * @param {'list'|boolean} [motionMode]
 * @returns {Object|null}
 */
export function normalizeDeviceNow(dto, motionMode) {
  if (!dto) return null;
  const lng = toNum(dto.lng);
  const lat = toNum(dto.lat);
  const rawName = dto.deviceName || dto.displayNo || dto.deviceId;
  return {
    // ---- 主键与名称（页面按 id 传给所有业务接口）----
    id: dto.deviceId,
    terminalNo: dto.deviceId,
    deviceId: dto.deviceId,
    displayNo: dto.displayNo || '',
    terminalName: cleanDeviceName(rawName, dto.deviceId, dto.displayNo),

    // ---- 位置（GCJ-02，直接喂地图组件）----
    lon: lng,
    lat: lat,
    // 兼容页面里既有的 lonWGS84/latWGS84 两处展示（设备信息页复制坐标）。
    // 契约坐标已是 GCJ-02，这里只是同值别名，不是 WGS84——名字是原厂遗留，
    // 等页面改动时一并清掉。
    lonWGS84: lng,
    latWGS84: lat,
    locateTime: dto.lastPosAt || '',
    lastAlive: dto.lastGateAt || '',
    offlineDuration: toNum(dto.offlineDuration),

    // ---- 运行时态 ----
    deviceState: toNum(dto.deviceStatus),
    onlineStatus: toNum(dto.onlineStatus),
    motion: toNum(dto.motionState),
    motionKeepDuration: toNum(dto.motionStateKeepDuration),
    battery: toNum(dto.powerPercent),
    batteryState: toNum(dto.charge),
    wlSignal: toNum(dto.rssi),
    gnssCount: toNum(dto.satNum),
    speed: toNum(dto.speed),
    acc: toNum(dto.acc) === 1 ? 'common.open' : 'common.close',
    voltage: toNum(dto.voltage),
    direction: toNum(dto.direct),
    dir: directionKeyOf(dto.direct),
    // int64 → 字符串，做运算前必须转数值（契约 0.2）
    mileage: toNum(dto.totalMileage),
    todayMileage: toNum(dto.todayMileage),
    lbsMode: toNum(dto.posType),
    lbsModeName: dto.posTypeName || '',
    iccid: dto.iccid || '',
    productType: toNum(dto.productType),

    status: statusKeyOf(dto, motionMode),
  };
}

/**
 * 我的设备列表项（契约 1.9，**嵌套结构** `{deviceId,isDefault,displayNo,device:{...}}`）
 * → 视图模型。老代码读的是平铺的 `data.list[]`，这里把嵌套摊平。
 *
 * @param {Object} item
 * @returns {Object|null}
 */
export function normalizeMyDeviceItem(item) {
  if (!item) return null;
  const d = item.device || {};
  const vm = normalizeDeviceNow(
    {
      ...d,
      // 顶层的 deviceId/displayNo 是权威值（契约注明顶层冗余便于直接取用）
      deviceId: item.deviceId || d.deviceId,
      displayNo: item.displayNo || d.displayNo,
    },
    'list'
  );
  vm.isDefault = !!item.isDefault;
  // 型号展示名（1.9 顶层字段，与 displayNo 同为台账信息）。回落空串而不是让
  // undefined 进模板 —— 设备列表里那行是"设备型号：" + 值，undefined 会直接显示出来
  vm.terminalTypeDisplayName = item.deviceTypeDisplayName || '';
  return vm;
}

/**
 * 设备档案（契约 6.1 DeviceDetail）→ 视图模型。
 * @param {Object} dto
 * @returns {Object|null}
 */
export function normalizeDeviceDetail(dto) {
  if (!dto) return null;
  const rawName = dto.deviceName || dto.deviceId;
  return {
    id: dto.deviceId,
    deviceId: dto.deviceId,
    terminalNo: dto.deviceId,
    displayNo: dto.displayNo || '',
    terminalName: cleanDeviceName(rawName, dto.deviceId, dto.displayNo),
    // 型号展示名由后端派生（model 优先、回退 deviceType），前端不再自己拼
    terminalTypeDisplayName: dto.deviceTypeDisplayName || dto.model || dto.deviceType || '',
    deviceType: dto.deviceType || '',
    model: dto.model || '',
    iccid: dto.iccid || '',
    msisdn: dto.msisdn || '',
    deptName: dto.deptName || '',
    activationStatus: toNum(dto.activationStatus),
    activatedAt: dto.activatedAt || '',
    expiredAt: dto.expiredAt || '',
    installedAt: dto.installedAt || '',
    initialMileage: toNum(dto.initialMileage),
    productType: toNum(dto.productType),
    productCategoryType: toNum(dto.productCategoryType),
    iconType: dto.iconId || '',
    isDefaultPassword: !!dto.isDefaultPassword,
    speed: toNum(dto.speed),
    acc: toNum(dto.acc),
    direction: toNum(dto.direct),
    voltage: toNum(dto.voltage),
    todayMileage: toNum(dto.todayMileage),
    lastAlive: dto.lastGateAt || '',
    offlineDuration: toNum(dto.offlineDuration),
    // 能力开关：功能入口显隐的唯一依据（契约 6.1 capabilities，按产品命令树推导）。
    // 缺省时全 false —— 与后端"未分配产品的设备没有任何能力"一致，宁可少画入口，
    // 也不要画出一个点了必然报 21021 的按钮。
    capabilities: normalizeCapabilities(dto.capabilities),
  };
}

/**
 * 能力开关归一：把契约的 capabilities 对象补全成固定形状，页面可以直接读取而不必判空。
 * @param {Object} [caps]
 * @returns {Object}
 */
export function normalizeCapabilities(caps) {
  const c = caps || {};
  return {
    audio: !!c.audio,
    posMode: !!c.posMode,
    posPriority: !!c.posPriority,
    flightMode: !!c.flightMode,
    oilCut: !!c.oilCut,
    defense: !!c.defense,
    powerOff: !!c.powerOff,
    shakeAlarm: !!c.shakeAlarm,
    restart: !!c.restart,
    locate: !!c.locate,
    customCmd: !!c.customCmd,
    // 以下五项：语义与参数已在指令注册表定稿，协议帧体待厂商文档。能力位照常按
    // 命令树推导——产品配了这条指令入口就出现，点下去网关 REJECTED 回 ret=12，
    // 前端提示"设备不支持"。协议接入当天前端不用改任何代码
    factoryReset: !!c.factoryReset,
    familyNum: !!c.familyNum,
    audioAlways: !!c.audioAlways,
    audioTimed: !!c.audioTimed,
    posSchedule: !!c.posSchedule,
  };
}

/**
 * 分页信封（契约 0.2 `{items,total,page,pageSize}`）→ 老代码惯用的 `{list,count}`。
 * 老 mutation（setList/setTerminals 等）判"还有没有下一页"用的是 `count`。
 *
 * @param {Object} data
 * @param {(item: *) => *} [mapItem]
 * @returns {{list: Array, count: number, page: number, pageSize: number}}
 */
export function normalizePage(data, mapItem) {
  const d = data || {};
  const items = Array.isArray(d.items) ? d.items : [];
  return {
    list: mapItem ? items.map(mapItem).filter(Boolean) : items,
    count: toNum(d.total),
    page: toNum(d.page, 1),
    pageSize: toNum(d.pageSize, 10),
  };
}

/**
 * 判断"该设备从未上报过"：档案有值但实时字段缺省（契约 6.x 的降级约定，code=0）。
 * 页面据此显示"暂无定位"而不是把 (0,0) 画到地图上。
 * @param {Object} dto
 * @returns {boolean}
 */
export function neverReported(dto) {
  return !dto || (isBlank(dto.lastPosAt) && toNum(dto.lng) === 0 && toNum(dto.lat) === 0);
}
