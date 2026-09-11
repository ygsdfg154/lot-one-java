import { toVendorFuncs, VENDOR_FUNC_IDS } from '../src/adapters/funcs.js';
import { funcShowHandler } from '../src/common/utils.js';
import fs from 'fs';
import path from 'path';

const has = (funcs, id) => funcShowHandler(funcs, id);
const ALL_CAPS = {
  audio: true, posMode: true, posPriority: true, flightMode: true, oilCut: true,
  defense: true, powerOff: true, shakeAlarm: true, restart: true, locate: true,
};

describe('capabilities → 厂商功能位', () => {
  test('返回值形状必须是 [{id}]，能被 funcShowHandler 的 .some 吃下', () => {
    const funcs = toVendorFuncs(ALL_CAPS);
    expect(Array.isArray(funcs)).toBe(true);
    expect(funcs.every((f) => typeof f.id === 'number')).toBe(true);
    // 这条就是真实回归：曾经直接把 capabilities 对象塞进 terminalFuncs，页面报
    // "e.some is not a function"，首页整块功能区静默不渲染
    expect(() => funcShowHandler(funcs, 1)).not.toThrow();
  });

  test('指令类入口跟着 capabilities 走', () => {
    const on = toVendorFuncs(ALL_CAPS);
    expect(has(on, 1)).toBe(true); // 布防
    expect(has(on, 22)).toBe(true); // 远程开关机
    expect(has(on, 29)).toBe(true); // 重启
    expect(has(on, 19)).toBe(true); // 立即定位

    const off = toVendorFuncs({ ...ALL_CAPS, defense: false, powerOff: false, restart: false, locate: false });
    expect(has(off, 1)).toBe(false);
    expect(has(off, 22)).toBe(false);
    expect(has(off, 29)).toBe(false);
    expect(has(off, 19)).toBe(false);
  });

  test('未分配产品（capabilities 全 false）时只留平台侧功能', () => {
    const funcs = toVendorFuncs({});
    expect(has(funcs, 16)).toBe(true); // 围栏是平台功能，不看机型
    expect(has(funcs, 1)).toBe(false); // 布防要指令，设备收不到就不画
    expect(has(funcs, 46)).toBe(false); // 拾音同理
  });

  test('功能页宫格：平台侧五项与机型无关，声音安防跟 capabilities.audio', () => {
    // 3 轨迹 / 52 流量卡 / 57 分享定位 / 58 报表 都是平台能力，不设开关。
    // 57 曾被误判成"立即定位"（在设备信息组件里另有上下文），实际 ability 页
    // 的 key=share/title=device.share.locate，是分享定位
    [3, 52, 57, 58].forEach((id) => expect(has(toVendorFuncs({}), id)).toBe(true));
    expect(has(toVendorFuncs({ audio: true }), 14)).toBe(true);
    expect(has(toVendorFuncs({ audio: false }), 14)).toBe(false);
  });

  test('caps 为 null 时返回空数组（详情还没回来，先都不画）', () => {
    expect(toVendorFuncs(null)).toEqual([]);
    expect(funcShowHandler(toVendorFuncs(null), 1)).toBe(false);
  });

  test('自定义指令透传跟 customCmd', () => {
    expect(has(toVendorFuncs({ customCmd: true }), 31)).toBe(true);
    expect(has(toVendorFuncs({ customCmd: false }), 31)).toBe(false);
  });

  test('协议帧待接入的入口仍按能力位显隐 —— 产品配了指令就出现，点了由网关回不支持', () => {
    // 这几条的指令码与参数已在 registry 定稿，只差协议帧体。入口不该硬隐藏：
    // 硬隐藏意味着协议接入当天还要回头改前端
    expect(has(toVendorFuncs({ factoryReset: true }), 42)).toBe(true);
    expect(has(toVendorFuncs({ factoryReset: false }), 42)).toBe(false);
    expect(has(toVendorFuncs({ audioAlways: true }), 26)).toBe(true);
    expect(has(toVendorFuncs({ audioAlways: false }), 26)).toBe(false);
  });

  test('断油断电跟 oilCut（i18n key 叫 buffer，别当成"告警缓冲"）', () => {
    expect(has(toVendorFuncs(ALL_CAPS), 12)).toBe(true);
    expect(has(toVendorFuncs({ ...ALL_CAPS, oilCut: false }), 12)).toBe(false);
  });

  test('亲情号入口保留 —— 9.5 只是"存储+回显"，不是没实现', () => {
    expect(has(toVendorFuncs({}), 35)).toBe(true);
  });

  test('声控模式跟 capabilities.audio（三种模式各有各的指令码）', () => {
    expect(has(toVendorFuncs(ALL_CAPS), 20)).toBe(true); // 声控 S_AUDIO_AL
    expect(has(toVendorFuncs({ ...ALL_CAPS, audio: false }), 20)).toBe(false);
  });

  test('8.6.1 告警项加载后，告警类入口只认后端返回的码', () => {
    const codes = ['S_SHAKE_AL', 'S_LOW_POWER_AL'];
    const funcs = toVendorFuncs(ALL_CAPS, codes);
    expect(has(funcs, 43)).toBe(true); // 震动 S_SHAKE_AL
    expect(has(funcs, 55)).toBe(true); // 低电 S_LOW_POWER_AL
    expect(has(funcs, 45)).toBe(false); // 拆除没返回 → 不画（配了也存不进去）
    expect(has(funcs, 46)).toBe(false); // 拾音没返回 → 不画，即使 caps.audio=true
    // 指令类不受告警码影响
    expect(has(funcs, 22)).toBe(true);
  });

  test('告警项未加载（null）时按默认值给，设置页首帧不至于全空', () => {
    const funcs = toVendorFuncs(ALL_CAPS);
    expect(has(funcs, 43)).toBe(true);
    expect(has(funcs, 55)).toBe(true);
    expect(has(funcs, 65)).toBe(false); // 离线告警 8.6 暂无此项
  });

  test('已加载但返回空数组 ≠ 未加载：这台设备一项都不能配，全部隐藏', () => {
    const funcs = toVendorFuncs(ALL_CAPS, []);
    [43, 44, 45, 46, 55, 59, 60].forEach((id) => expect(has(funcs, id)).toBe(false));
    // 指令类不受影响，照常显示
    expect(has(funcs, 22)).toBe(true);
    expect(has(funcs, 16)).toBe(true);
  });
});

describe('映射表覆盖度', () => {
  /** 扫出模板（编译后的 render 函数）里真实用到的厂商 id。 */
  function usedIds() {
    const root = path.resolve(__dirname, '..');
    const dirs = ['src/.unpacked', 'src/pages', 'src/pagesFunc', 'src/pagesMore', 'src/components'];
    const ids = new Set();
    // 调用方写法不止 `this.terminalFuncs`：组件里有 `e.terminalFuncs`、`self.terminalFuncs`，
    // 早先只认 this. 前缀，音频那两个模式入口(20/26)就这么漏掉了
    // 两种用法都要扫：
    //   ① 直接调用 `terminalFuncShow(43)` / `funcShowHandler(x.terminalFuncs, 20)`
    //   ② 数据里声明 `func: 14`（功能页宫格 gridList 用这种，靠 currentFuncList 过滤）
    // 只扫①的话，功能页那批入口(3/14/52/57/58)漏了都发现不了——它们不显示，
    // 而"不显示"在测试里是沉默的
    const patterns = [
      /(?:terminalFuncShow|funcShowHandler)\(\s*(?:[\w$.]+\.terminalFuncs\s*,\s*)?(\d+)\s*\)/g,
      /\bfunc:\s*(\d+)/g,
    ];
    const walk = (dir) => {
      const abs = path.join(root, dir);
      if (!fs.existsSync(abs)) return;
      for (const name of fs.readdirSync(abs)) {
        const rel = path.join(dir, name);
        if (fs.statSync(path.join(root, rel)).isDirectory()) walk(rel);
        else if (/\.(js|n?vue)$/.test(name)) {
          const src = fs.readFileSync(path.join(root, rel), 'utf8');
          for (const re of patterns) {
            re.lastIndex = 0;
            let m;
            while ((m = re.exec(src))) ids.add(Number(m[1]));
          }
        }
      }
    };
    dirs.forEach(walk);
    return [...ids];
  }

  test('模板用到的每个 id 都在映射表里有判定（漏一个就是入口永远不显示）', () => {
    // 1825 增值服务 / 2002 激活 / 2222 用户类型：ability 页在 terminalFuncShow 里
    // 走了独立分支（看 enableValueAdded / enableActivation / userType），不查功能位
    const handledElsewhere = new Set([1825, 2002, 2222]);
    const missing = usedIds().filter((id) => !handledElsewhere.has(id) && !VENDOR_FUNC_IDS.includes(id));
    expect(missing).toEqual([]);
  });
});
