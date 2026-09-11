import { normalizeAlarm, normalizeAlarmStats } from '../src/adapters/alarm.js';
import * as alarmApi from '../src/api/alarm.js';

let lastReq = null;
beforeEach(() => {
  lastReq = null;
  global.uni.request = (opts) => {
    lastReq = opts;
    opts.success({ statusCode: 200, header: {}, data: { code: 0, msg: 'ok', data: {} } });
  };
});

describe('normalizeAlarm（契约 12.1）', () => {
  const withLocation = {
    id: 'a1b2c3d4e5f60718',
    deviceId: '87078795936',
    deviceName: 'DEV001',
    alarmTitle: '震动告警',
    alarmCode: 'SHAKE',
    alarmName: '震动告警',
    alarmValue: '3',
    hasLocation: true,
    lat: 22.650091,
    lng: 114.040375,
    alarmedAt: '2026-07-26 08:30:00',
    readFlag: false,
  };

  test('字段改名到页面在用的那套', () => {
    const vm = normalizeAlarm(withLocation);
    expect(vm.terminalName).toBe('DEV001');
    expect(vm.alarmTypeName).toBe('震动告警');
    expect(vm.beginTime).toBe('2026-07-26 08:30:00');
    expect(vm.alarmType).toBe('SHAKE'); // 告警码是字符串枚举，不再是数字
    expect(vm.isRead).toBe(false);
  });

  test('带位置时坐标透出（契约已是 GCJ-02，不再换算）', () => {
    const vm = normalizeAlarm(withLocation);
    expect(vm.hasLocation).toBe(true);
    expect(vm.beginLng).toBe(114.040375);
    expect(vm.beginLat).toBe(22.650091);
  });

  test('hasLocation=false 时坐标必须是 null，不能是 0 —— (0,0) 会被画到几内亚湾', () => {
    const vm = normalizeAlarm({
      ...withLocation,
      hasLocation: false,
      lat: 0,
      lng: 0,
      alarmCode: 'LOW_POWER',
    });
    expect(vm.hasLocation).toBe(false);
    expect(vm.beginLng).toBeNull();
    expect(vm.beginLat).toBeNull();
  });

  test('未知告警码时回退展示后端给的名称，不丢这条消息', () => {
    const vm = normalizeAlarm({ id: 'x', deviceId: 'd', alarmCode: 'BRAND_NEW', alarmName: '新告警' });
    expect(vm.alarmTypeName).toBe('新告警');
    // 连 alarmName 都没有时回退到码值本身，也不能是 undefined 进模板
    const vm2 = normalizeAlarm({ id: 'y', deviceId: 'd', alarmCode: 'BRAND_NEW' });
    expect(vm2.alarmTypeName).toBe('BRAND_NEW');
  });
});

describe('normalizeAlarmStats（契约 12.4）', () => {
  test('count 是 JSON 数字', () => {
    const out = normalizeAlarmStats({
      items: [{ alarmCode: 'LOW_POWER', alarmName: '低电告警', count: 2 }],
      total: 2,
    });
    expect(out[0]).toEqual({ alarmCode: 'LOW_POWER', name: '低电告警', count: 2 });
  });

  test('空数据不炸', () => {
    expect(normalizeAlarmStats(null)).toEqual([]);
    expect(normalizeAlarmStats({})).toEqual([]);
  });
});

describe('消息中心 api 路径与参数（最容易漂移的地方）', () => {
  test('列表的 deviceIds/alarmCodes 展开成重复参数（逗号分隔后端返回 21011）', async () => {
    await alarmApi.list({ page: 1, pageSize: 20, deviceIds: ['d1', 'd2'], alarmCodes: ['SOS', 'SHAKE'] });
    expect(lastReq.url).toContain('deviceIds=d1&deviceIds=d2');
    expect(lastReq.url).toContain('alarmCodes=SOS&alarmCodes=SHAKE');
  });

  test('pageSize 截到契约上限 50', async () => {
    await alarmApi.list({ pageSize: 999 });
    expect(lastReq.url).toContain('pageSize=50');
  });

  test('"已读"和"删除"是两个不同接口 —— 原版把删除打到了 read 上', async () => {
    await alarmApi.markRead({ alarmIds: ['a1'] });
    expect(lastReq.url).toBe('/v1/alarms/read');
    await alarmApi.dismiss({ alarmIds: ['a1'] });
    expect(lastReq.url).toBe('/v1/alarms/dismiss');
  });

  test('一键全读/全清空传空数组（契约设计如此）', async () => {
    await alarmApi.markRead({ alarmIds: [] });
    expect(lastReq.data).toEqual({ alarmIds: [] });
  });

  test('详情走 /alarms/detail?id= 并带上提示（不是 /alarms/{id}，那会吞掉 unread-count）', async () => {
    await alarmApi.detail({ id: 'a1', deviceId: 'd1', alarmedAt: '2026-08-05 10:00:00' });
    expect(lastReq.url).toContain('/v1/alarms/detail?');
    expect(lastReq.url).toContain('id=a1');
    expect(lastReq.url).toContain('deviceId=d1');
    expect(lastReq.url).toContain('alarmedAt=2026-08-05%2010%3A00%3A00');
  });

  test('未读数与统计是独立路径', async () => {
    await alarmApi.unreadCount();
    expect(lastReq.url).toBe('/v1/alarms/unread-count');
    await alarmApi.statistics({});
    expect(lastReq.url).toBe('/v1/alarms/statistics');
  });

  test('告警设置是 PUT + alarmItems（只传修改项）', async () => {
    await alarmApi.saveSettings('d1', { alarmItems: [{ alarmCode: 'S_SHAKE_AL', alarmEnable: true, alarmValue: '3' }] });
    expect(lastReq.method).toBe('PUT');
    expect(lastReq.url).toBe('/v1/devices/d1/alarm-settings');
    expect(lastReq.data.alarmItems.length).toBe(1);
  });

  test('通知渠道含 appPush（与告警类型开关是两个维度）', async () => {
    await alarmApi.saveNotifyChannels('d1', {
      wechatPush: true, smsNotify: false, telNotify: false, appPush: true,
      telPhones: ['13800001234'], smsPhones: [],
    });
    expect(lastReq.url).toBe('/v1/devices/d1/notify-channels');
    expect(lastReq.data.appPush).toBe(true);
    // 两份名单各自整体覆盖 —— 只传一份会把另一份清空，所以两份都要带上
    expect(lastReq.data.telPhones).toEqual(['13800001234']);
    expect(lastReq.data.smsPhones).toEqual([]);
  });
});
