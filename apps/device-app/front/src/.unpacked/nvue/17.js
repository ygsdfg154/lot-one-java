// webpack 模块 17  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  function a(e) {
    var t = Object.prototype.toString.call(e);
    return t.substring(8, t.length - 1);
  }
  function r() {
    return "string" == typeof __channelId__ && __channelId__;
  }
  function i(e, t) {
    switch (a(t)) {
      case "Function":
        return "function() { [native code] }";
      default:
        return t;
    }
  }
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    var o = t.shift();
    if (r()) return (t.push(t.pop().replace("at ", "uni-app:///")), console[o].apply(console, t));
    var s = t.map(function (e) {
      var t = Object.prototype.toString.call(e).toLowerCase();
      if ("[object object]" === t || "[object array]" === t) try {
        e = "---BEGIN:JSON---" + JSON.stringify(e, i) + "---END:JSON---";
      } catch (n) {
        e = t;
      } else if (null === e) e = "---NULL---"; else if (void 0 === e) e = "---UNDEFINED---"; else {
        var n = a(e).toUpperCase();
        e = "NUMBER" === n || "BOOLEAN" === n ? "---BEGIN:" + n + "---" + e + "---END:" + n + "---" : String(e);
      }
      return e;
    }), d = "";
    if (s.length > 1) {
      var u = s.pop();
      (d = s.join("---COMMA---"), 0 === u.indexOf(" at ") ? d += u : d += "---COMMA---" + u);
    } else d = s[0];
    console[o](d);
  }, t.log = function (e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++) n[a - 1] = arguments[a];
    console[e].apply(console, n);
  });
})(module, exports, __r);
