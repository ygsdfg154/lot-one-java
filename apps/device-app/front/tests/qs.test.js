import { stringify, withQuery } from '../src/common/qs.js';

describe('query string 序列化', () => {
  test('数组展开成重复 key（契约要求，逗号分隔后端不认）', () => {
    // 实测 deviceIds=a,b 会被后端当成一个设备号并返回 21011，见契约 12.1 注记
    expect(stringify({ deviceIds: ['d1', 'd2'] })).toBe('deviceIds=d1&deviceIds=d2');
    expect(stringify({ alarmCodes: ['SOS', 'SHAKE'] })).toBe('alarmCodes=SOS&alarmCodes=SHAKE');
  });

  test('单值与多参数', () => {
    expect(stringify({ page: 1, pageSize: 10 })).toBe('page=1&pageSize=10');
  });

  test('空值整项丢弃：不能发出 k= —— 后端会把它当成空串参数', () => {
    expect(stringify({ a: null, b: undefined, c: '', d: 1 })).toBe('d=1');
    expect(stringify({ ids: ['x', '', null] })).toBe('ids=x');
  });

  test('0 与 false 是有效取值，不能被当成空值丢掉', () => {
    // platform=0（未知端）、categoryId=0（全部分类）都有意义
    expect(stringify({ platform: 0 })).toBe('platform=0');
    expect(stringify({ flag: false })).toBe('flag=false');
  });

  test('特殊字符转义', () => {
    expect(stringify({ month: '2026-08', q: 'a b&c' })).toBe('month=2026-08&q=a%20b%26c');
  });

  test('withQuery 处理已有 ?', () => {
    expect(withQuery('/v1/alarms', { page: 1 })).toBe('/v1/alarms?page=1');
    expect(withQuery('/v1/alarms?x=1', { page: 1 })).toBe('/v1/alarms?x=1&page=1');
    expect(withQuery('/v1/alarms', {})).toBe('/v1/alarms');
    expect(withQuery('/v1/alarms')).toBe('/v1/alarms');
  });
});
