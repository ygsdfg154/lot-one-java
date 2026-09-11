/**
 * 围栏模型适配（契约 8.2）。
 *
 * 页面用的是厂商模型：`{name, type, alarmType, fenceData:{points, radius, adcodes}}`，
 * 其中 `type` 0=圆形 2=多边形 3=行政区，`alarmType` 0=进 1=出 2=进出。
 * 契约用的是：`{fenceName, fenceShapeType(1圆/2多边形), centerLat/Lng, fenceRadius,
 * points[], enterAlarmEnable, getOutAlarmEnable}`。两点关键差异：
 *
 *   - **行政区不是一种围栏类型**：契约让调用方先用 8.2.7 把 adcode 换成边界顶点，
 *     再按多边形创建。这样行政区边界调整了重新取一次即可，不用新增一种模型；
 *   - **进/出告警是两个独立布尔**，不是一个三值枚举。三值只能表达"进""出""进出"，
 *     表达不了"两个都关"——而两个都关是合法状态（先建好围栏，之后再开告警）。
 *
 * 坐标两侧都是 GCJ-02，**不做换算**：原版在这里做了 WGS84↔GCJ02 双向转换，
 * 而契约出入参与地图组件同一套坐标，多转一次围栏中心偏 600 米左右。
 */

/** 厂商 type → 契约 fenceShapeType。行政区(3)最终也按多边形提交。 */
export function shapeTypeOf(vendorType) {
  return Number(vendorType) === 0 ? 1 : 2;
}

/** 厂商 alarmType(0进/1出/2进出) → 两个独立布尔。 */
export function alarmFlagsOf(alarmType) {
  const t = Number(alarmType);
  return {
    enterAlarmEnable: t === 0 || t === 2,
    getOutAlarmEnable: t === 1 || t === 2,
  };
}

/**
 * 两个布尔 → 厂商 alarmType。两个都关时回退成 0（进围栏告警）——页面的单选框表达不了
 * "都关"，但这只影响回显：用户不动它就照原样提交，动了才按新值覆盖。
 */
export function alarmTypeOf(fence) {
  const enter = !!(fence && fence.enterAlarmEnable);
  const out = !!(fence && fence.getOutAlarmEnable);
  if (enter && out) return 2;
  if (out) return 1;
  return 0;
}

/**
 * 页面模型 → 8.2.3/8.2.4 请求体。
 *
 * `points` 已由调用方准备好（行政区那一路要先取边界），这里只做形状与告警位的翻译。
 */
export function toContractFence(vm, points) {
  const shapeType = shapeTypeOf(vm.type);
  const body = {
    fenceName: vm.name,
    fenceShapeType: shapeType,
    ...alarmFlagsOf(vm.alarmType),
  };
  if (shapeType === 1) {
    const p = (points || [])[0] || {};
    body.centerLat = p.lat;
    body.centerLng = p.lng;
    body.fenceRadius = Number(vm.radius) || 0;
  } else {
    body.points = (points || []).map((p) => ({ lat: p.lat, lng: p.lng }));
  }
  return body;
}

/**
 * 8.2.1/8.2.2 的围栏 → 页面模型。
 *
 * 圆形围栏的 `points` 只有一个点（圆心），多边形的 `centerLat/Lng` 是 `points[0]`，
 * 两种形状都能安全地读 `fenceData.points[0]`，不会出现 `(0,0)`。
 */
export function toVendorFence(dto) {
  const d = dto || {};
  const points = (d.points || []).map((p) => ({ lat: p.lat, lng: p.lng }));
  if (!points.length && d.centerLat != null && d.centerLng != null) {
    points.push({ lat: d.centerLat, lng: d.centerLng });
  }
  return {
    id: d.fenceId,
    fenceId: d.fenceId,
    name: d.fenceName,
    type: Number(d.fenceShapeType) === 2 ? 2 : 0,
    alarmType: alarmTypeOf(d),
    enterAlarmEnable: !!d.enterAlarmEnable,
    getOutAlarmEnable: !!d.getOutAlarmEnable,
    isValid: true,
    createTime: d.createdAt,
    updateTime: d.updatedAt,
    fenceData: {
      points,
      radius: Number(d.fenceRadius) || 0,
      // 契约不存 adcode（行政区围栏落库就是多边形），回显时给空数组占位，
      // 页面按它判断"是否行政区"会得到 false —— 行政区围栏回显为普通多边形，
      // 这是有意的：边界已经存下来了，不依赖行政区划表还能不受区划调整影响
      adcodes: [],
    },
  };
}
