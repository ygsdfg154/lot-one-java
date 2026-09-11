/**
 * 报表与轨迹的字段/形状适配。这两处 store 直接喂给地图与列表模板，
 * 字段名或坐标错一个，表现都是"页面空白"或"点画在隔壁街区"，不好肉眼发现。
 */
import reportStore from '../src/store/modules/report.js';
import deviceStore from '../src/store/modules/device.js';

/** 按顺序返回预置响应的 uni.request 桩。 */
function stubResponses(byUrl) {
  global.uni.request = (opts) => {
    const hit = Object.keys(byUrl).find((k) => opts.url.includes(k));
    const data = hit ? byUrl[hit] : { code: 0, msg: 'ok', data: {} };
    opts.success({ statusCode: 200, header: {}, data });
  };
}

/** 在真实 mutations 上跑一遍 action，返回最终 state。 */
function runAction(mod, name, payload, initial = {}) {
  const state = { ...JSON.parse(JSON.stringify(mod.state)), ...initial };
  const commit = (type, arg) => {
    const [head, tail] = type.split('/');
    // root 提交（如 device/setDeviceAlarmCodes）在这里忽略，只验本模块
    if (tail) return;
    mod.mutations[head](state, arg);
  };
  return Promise.resolve(mod.actions[name]({ state, commit, rootState: { device: {} } }, payload)).then(
    (res) => ({ state, res })
  );
}

describe('报表（契约 8.5）', () => {
  const stayPage = {
    code: 0,
    msg: 'ok',
    data: {
      items: [
        { id: '456', deviceId: 'd1', startedAt: '2026-07-26 09:30:00', endedAt: '2026-07-26 10:00:00', lat: 22.68, lng: 114.1, duration: 1800 },
      ],
      total: 1,
      page: 1,
      pageSize: 20,
    },
  };
  const tripPage = {
    code: 0,
    msg: 'ok',
    data: {
      items: [
        { id: '123', deviceId: 'd1', startedAt: '2026-07-26 08:00:00', endedAt: '2026-07-26 09:30:00', startLat: 22.65, startLng: 114.04, endLat: 22.68, endLng: 114.1, distance: 15.5, duration: 5400, maxSpeed: 80, avgSpeed: 10.33 },
      ],
      total: 1,
    },
  };

  test('停留：items→列表、秒→分钟、单点同时当起终点', async () => {
    stubResponses({ '/reports/stay': stayPage });
    const { state } = await runAction(reportStore, 'GetReportList', { deviceId: 'd1', date: '2026-07-26' });
    expect(state.reportList.length).toBe(1);
    const it = state.reportList[0];
    expect(it.startTime).toBe('2026-07-26 09:30:00');
    expect(it.minutes).toBe(30);
    // 停留没有"终点"，起终点是同一个点
    expect([it.startLon, it.startLat]).toEqual([114.1, 22.68]);
    expect([it.endLon, it.endLat]).toEqual([114.1, 22.68]);
    // 坐标原样透出：契约与地图、与 13.1 逆地理编码都是 GCJ-02
    expect(it.startLonWGS84).toBe(114.1);
  });

  test('行程：起终点两组坐标 + 里程速度', async () => {
    stubResponses({ '/reports/trip': tripPage });
    const { state } = await runAction(reportStore, 'GetReportList', { deviceId: 'd1', date: '2026-07-26', type: 1 });
    const it = state.reportList[0];
    expect([it.startLon, it.startLat]).toEqual([114.04, 22.65]);
    expect([it.endLon, it.endLat]).toEqual([114.1, 22.68]);
    expect(it.distance).toBe(15.5);
    expect(it.minutes).toBe(90);
  });

  test('用 total 判断有没有下一页（不是"这页是否满 20 条"）', async () => {
    stubResponses({ '/reports/stay': stayPage });
    const { state } = await runAction(reportStore, 'GetReportList', { deviceId: 'd1', date: '2026-07-26' });
    expect(state.status).toBe('nomore');
  });
});

describe('轨迹（契约 8.3 + 8.5 组装）', () => {
  const track = {
    code: 0,
    msg: 'ok',
    data: {
      items: [
        { posAt: '2026-07-26 08:00:00', posType: 1, posTypeName: '卫星定位', lat: 22.65, lng: 114.04, speed: 35.5, direct: 180 },
        { posAt: '2026-07-26 08:00:10', posType: 1, posTypeName: '卫星定位', lat: 22.66, lng: 114.05, speed: 0, direct: 180 },
        { posAt: '2026-07-26 08:00:20', posType: 3, posTypeName: '基站定位', lat: 22.67, lng: 114.06, speed: 12, direct: 90 },
      ],
      total: 3,
      truncated: false,
    },
  };
  const stay = { code: 0, msg: 'ok', data: { items: [{ id: '9', lat: 22.66, lng: 114.05, startedAt: 'a', endedAt: 'b', duration: 600 }], total: 1 } };
  const trip = { code: 0, msg: 'ok', data: { items: [{ distance: 1.5 }, { distance: 2.25 }], total: 2 } };

  test('按"是否在动"分段，段内字段用页面在读的名字', async () => {
    stubResponses({ '/track': track, '/reports/stay': stay, '/reports/trip': trip });
    const res = await deviceStore.actions.GetDeviceTrack({}, { deviceId: 'd1', date: '2026-07-26' });
    const segs = res.data.traceItems;
    // 动 → 静 → 动 = 三段
    expect(segs.map((s) => s.color)).toEqual(['green', 'blue', 'green']);
    const p = segs[0].items[0];
    expect(p.lon).toBe(114.04);
    expect(p.deviceTime).toBe('2026-07-26 08:00:00');
    // 定位方式取后端文案，不按数字下标查前端那张顺序不一致的表
    expect(p.posTypeName).toBe('卫星定位');
    expect(segs[2].items[0].posTypeName).toBe('基站定位');
  });

  test('停留点与总里程由 8.5 两份报表组装', async () => {
    stubResponses({ '/track': track, '/reports/stay': stay, '/reports/trip': trip });
    const res = await deviceStore.actions.GetDeviceTrack({}, { deviceId: 'd1', date: '2026-07-26' });
    const pm = res.data.pointMileageItems;
    expect(pm.detentionAreas).toEqual([
      { id: '9', lon: 114.05, lat: 22.66, startTime: 'a', endTime: 'b', duration: 600 },
    ]);
    expect(pm.totalMileage).toBeCloseTo(3.75, 5);
  });

  test('报表拉不到不该让轨迹画不出来', async () => {
    stubResponses({ '/track': track, '/reports/stay': { code: 20004, msg: '网关服务不可用', data: null }, '/reports/trip': { code: 20004, msg: '网关服务不可用', data: null } });
    const res = await deviceStore.actions.GetDeviceTrack({}, { deviceId: 'd1', date: '2026-07-26' });
    expect(res.succeeded).toBe(true);
    expect(res.data.traceItems.length).toBeGreaterThan(0);
    expect(res.data.pointMileageItems).toEqual({ totalMileage: 0, detentionAreas: [] });
  });

  test('跨度超 7 天前端先拦（契约上限）', async () => {
    stubResponses({ '/track': track });
    const res = await deviceStore.actions.GetDeviceTrack({}, {
      deviceId: 'd1',
      date: { start: '2026-07-01 00:00:00', end: '2026-07-20 00:00:00' },
    });
    expect(res.succeeded).toBe(false);
    expect(res.code).toBe(10001);
  });
});
