import {
  normalizeDeviceNow,
  normalizeMyDeviceItem,
  normalizeDeviceDetail,
  normalizePage,
  statusKeyOf,
  neverReported,
  ONLINE,
} from '../src/adapters/device.js';
import { toNum } from '../src/adapters/num.js';

// 契约 6.2 的真实响应形状（doc/api/device-app-api.md 示例）
const deviceNowDto = {
  deviceId: '87078795936',
  displayNo: 'DEV001',
  deviceName: '我的车',
  onlineStatus: 1,
  motionState: 1,
  motionStateKeepDuration: '3600', // int64 → 字符串
  powerPercent: 94,
  charge: 0,
  productType: 0,
  rssi: 28,
  satNum: 12,
  speed: 35.5,
  acc: 1,
  totalMileage: '12580', // int64 → 字符串
  todayMileage: '35',
  direct: 180,
  voltage: 12.5,
  iccid: '89861120225042234704',
  lng: 113.123456,
  lat: 22.654321,
  lastPosAt: '2026-07-26 17:00:00',
  posType: 1,
  posTypeName: '卫星定位',
  lastGateAt: '2026-07-26 17:00:30',
  offlineDuration: 0,
};

describe('normalizeDeviceNow', () => {
  test('id 必须等于 deviceId —— 页面把 id 当主键传给所有业务接口', () => {
    const vm = normalizeDeviceNow(deviceNowDto);
    expect(vm.id).toBe('87078795936');
    expect(vm.terminalNo).toBe('87078795936');
  });

  test('int64 字符串字段转成数值，否则页面做减法会得到字符串拼接', () => {
    const vm = normalizeDeviceNow(deviceNowDto);
    expect(vm.mileage).toBe(12580);
    expect(vm.todayMileage).toBe(35);
    expect(vm.motionKeepDuration).toBe(3600);
    expect(typeof vm.mileage).toBe('number');
  });

  test('坐标原样透出（契约已是 GCJ-02，不做换算）', () => {
    const vm = normalizeDeviceNow(deviceNowDto);
    expect(vm.lon).toBe(113.123456);
    expect(vm.lat).toBe(22.654321);
    // 页面里遗留的 lonWGS84 只是同值别名，绝不能是"再转一次"的结果
    expect(vm.lonWGS84).toBe(vm.lon);
    expect(vm.latWGS84).toBe(vm.lat);
  });

  test('名称回落链：deviceName → displayNo → deviceId', () => {
    expect(normalizeDeviceNow({ deviceId: 'd1' }).terminalName).toBe('d1');
    expect(normalizeDeviceNow({ deviceId: 'd1', displayNo: 'N1' }).terminalName).toBe('N1');
    expect(
      normalizeDeviceNow({ deviceId: 'd1', displayNo: 'N1', deviceName: '车' }).terminalName
    ).toBe('车');
  });

  test('acc/dir 映射成页面用的 i18n key', () => {
    expect(normalizeDeviceNow({ deviceId: 'd', acc: 1 }).acc).toBe('common.open');
    expect(normalizeDeviceNow({ deviceId: 'd', acc: 0 }).acc).toBe('common.close');
    expect(normalizeDeviceNow({ deviceId: 'd', direct: 0 }).dir).toBe('common.direction.north');
    expect(normalizeDeviceNow({ deviceId: 'd', direct: 90 }).dir).toBe('common.direction.east');
    expect(normalizeDeviceNow({ deviceId: 'd', direct: 359 }).dir).toBe('common.direction.north');
  });

  test('缺省字段一律回落零值/空串，不产生 undefined 进模板', () => {
    const vm = normalizeDeviceNow({ deviceId: 'd1' });
    expect(vm.battery).toBe(0);
    expect(vm.locateTime).toBe('');
    expect(vm.lastAlive).toBe('');
    expect(vm.lbsModeName).toBe('');
  });
});

describe('statusKeyOf', () => {
  test('在线按运动状态细分，列表页只区分在线/离线', () => {
    expect(statusKeyOf({ onlineStatus: 1, motionState: 1 })).toBe('common.device.status.exercise');
    expect(statusKeyOf({ onlineStatus: 1, motionState: 0 })).toBe('common.device.status.static');
    expect(statusKeyOf({ onlineStatus: 1, motionState: 1 }, 'list')).toBe(
      'common.device.status.online'
    );
  });

  test('离线与待激活', () => {
    expect(statusKeyOf({ onlineStatus: 0 })).toBe('common.device.status.offline');
    // 待上电激活优先于在线态：设备还没激活，显示"在线"会让用户以为可用
    expect(statusKeyOf({ onlineStatus: 1, deviceStatus: 2 })).toBe('common.device.status.unused');
  });

  test('空对象不炸', () => {
    expect(statusKeyOf(null)).toBe('common.device.status.unknown');
  });
});

describe('normalizeMyDeviceItem（1.9 嵌套结构）', () => {
  const item = {
    deviceId: '87078795936',
    isDefault: true,
    displayNo: 'DEV001',
    device: {
      deviceId: '87078795936',
      deviceName: '我的车',
      deviceStatus: 1,
      onlineStatus: 1,
      motionState: 0,
      motionStateKeepDuration: '3600',
      powerPercent: 85,
      lng: 113.1,
      lat: 22.6,
      lastPosAt: '2026-07-26 17:00:00',
      posType: 3,
      posTypeName: '基站定位',
    },
  };

  test('嵌套 device 被摊平，顶层 deviceId/displayNo 生效', () => {
    const vm = normalizeMyDeviceItem(item);
    expect(vm.id).toBe('87078795936');
    expect(vm.displayNo).toBe('DEV001');
    expect(vm.terminalName).toBe('我的车');
    expect(vm.battery).toBe(85);
    expect(vm.lbsModeName).toBe('基站定位');
    expect(vm.isDefault).toBe(true);
  });

  test('列表项状态用 list 模式（不细分动/静）', () => {
    expect(normalizeMyDeviceItem(item).status).toBe('common.device.status.online');
  });

  test('型号展示名取顶层字段，缺失回落空串（模板里是"设备型号："+值）', () => {
    expect(normalizeMyDeviceItem({ ...item, deviceTypeDisplayName: 'TZ-A6L' }).terminalTypeDisplayName).toBe('TZ-A6L');
    // 后端没给时必须是空串，否则页面直接显示 "设备型号：undefined"
    expect(normalizeMyDeviceItem(item).terminalTypeDisplayName).toBe('');
  });
});

describe('normalizeDeviceDetail（6.1）', () => {
  test('型号展示名取后端派生值；capabilities 补全成固定形状', () => {
    const vm = normalizeDeviceDetail({
      deviceId: 'd1',
      deviceType: 'TZ-A6L',
      model: '多模终端主板V2.2',
      deviceTypeDisplayName: '多模终端主板V2.2',
      initialMileage: '100',
      msisdn: '13800138000',
      capabilities: { audio: true, locate: true },
    });
    expect(vm.terminalTypeDisplayName).toBe('多模终端主板V2.2');
    expect(vm.initialMileage).toBe(100);
    expect(vm.msisdn).toBe('13800138000');
    expect(vm.capabilities.audio).toBe(true);
    // 未返回的能力必须是 false，不能是 undefined —— 页面用它做 v-if
    expect(vm.capabilities.oilCut).toBe(false);
    // 键集合固定：契约 6.1 的能力表加了一项，这里就该跟着改一次（而不是断言个数）
    expect(Object.keys(vm.capabilities).sort()).toEqual([
      'audio', 'audioAlways', 'audioTimed', 'customCmd', 'defense', 'factoryReset',
      'familyNum', 'flightMode', 'locate', 'oilCut', 'posMode', 'posPriority',
      'posSchedule', 'powerOff', 'restart', 'shakeAlarm',
    ]);
  });

  test('没有 capabilities 时全 false（宁可少画入口，也不要点了报 21021）', () => {
    const vm = normalizeDeviceDetail({ deviceId: 'd1' });
    expect(Object.values(vm.capabilities).every((v) => v === false)).toBe(true);
  });
});

describe('normalizePage', () => {
  test('items/total → 老代码用的 list/count', () => {
    const r = normalizePage({ items: [{ a: 1 }], total: 25, page: 2, pageSize: 10 });
    expect(r.list.length).toBe(1);
    expect(r.count).toBe(25);
    expect(r.page).toBe(2);
  });

  test('空/缺省信封不炸', () => {
    expect(normalizePage(null).list).toEqual([]);
    expect(normalizePage({}).count).toBe(0);
    expect(normalizePage({}).page).toBe(1);
  });
});

describe('neverReported', () => {
  test('从未上报：无定位时间且坐标为 0（页面显示"暂无定位"而不是画到几内亚湾）', () => {
    expect(neverReported({ deviceId: 'd1' })).toBe(true);
    expect(neverReported({ deviceId: 'd1', lng: 0, lat: 0 })).toBe(true);
    expect(neverReported(deviceNowDto)).toBe(false);
  });
});

describe('toNum', () => {
  test('字符串/数字/空值', () => {
    expect(toNum('12580')).toBe(12580);
    expect(toNum(35)).toBe(35);
    expect(toNum(null)).toBe(0);
    expect(toNum(undefined)).toBe(0);
    expect(toNum('')).toBe(0);
    expect(toNum('abc')).toBe(0);
    expect(toNum('abc', -1)).toBe(-1);
  });

  test('ONLINE 常量与契约一致', () => {
    expect(ONLINE).toBe(1);
  });
});

describe('设备图标表（契约 6.7）', () => {
  const { default: deviceStore } = require('../src/store/modules/device.js');
  const { getTerminalIconCode } = require('../src/common/utils.js');

  test('契约字段 → 页面在用的 {id, code, rotate}，并保留完整 url', () => {
    const st = { deviceIcons: [] };
    deviceStore.mutations.setDeviceIcons(st, [
      { iconId: 'car', iconName: '私家车', iconUrl: 'https://cdn/x/car.png', rotatable: true },
      { iconId: 'pet', iconName: '宠物', iconUrl: 'https://cdn/x/pet.png', rotatable: false },
    ]);
    expect(st.deviceIcons[0]).toEqual({
      id: 'car', code: 'car', name: '私家车', url: 'https://cdn/x/car.png', rotate: true,
    });
    // 宠物图标不随航向旋转 —— 转起来就是躺着的
    expect(st.deviceIcons[1].rotate).toBe(false);
  });

  test('图标表未加载时查图标不抛错（原版 t.filter 直接打断整个 onLoad）', () => {
    expect(() => getTerminalIconCode('car', undefined)).not.toThrow();
    expect(getTerminalIconCode('car', undefined).code).toBe('default');
    expect(getTerminalIconCode('nope', [{ id: 'car', code: 'car', rotate: true }]).code).toBe('default');
  });
});

describe('我的设备统计（契约 1.18）', () => {
  const deviceStore = require('../src/store/modules/device.js').default;

  beforeEach(() => {
    global.uni.request = (opts) => {
      opts.success({
        statusCode: 200,
        header: {},
        data: { code: 0, msg: 'ok', data: { total: 3, online: 1, offline: 2, inactive: 1, expired: 0 } },
      });
    };
  });

  test('契约字段同时挂成页面读的 *Count —— 否则页签显示"全部(undefined)"', async () => {
    const res = await deviceStore.actions.GetDeviceStatistics({ rootState: { account: { identityType: 'account' } } });
    expect(res.data.totalCount).toBe(3);
    expect(res.data.onlineCount).toBe(1);
    expect(res.data.offlineCount).toBe(2);
    expect(res.data.unusedCount).toBe(1); // 页面叫 unused，契约叫 inactive
    // 契约原字段保留，新代码优先用它
    expect(res.data.total).toBe(3);
  });
});

describe('我的设备列表（契约 1.9）', () => {
  const terminalStore = require('../src/store/modules/terminal.js').default;

  test('items/total 同时挂成 data.list/data.count —— 组件按 data.list.length 判分页', async () => {
    global.uni.request = (opts) => {
      opts.success({
        statusCode: 200, header: {},
        data: { code: 0, msg: 'ok', data: {
          items: [{ deviceId: 'd1', isDefault: true, device: { deviceId: 'd1', deviceName: '车', onlineStatus: 1 } }],
          total: 1, page: 1, pageSize: 50,
        } },
      });
    };
    const commits = [];
    const res = await terminalStore.actions.GetTerminalList(
      { commit: (t, v) => commits.push([t, v]), rootState: { account: { identityType: 'account' } } },
      { page: 1 }
    );
    expect(res.data.list.length).toBe(1);
    expect(res.data.count).toBe(1);
    expect(res.data.list[0].id).toBe('d1');
  });
});

/**
 * 设备身份（1.7 设备号+密码登录）不能访问账号级接口——1.9 列表与 1.18 统计都会返回
 * 21010。它名下恒为自己这一台，要走 1.10 /devices/current。
 * 不分派的话设备登录进来就是"21010 → 列表空 → 弹『您还未绑定设备』"，
 * 而它明明就是一台设备登录进来的。
 */
describe('设备身份下的设备来源（契约 1.10）', () => {
  const terminalStore = require('../src/store/modules/terminal.js').default;
  const deviceStore = require('../src/store/modules/device.js').default;
  const deviceRoot = { account: { identityType: 'device' } };

  let urls = [];
  beforeEach(() => {
    urls = [];
    global.uni.request = (opts) => {
      urls.push(opts.url);
      opts.success({
        statusCode: 200, header: {},
        data: { code: 0, msg: 'ok', data: { deviceId: 'd-self', deviceName: '本机', onlineStatus: 1 } },
      });
    };
  });

  test('设备列表走 /devices/current，不打账号级 1.9', async () => {
    const commits = [];
    const res = await terminalStore.actions.GetTerminalList(
      { commit: (t, v) => commits.push([t, v]), rootState: deviceRoot }, { page: 1 }
    );
    expect(urls.some((u) => u.includes('/devices/current'))).toBe(true);
    expect(urls.some((u) => u.includes('/auth/app/devices'))).toBe(false);
    expect(res.data.list.length).toBe(1);
    expect(res.data.list[0].id).toBe('d-self');
  });

  test('统计按自己那台算，不打账号级 1.18', async () => {
    const res = await deviceStore.actions.GetDeviceStatistics({ rootState: deviceRoot });
    expect(urls.some((u) => u.includes('/devices/statistics'))).toBe(false);
    expect(res.data.totalCount).toBe(1);
    expect(res.data.onlineCount).toBe(1); // 桩里 onlineStatus=1
    expect(res.data.offlineCount).toBe(0);
  });

  test('首页点位也走 /devices/current', async () => {
    const commits = [];
    await terminalStore.actions.GetTerminalInfos({
      state: { getDeviceNum: 0 },
      rootState: { ...deviceRoot, device: {} },
      commit: (t, v) => commits.push([t, v]),
      dispatch: () => {},
    });
    expect(urls.some((u) => u.includes('/devices/current'))).toBe(true);
    expect(commits.some(([t]) => t === 'setAllTerminals')).toBe(true);
  });
});
