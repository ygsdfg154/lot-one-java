/**
 * api 层与契约的对拍：断言每个调用发出的 **method + 路径 + query/body**。
 *
 * 这类错误（路径少个 s、query 参数名写成单数、时间格式用斜杠）在运行时表现为
 * "接口通了但没数据"或 21011，最难查；单测里钉死最省事。
 */
import { request } from '../src/common/request.js';
import * as authApi from '../src/api/auth.js';
import * as deviceApi from '../src/api/device.js';
import * as trackApi from '../src/api/track.js';
import * as shareApi from '../src/api/share.js';
import * as geoApi from '../src/api/geo.js';

// uni.request 的最后一次调用参数
let lastReq = null;

beforeEach(() => {
  lastReq = null;
  global.uni = {
    getStorageSync: () => '',
    setStorageSync: () => {},
    showLoading: () => {},
    hideLoading: () => {},
    showToast: () => {},
    reLaunch: () => {},
    navigateTo: () => {},
    request: (opts) => {
      lastReq = opts;
      opts.success({ statusCode: 200, header: {}, data: { code: 0, msg: 'ok', data: {} } });
    },
  };
});

/** 取出请求路径里 base 之后的部分（jest 环境下 serviceRoot 是 '/v1'）。 */
function pathOf() {
  return lastReq.url;
}

describe('鉴权与账号（契约 1.x/2.x/4.x）', () => {
  test('图形验证码 / 短信验证码', async () => {
    await authApi.captcha();
    expect(lastReq.method).toBe('GET');
    expect(pathOf()).toBe('/v1/auth/captcha');

    await authApi.sendSmsCode({ phone: '13800001234', uuid: 'u1', code: '1234' });
    expect(lastReq.method).toBe('POST');
    expect(pathOf()).toBe('/v1/auth/app/sms-code');
    expect(lastReq.data).toEqual({ phone: '13800001234', uuid: 'u1', code: '1234' });
  });

  test('三种登录方式路径不同，别写混', async () => {
    await authApi.loginByPhoneCode({ phone: '1', smsCode: '2' });
    expect(pathOf()).toBe('/v1/auth/login/phone-code');
    await authApi.loginByPhonePassword({ phone: '1', password: '2' });
    expect(pathOf()).toBe('/v1/auth/login/phone-password');
    await authApi.loginByDevice({ deviceId: 'd1', password: '2' });
    expect(pathOf()).toBe('/v1/auth/login/device');
  });

  test('第三方绑定按 provider 拼路径', async () => {
    await authApi.bindOAuth('wechat', { credential: 'c' });
    expect(pathOf()).toBe('/v1/auth/app/bind-wechat');
    await authApi.bindOAuth('apple', { credential: 'c' });
    expect(pathOf()).toBe('/v1/auth/app/bind-apple');
    await authApi.unbindOAuth('apple');
    expect(pathOf()).toBe('/v1/auth/app/unbind-apple');
  });

  test('推送注册的 platform 必须是数字（与 5.1 同一套编码）', async () => {
    await authApi.registerPushToken({ pushToken: 'cid', platform: 1 });
    expect(lastReq.method).toBe('PUT');
    expect(pathOf()).toBe('/v1/auth/app/push-token');
    expect(lastReq.data.platform).toBe(1);
  });

  test('改资料是 PATCH，且只带传入的字段（部分更新）', async () => {
    await authApi.updateProfile({ nickName: '老王' });
    expect(lastReq.method).toBe('PATCH');
    expect(pathOf()).toBe('/v1/auth/app/profile');
    expect(lastReq.data).toEqual({ nickName: '老王' });
  });
});

describe('设备（契约 1.9/1.13/6.x）', () => {
  test('我的设备列表带分页 query', async () => {
    await deviceApi.myDevices({ page: 2, pageSize: 20 });
    expect(pathOf()).toBe('/v1/auth/app/devices?page=2&pageSize=20');
  });

  test('deviceId 走路径且转义', async () => {
    await deviceApi.realtime('87078795936');
    expect(pathOf()).toBe('/v1/devices/87078795936/realtime');
    await deviceApi.detail('a/b');
    expect(pathOf()).toBe('/v1/devices/a%2Fb');
  });

  test('绑定用 deviceId + password（DR-11，不是免密 displayNo）', async () => {
    await deviceApi.bind({ deviceId: 'd1', password: 'p', deviceName: '车' });
    expect(pathOf()).toBe('/v1/auth/app/devices/bind');
    expect(lastReq.data).toEqual({ deviceId: 'd1', password: 'p', deviceName: '车' });
  });

  test('改名是 PATCH /devices/{id}，body 只有 deviceName', async () => {
    await deviceApi.rename({ deviceId: 'd1', deviceName: '新名' });
    expect(lastReq.method).toBe('PATCH');
    expect(pathOf()).toBe('/v1/devices/d1');
    expect(lastReq.data).toEqual({ deviceName: '新名' });
  });

  test('图标用 iconId（不是原厂的 iconType）', async () => {
    await deviceApi.setIcon({ deviceId: 'd1', iconId: 'car' });
    expect(lastReq.method).toBe('PUT');
    expect(pathOf()).toBe('/v1/devices/d1/icon');
    expect(lastReq.data).toEqual({ iconId: 'car' });
  });

  test('设备统计与当前设备是两个不同路径', async () => {
    await deviceApi.myDeviceStatistics();
    expect(pathOf()).toBe('/v1/auth/app/devices/statistics');
    await deviceApi.currentDevice();
    expect(pathOf()).toBe('/v1/devices/current');
  });
});

describe('轨迹与分享（契约 8.3/8.3b/7.2）', () => {
  test('轨迹时间必须是 YYYY-MM-DD HH:mm:ss，且带 limit', async () => {
    await trackApi.track('d1', {
      startTime: '2026-08-01 00:00:00',
      endTime: '2026-08-01 23:59:59',
      limit: 10000,
    });
    expect(pathOf()).toContain('/v1/devices/d1/track?');
    // 空格必须转义成 %20，斜杠日期格式（原厂 YYYY/MM/DD）后端不认
    expect(pathOf()).toContain('startTime=2026-08-01%2000%3A00%3A00');
    expect(pathOf()).toContain('limit=10000');
  });

  test('轨迹的 posTypes 数组展开成重复参数', async () => {
    await trackApi.track('d1', { startTime: 'a', endTime: 'b', posTypes: [1, 3] });
    expect(pathOf()).toContain('posTypes=1&posTypes=3');
  });

  test('日历打点按月查', async () => {
    await trackApi.dataDates('d1', { type: 'audio', month: '2026-08' });
    expect(pathOf()).toBe('/v1/devices/d1/data-dates?type=audio&month=2026-08');
  });

  test('分享：生成 POST / 撤销 DELETE / 查看走公开路径', async () => {
    await shareApi.create('d1', { expireHours: 48 });
    expect(lastReq.method).toBe('POST');
    expect(pathOf()).toBe('/v1/devices/d1/share-location');
    expect(lastReq.data).toEqual({ expireHours: 48 });

    await shareApi.revoke('d1');
    expect(lastReq.method).toBe('DELETE');

    await shareApi.view('G0DWnKbh3xQz7Rf2');
    expect(pathOf()).toBe('/v1/share/G0DWnKbh3xQz7Rf2');
  });

  test('逆地理编码带 lat/lng', async () => {
    await geoApi.regeo({ lat: 22.5, lng: 114.05 });
    expect(pathOf()).toBe('/v1/geo/regeo?lat=22.5&lng=114.05');
  });
});

describe('请求层通用行为', () => {
  test('必带 X-Lang，否则 msg 全是英文', async () => {
    await deviceApi.currentDevice();
    expect(lastReq.header['X-Lang']).toBe('zh');
  });

  test('响应信封解析成 {code, succeeded, msg, data}', async () => {
    const res = await deviceApi.currentDevice();
    expect(res.succeeded).toBe(true);
    expect(res.code).toBe(0);
  });

  test('业务失败：succeeded=false 且把 code 透传给调用方', async () => {
    global.uni.request = (opts) => {
      lastReq = opts;
      opts.success({ statusCode: 200, header: {}, data: { code: 21011, msg: '该设备不属于当前账号' } });
    };
    const res = await deviceApi.realtime('other');
    expect(res.succeeded).toBe(false);
    expect(res.code).toBe(21011);
  });

  test('HTTP 非 200 不当成业务失败码（契约里状态恒 200，出现即请求没进业务层）', async () => {
    global.uni.request = (opts) => {
      lastReq = opts;
      opts.success({ statusCode: 502, header: {}, data: 'bad gateway' });
    };
    const res = await deviceApi.currentDevice();
    expect(res.succeeded).toBe(false);
    expect(res.code).toBe(-502);
  });

  test('网络失败返回可展示的中文提示，而不是 uni 的原始 errMsg', async () => {
    global.uni.request = (opts) => {
      opts.fail({ errMsg: 'request:fail timeout' });
    };
    const res = await deviceApi.currentDevice();
    expect(res.succeeded).toBe(false);
    expect(res.msg).toContain('超时');
  });
});
