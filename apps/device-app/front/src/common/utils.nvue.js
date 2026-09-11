/*
 * 模块: common/utils.nvue.js
 * 反编译自 webpack 模块 166（nvue 编译空间）
 * 已剥离 webpack 的 global 注入包装（保留了 1 个注入参数的绑定）
 * 变量 i 在内层被重新声明，保留短名以维持遮蔽语义
 * 变量 o 在内层被重新声明，保留短名以维持遮蔽语义
 */
import mod0 from 'moment'
import '@/.unpacked/nvue/16.js'
import i from './config.nvue.js'
import o from '@/.unpacked/nvue/210.js'

"use strict";
var e = require("@/.unpacked/nvue/17.js").default;
export function badgeBgColor(e) {
  var t;
  switch (e) {
    case "common.device.status.offline":
      t = "#909399";
      break;
    case "common.device.status.online":
    case "common.device.status.exercise":
      t = "#1FC886";
      break;
    case "common.device.status.static":
      t = "#6081C7";
      break;
    case "common.device.status.unused":
      t = "#A4A4A4";
      break;
    default:
      t = "#E12E22";
  }
  return t;
}
export function badgeState(e) {
  var t;
  switch (e) {
    case "common.device.status.offline":
      t = "info";
      break;
    case "common.device.status.online":
      t = "success";
      break;
    case "common.device.status.unused":
      t = "info";
      break;
    case "common.device.status.static":
      t = "primary";
      break;
    default:
      t = "error";
  }
  return t;
}
export function batteryStateHangle(e, t) {
  return i.wirelessDevice.includes(t) ? e ? "device.charging-px" : "device.uncharged-px" : e ? "device.charging" : "device.uncharged";
}
export function byteLength(e) {
  return e.replace(/[\u0391-\uFFE5]/g, "aa").length;
}
export function date2local(e) {
  return e ? "Invalid date" == mod0(e).format("L") ? "" : mod0(e).format("L") : "";
}
export function datetime2local(e) {
  return e ? "Invalid date" == mod0(e).format("L") ? "" : mod0(e).format("YYYY/MM/DD HH:mm") : "";
}
export function datetime3local(e) {
  return e ? "Invalid date" == mod0(e).format("L") ? "" : mod0(e).format("MM-DD HH:mm") : "";
}
export function datetimeDiff(e, t) {
  if (!e) return "";
  t || (t = new Date());
  var n = mod0(e), a = mod0(t), i = mod0.duration(a.diff(n)), o = i.days(), s = i.hours(), d = i.minutes(), u = i.seconds();
  o && o + "\u5929 ";
  s && s + "\u5c0f\u65f6 ";
  d && d + "\u5206\u949f ";
  u && u + "\u79d2";
  return i.humanize();
}
export function deviceDirection(e) {
  if (!e) return "common.dir.north";
  return e > 337.5 || e <= 22.5 ? "common.dir.north" : e > 22.5 && e <= 67.5 ? "common.dir.northeast" : e > 67.5 && e <= 112.5 ? "common.dir.east" : e > 112.5 && e <= 157.5 ? "common.dir.southeast" : e > 157.5 && e <= 202.5 ? "common.dir.south" : e > 202.5 && e <= 247.5 ? "common.dir.southwest" : e > 247.5 && e <= 292.5 ? "common.dir.west" : "common.dir.northwest";
}
export function deviceStatus(e, t) {
  switch (e) {
    case 0:
      return "common.device.status.unused";
    case 1:
      return "list" == t ? "common.device.status.online" : t ? "common.device.status.exercise" : "common.device.status.static";
    case 2:
      return "common.device.status.offline";
    case 3:
      return "common.device.status.shutdown";
    default:
      return "common.device.status.unknown";
  }
}
export function funcShowHandler(e, t) {
  if (!e) return false;
  return !t || e.some(function (e) {
    return e.id === t;
  });
}
export function gcoordTransform(e) {
  if (e.lonlat[0] && e.lonlat[1]) {
    var t = {
      WGS84: o.WGS84,
      GCJ02: o.GCJ02
    };
    return o.transform(e.lonlat, t[e.to], t[e.form]);
  }
  return e.lonlat;
}
export function getDays(t, n) {
  var a = mod0(t), i = mod0(n), o = mod0.duration(i.diff(a)), s = o.years(), d = o.months(), u = o.days(), l = (o = mod0.duration({
    years: s,
    months: d,
    days: u
  })).asDays();
  return (e("log", l, "totalDays", " at utils/common.js:362"), l);
}
export function getNetworkTime(t, n, a) {
  e("log", t, n, "startstaet", " at utils/common.js:297");
  var i = mod0(t), o = mod0(n), s = mod0.duration(o.diff(i)), d = s.years(), u = s.months(), l = s.days(), c = s.hours(), _ = s.minutes(), m = s.seconds();
  if (a) {
    if (d) return ("").concat(d, "\u5e74").concat(u, "\u6708").concat(l, "\u5929").concat(c, "\u5c0f\u65f6").concat(_, "\u5206").concat(m, "\u79d2");
    if (u) return ("").concat(u, "\u6708").concat(l, "\u5929").concat(c, "\u5c0f\u65f6").concat(_, "\u5206").concat(m, "\u79d2");
    if (l) return ("").concat(l, "\u5929").concat(c, "\u5c0f\u65f6").concat(_, "\u5206").concat(m, "\u79d2");
    if (c) return ("").concat(c, "\u5c0f\u65f6").concat(_, "\u5206").concat(m, "\u79d2");
    if (_) return ("").concat(_, "\u5206").concat(m, "\u79d2");
    if (m) return ("").concat(m, "\u79d2");
  } else {
    if (d) return ("").concat(d, "\u5e74 ").concat(u, "\u6708 ").concat(l, "\u5929");
    if (u) return ("").concat(u, "\u6708 ").concat(l, "\u5929");
    if (l) return ("").concat(l, "\u5929");
  }
}
export function getRegionInfo(e, t) {
  var n = e.filter(function (e) {
    return e.name == t[0];
  });
  if ("\u4e0d\u9650" == t[1]) return n;
  var a = n[0].districts.filter(function (e) {
    return e.name == t[1];
  });
  return "\u4e0d\u9650" == t[2] ? a : a[0].districts.filter(function (e) {
    return e.name == t[2];
  });
}
/**
 * 设备图标：按 iconId 在图标表里查 code 与是否随方向旋转。
 *
 * 图标表（契约 6.7）还没加载完时 `t` 是 undefined——原版直接 `t.filter` 会把整个
 * onLoad 打断（轨迹页就这么整页画不出来）。查不到一律回退 default，不抛错。
 */
export function getTerminalIconCode(e, t) {
  var CODE_MAP = {
    ebike: 'motor',
    motorcycle: 'motor',
    cargo: 'truck'
  };
  var n = new Object(), a = (t || []).filter(function (t) {
    return t.id == e;
  });
  if (a.length) {
    n.code = CODE_MAP[a[0].code] || a[0].code;
    n.rotateState = a[0].rotate;
  } else {
    n.code = "default";
    n.rotateState = true;
  }
  return n;
}
export function getUrlCode() {
  var e = location.search, t = new Object();
  if (-1 != e.indexOf("?")) for (var n = e.substr(1).split("&"), a = 0; a < n.length; a++) t[n[a].split("=")[0]] = n[a].split("=")[1];
  return t;
}
export function gotoPagesLogin(e) {
  e && s("\u8bf7\u5148\u767b\u5f55");
  setTimeout(function () {
    uni.navigateTo({
      url: ("/pagesCore/login/index?back=").concat(true),
      animationType: "slide-in-bottom",
      animationDuration: 200
    });
  }, 500);
}
export function orderStatus(e) {
  return -1 === e ? "\u5df2\u53d6\u6d88" : 0 === e ? "\u672a\u652f\u4ed8" : 1 === e ? "\u5df2\u652f\u4ed8" : 2 === e ? "\u5df2\u90e8\u4efd\u9000\u6b3e" : 3 === e ? "\u5df2\u5168\u989d\u9000\u6b3e" : "\u672a\u77e5";
}
export function parseRegion(e) {
  var t = e[0].polyline.split("|").map(function (e) {
    return e.split(";");
  }).map(function (e) {
    return e.map(function (e) {
      return e.split(",");
    });
  });
  return t = t.map(function (e) {
    return e.map(function (e) {
      return {
        longitude: e[0],
        latitude: e[1]
      };
    });
  });
}
export function qzGotoWx(e) {
  return void uni.navigateTo({
    url: e.url
  });
}
export const qzwlToast = s;
export function sortCode(e) {
  return function (t, n) {
    return t[e] - n[e];
  };
}
export function storeLocation(e, t) {
  if (!t.longitude && !t.latitude) return false;
  if (!e.length) return true;
  if (JSON.stringify(e[e.length - 1]) != JSON.stringify(t)) return true;
}
function s(e, t) {
  var n;
  n = setTimeout(function () {
    (uni.showToast({
      title: e,
      icon: t || "none"
    }), clearInterval(n));
  }, 100);
}

/**
 * 地图操作的安全包装：`mapContext` 要到页面 onReady 才由 createMapContext 创建，
 * 而 onShow、异步数据回调、定时刷新、页面销毁后的迟到回调都可能拿到 null。
 * 每个调用点各写一遍判空既啰嗦又必然漏（首页原本 10 处调用一处都没判，
 * 登录跳首页时 TypeError 直接打断渲染，地图与设备卡片都画不出来）。
 *
 * 未就绪时返回一个所有方法都是空操作的替身，并**立刻执行 complete 回调**——
 * 有些调用点靠 complete 推进后续流程，光返回 noop 会让那条流程永远卡住。
 * 地图操作本身跳过是正确语义：数据就绪后会重新触发绘制。
 */
export function safeMap(ctx) {
  if (ctx) return ctx;
  return new Proxy(
    {},
    {
      get: function () {
        return function (opts) {
          if (opts && typeof opts.complete === "function") {
            opts.complete({ errMsg: "map not ready" });
          }
        };
      }
    }
  );
}
