// webpack 模块 f3b9  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  function a(e) {
    var t = Object.prototype.toString.call(e);
    return t.substring(8, t.length - 1);
  }
  function r() {
    return "string" === typeof __channelId__ && __channelId__;
  }
  function i(e, t) {
    switch (a(t)) {
      case "Function":
        return "function() { [native code] }";
      default:
        return t;
    }
  }
  function o(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++) n[a - 1] = arguments[a];
    console[e].apply(console, n);
  }
  function s() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    var o = t.shift();
    if (r()) return (t.push(t.pop().replace("at ", "uni-app:///")), console[o].apply(console, t));
    var s = t.map(function (e) {
      var t = Object.prototype.toString.call(e).toLowerCase();
      if ("[object object]" === t || "[object array]" === t) try {
        e = "---BEGIN:JSON---" + JSON.stringify(e, i) + "---END:JSON---";
      } catch (r) {
        e = t;
      } else if (null === e) e = "---NULL---"; else if (void 0 === e) e = "---UNDEFINED---"; else {
        var n = a(e).toUpperCase();
        e = "NUMBER" === n || "BOOLEAN" === n ? "---BEGIN:" + n + "---" + e + "---END:" + n + "---" : String(e);
      }
      return e;
    }), u = "";
    if (s.length > 1) {
      var d = s.pop();
      (u = s.join("---COMMA---"), 0 === d.indexOf(" at ") ? u += d : u += "---COMMA---" + d);
    } else u = s[0];
    console[o](u);
  }
  (n.r(t), n.d(t, "log", function () {
    return o;
  }), n.d(t, "default", function () {
    return s;
  }));
})(module, exports, __r);
