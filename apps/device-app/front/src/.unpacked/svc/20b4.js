// webpack 模块 20b4  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.setListTransition = void 0);
  t.setListTransition = function (e) {
    var t = "", n = e.funcName, a = e.paramString;
    if ("\u53c2\u6570\u8bbe\u7f6e" == e.funcName && null != a && a.SetList && a.hasOwnProperty("SetList")) {
      var r = Object.keys(a.SetList), i = [{
        code: "ChangeMode",
        name: "\u8bbe\u5907\u6a21\u5f0f\u5207\u6362"
      }, {
        code: "GPSPriority",
        name: "\u8bbe\u5907\u6a21\u5f0f\u5207\u6362"
      }, {
        code: "HeartBeatInterval",
        name: "\u5fc3\u8df3\u8bbe\u7f6e"
      }, {
        code: "Vibration",
        name: "\u9707\u52a8\u544a\u8b66"
      }, {
        code: "SpeedAlarm",
        name: "\u8d85\u901f\u544a\u8b66"
      }, {
        code: "TamperAlarm",
        name: "\u9632\u62c6\u544a\u8b66"
      }, {
        code: "StaticAlarm",
        name: "\u9759\u6b62\u544a\u8b66"
      }, {
        code: "LowBatteryAlarm",
        name: "\u4f4e\u7535\u544a\u8b66"
      }, {
        code: "SosAlarm",
        name: "SOS\u544a\u8b66"
      }, {
        code: "CutPowerAlarm",
        name: "\u65ad\u7535\u544a\u8b66"
      }, {
        code: "VoiceAlarm",
        name: "\u58f0\u63a7\u544a\u8b66"
      }, {
        code: "SwitchCard",
        name: "\u5207\u6362\u5361\u53f7"
      }].find(function (e) {
        return e.code == r[0];
      });
      n = i ? i.name : n;
      var o = Object.values(a.SetList);
      if ("Vibration" == r[0]) t = "1" == o[0] ? "\u5f00\u542f" : "\u5173\u95ed"; else if ("SpeedAlarm" == r[0]) {
        var s = JSON.parse(o[0]);
        t = 0 != s.SpeedLimit ? "\u5f00\u542f" : "\u5173\u95ed";
      } else "TamperAlarm" == r[0] || "StaticAlarm" == r[0] || "LowBatteryAlarm" == r[0] || "SosAlarm" == r[0] || "CutPowerAlarm" == r[0] ? t = "True" == o[0] ? "\u5f00\u542f" : "\u5173\u95ed" : "VoiceAlarm" == r[0] && (t = "1" == o[0] ? "\u5f00\u542f" : "\u5173\u95ed");
    }
    return (1 == e.fucId ? t = "\u662f" == a.isGarrison ? "\u5f00\u542f" : "\u5173\u95ed" : 12 == e.fucId ? t = "\u662f" == a.isCutDown ? "\u5f00\u542f" : "\u5173\u95ed" : 20 == e.fucId ? t = "\u6253\u5f00" == a.RecControl.substring(0, 2) ? "\u5f00\u542f" : "\u5173\u95ed" : 26 == e.fucId && (t = "\u5f00\u59cb" == a.RecControl.substring(0, 2) ? "\u5f00\u542f" : "\u5173\u95ed"), t ? t + n : n);
  };
})(module, exports, __r);
