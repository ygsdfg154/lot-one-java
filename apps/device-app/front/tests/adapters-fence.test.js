import { toContractFence, toVendorFence, alarmFlagsOf, alarmTypeOf, shapeTypeOf } from '../src/adapters/fence.js';
import { parseRegion, getRegionInfo } from '../src/common/utils.js';
import * as fenceApi from '../src/api/fence.js';

let lastReq = null;
beforeEach(() => {
  lastReq = null;
  global.uni.request = (opts) => {
    lastReq = opts;
    opts.success({ statusCode: 200, header: {}, data: { code: 0, msg: 'ok', data: {} } });
  };
});

describe('围栏形状与告警位（契约 8.2）', () => {
  test('厂商 type → fenceShapeType：行政区(3) 也按多边形提交', () => {
    expect(shapeTypeOf(0)).toBe(1);
    expect(shapeTypeOf(2)).toBe(2);
    expect(shapeTypeOf(3)).toBe(2);
  });

  test('alarmType 三值 ↔ 两个独立布尔', () => {
    expect(alarmFlagsOf(0)).toEqual({ enterAlarmEnable: true, getOutAlarmEnable: false });
    expect(alarmFlagsOf(1)).toEqual({ enterAlarmEnable: false, getOutAlarmEnable: true });
    expect(alarmFlagsOf(2)).toEqual({ enterAlarmEnable: true, getOutAlarmEnable: true });
    expect(alarmTypeOf({ enterAlarmEnable: true, getOutAlarmEnable: true })).toBe(2);
    expect(alarmTypeOf({ enterAlarmEnable: false, getOutAlarmEnable: true })).toBe(1);
    // 两个都关是合法状态（先建围栏、之后再开告警），三值枚举表达不了，回退成"进"
    expect(alarmTypeOf({})).toBe(0);
  });

  test('圆形围栏提交圆心 + 半径，不提交 points', () => {
    const body = toContractFence(
      { name: '公司', type: 0, alarmType: 2, radius: 200 },
      [{ lat: 22.65, lng: 114.04 }]
    );
    expect(body).toEqual({
      fenceName: '公司',
      fenceShapeType: 1,
      enterAlarmEnable: true,
      getOutAlarmEnable: true,
      centerLat: 22.65,
      centerLng: 114.04,
      fenceRadius: 200,
    });
    expect(body.points).toBeUndefined();
  });

  test('多边形提交 points，不提交半径', () => {
    const pts = [{ lat: 1, lng: 2 }, { lat: 3, lng: 4 }, { lat: 5, lng: 6 }];
    const body = toContractFence({ name: '片区', type: 2, alarmType: 1, radius: 0 }, pts);
    expect(body.fenceShapeType).toBe(2);
    expect(body.points).toEqual(pts);
    expect(body.fenceRadius).toBeUndefined();
  });

  test('回显：圆形没有 points 时用圆心补一个点（页面按 points[0] 画圆心）', () => {
    const vm = toVendorFence({
      fenceId: '68',
      fenceName: '公司',
      fenceShapeType: 1,
      fenceRadius: 200,
      centerLat: 22.65,
      centerLng: 114.04,
      enterAlarmEnable: true,
      getOutAlarmEnable: false,
    });
    expect(vm.type).toBe(0);
    expect(vm.alarmType).toBe(0);
    expect(vm.fenceData.radius).toBe(200);
    expect(vm.fenceData.points).toEqual([{ lat: 22.65, lng: 114.04 }]);
  });

  test('坐标原样透出 —— 契约两侧都是 GCJ-02，多转一次围栏中心会偏几百米', () => {
    const vm = toVendorFence({ fenceId: '1', fenceShapeType: 2, points: [{ lat: 22.650091, lng: 114.040375 }] });
    expect(vm.fenceData.points[0]).toEqual({ lat: 22.650091, lng: 114.040375 });
  });
});

describe('行政区工具（契约 8.2.6/8.2.7 的字段）', () => {
  const tree = [
    { adcode: '440000', name: '广东省', regionLevel: 'province', children: [
      { adcode: '440300', name: '深圳市', regionLevel: 'city', children: [
        { adcode: '440305', name: '南山区', regionLevel: 'district' },
      ] },
    ] },
  ];

  test('逐级定位用 children（不是高德的 districts）', () => {
    expect(getRegionInfo(tree, ['广东省', '不限', '不限'])[0].adcode).toBe('440000');
    expect(getRegionInfo(tree, ['广东省', '深圳市', '不限'])[0].adcode).toBe('440300');
    expect(getRegionInfo(tree, ['广东省', '深圳市', '南山区'])[0].adcode).toBe('440305');
  });

  test('区划调整后旧选择查不到时返回空数组，不抛错', () => {
    expect(getRegionInfo(tree, ['不存在省', '不限', '不限'])).toEqual([]);
    expect(getRegionInfo(tree, ['广东省', '已撤销市', '不限'])).toEqual([]);
  });

  test('边界顶点直接用，不再解析高德 polyline 字符串', () => {
    const segs = parseRegion({ adcode: '440305', name: '南山区', points: [{ lat: 1, lng: 2 }, { lat: 3, lng: 4 }] });
    expect(segs).toEqual([[{ longitude: 2, latitude: 1 }, { longitude: 4, latitude: 3 }]]);
    expect(parseRegion(null)).toEqual([]);
    expect(parseRegion({ points: [] })).toEqual([]);
  });
});

describe('围栏 api 路径', () => {
  test('列表/详情/增删改各走契约路径', async () => {
    await fenceApi.list('d1', { page: 2, pageSize: 20 });
    expect(lastReq.url).toBe('/v1/devices/d1/fences?page=2&pageSize=20');
    await fenceApi.detail('68');
    expect(lastReq.url).toBe('/v1/fences/68');
    await fenceApi.create('d1', { fenceName: 'x' });
    expect(lastReq.method).toBe('POST');
    await fenceApi.update('68', { fenceName: 'x' });
    expect(lastReq.method).toBe('PUT');
    await fenceApi.remove('68');
    expect(lastReq.method).toBe('DELETE');
  });

  test('行政区走后端代理，不直连地图厂商（原版把厂商 key 带在前端）', async () => {
    await fenceApi.regionTree();
    expect(lastReq.url).toBe('/v1/regions/tree');
    await fenceApi.regionBoundary('440305');
    expect(lastReq.url).toBe('/v1/regions/440305/boundary');
  });
});
