// webpack 模块 2709  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/svc/34cf.js")), i = a(require("@/.unpacked/svc/3b2d.js")), o = a(require("@/.unpacked/svc/f28f.js")), s = require("@/.unpacked/svc/03d1.js");
  function u(e) {
    if ([null, void 0, NaN, !1].includes(e)) return e;
    if ("object" !== (0, i.default)(e) && "function" !== typeof e) return e;
    var t = o.default.array(e) ? [] : {};
    for (var n in e) e.hasOwnProperty(n) && (t[n] = "object" === (0, i.default)(e[n]) ? u(e[n]) : e[n]);
    return t;
  }
  function d() {
    var e, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-mm-dd";
    e = t ? (/^\d{10}$/).test(null === t || void 0 === t ? void 0 : t.toString().trim()) ? new Date(1e3 * t) : "string" === typeof t && (/^\d+$/).test(t.trim()) ? new Date(Number(t)) : "string" === typeof t && t.includes("-") && !t.includes("T") ? new Date(t.replace(/-/g, "/")) : new Date(t) : new Date();
    var a = {
      y: e.getFullYear().toString(),
      m: (e.getMonth() + 1).toString().padStart(2, "0"),
      d: e.getDate().toString().padStart(2, "0"),
      h: e.getHours().toString().padStart(2, "0"),
      M: e.getMinutes().toString().padStart(2, "0"),
      s: e.getSeconds().toString().padStart(2, "0")
    };
    for (var i in a) {
      var o = new RegExp(("").concat(i, "+")).exec(n) || [], s = (0, r.default)(o, 1), u = s[0];
      if (u) {
        var d = "y" === i && 2 === u.length ? 2 : 0;
        n = n.replace(u, a[i].slice(d));
      }
    }
    return n;
  }
  function c(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "both";
    return (e = String(e), "both" == t ? e.replace(/^\s+|\s+$/g, "") : "left" == t ? e.replace(/^\s*/, "") : "right" == t ? e.replace(/(\s*$)/g, "") : "all" == t ? e.replace(/\s+/g, "") : e);
  }
  String.prototype.padStart || (String.prototype.padStart = function (e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : " ";
    if ("[object String]" !== Object.prototype.toString.call(t)) throw new TypeError("fillString must be String");
    var n = this;
    if (n.length >= e) return String(n);
    var a = e - n.length, r = Math.ceil(a / t.length);
    while (r >>= 1) (t += t, 1 === r && (t += t));
    return t.slice(0, a) + n;
  });
  var l = {
    range: function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
      return Math.max(e, Math.min(t, Number(n)));
    },
    getPx: function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      return o.default.number(e) ? t ? ("").concat(e, "px") : Number(e) : (/(rpx|upx)$/).test(e) ? t ? ("").concat(uni.upx2px(parseInt(e)), "px") : Number(uni.upx2px(parseInt(e))) : t ? ("").concat(parseInt(e), "px") : parseInt(e);
    },
    sleep: function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 30;
      return new Promise(function (t) {
        setTimeout(function () {
          t();
        }, e);
      });
    },
    os: function () {
      return uni.getSystemInfoSync().platform.toLowerCase();
    },
    sys: function () {
      return uni.getSystemInfoSync();
    },
    random: function (e, t) {
      if (e >= 0 && t > 0 && t >= e) {
        var n = t - e + 1;
        return Math.floor(Math.random() * n + e);
      }
      return 0;
    },
    guid: function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 32, t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, a = ("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").split(""), r = [];
      if ((n = n || a.length, e)) for (var i = 0; i < e; i++) r[i] = a[0 | Math.random() * n]; else {
        var o;
        (r[8] = r[13] = r[18] = r[23] = "-", r[14] = "4");
        for (var s = 0; s < 36; s++) r[s] || (o = 0 | 16 * Math.random(), r[s] = a[19 == s ? 3 & o | 8 : o]);
      }
      return t ? (r.shift(), ("u").concat(r.join(""))) : r.join("");
    },
    $parent: function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0, t = this.$parent;
      while (t) {
        if (!t.$options || t.$options.name === e) return t;
        t = t.$parent;
      }
      return !1;
    },
    addStyle: function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "object";
      if (o.default.empty(e) || "object" === (0, i.default)(e) && "object" === t || "string" === t && "string" === typeof e) return e;
      if ("object" === t) {
        e = c(e);
        for (var n = e.split(";"), a = {}, r = 0; r < n.length; r++) if (n[r]) {
          var s = n[r].split(":");
          a[c(s[0])] = c(s[1]);
        }
        return a;
      }
      var u = "";
      for (var d in e) {
        var l = d.replace(/([A-Z])/g, "-$1").toLowerCase();
        u += ("").concat(l, ":").concat(e[d], ";");
      }
      return c(u);
    },
    addUnit: function () {
      var e, t, n, a, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "auto", i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null !== (e = null === (t = uni) || void 0 === t || null === (n = t.$u) || void 0 === n || null === (a = n.config) || void 0 === a ? void 0 : a.unit) && void 0 !== e ? e : "px";
      return (r = String(r), o.default.number(r) ? ("").concat(r).concat(i) : r);
    },
    deepClone: u,
    deepMerge: function e() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      if ((t = u(t), "object" !== (0, i.default)(t) || "object" !== (0, i.default)(n))) return !1;
      for (var a in n) n.hasOwnProperty(a) && ((a in t) ? "object" !== (0, i.default)(t[a]) || "object" !== (0, i.default)(n[a]) ? t[a] = n[a] : t[a].concat && n[a].concat ? t[a] = t[a].concat(n[a]) : t[a] = e(t[a], n[a]) : t[a] = n[a]);
      return t;
    },
    error: function (e) {
      0;
    },
    randomArray: function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
      return e.sort(function () {
        return Math.random() - .5;
      });
    },
    timeFormat: d,
    timeFrom: function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-mm-dd";
      (null == e && (e = Number(new Date())), e = parseInt(e), 10 == e.toString().length && (e *= 1e3));
      var n = new Date().getTime() - e;
      n = parseInt(n / 1e3);
      var a = "";
      switch (!0) {
        case n < 300:
          a = "\u521a\u521a";
          break;
        case n >= 300 && n < 3600:
          a = ("").concat(parseInt(n / 60), "\u5206\u949f\u524d");
          break;
        case n >= 3600 && n < 86400:
          a = ("").concat(parseInt(n / 3600), "\u5c0f\u65f6\u524d");
          break;
        case n >= 86400 && n < 2592e3:
          a = ("").concat(parseInt(n / 86400), "\u5929\u524d");
          break;
        default:
          a = !1 === t ? n >= 2592e3 && n < 31536e3 ? ("").concat(parseInt(n / 2592e3), "\u4e2a\u6708\u524d") : ("").concat(parseInt(n / 31536e3), "\u5e74\u524d") : d(e, t);
      }
      return a;
    },
    trim: c,
    queryParams: function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "brackets", a = t ? "?" : "", r = [];
      -1 == ["indices", "brackets", "repeat", "comma"].indexOf(n) && (n = "brackets");
      var i = function (t) {
        var a = e[t];
        if (["", void 0, null].indexOf(a) >= 0) return "continue";
        if (a.constructor === Array) switch (n) {
          case "indices":
            for (var i = 0; i < a.length; i++) r.push(("").concat(t, "[").concat(i, "]=").concat(a[i]));
            break;
          case "brackets":
            a.forEach(function (e) {
              r.push(("").concat(t, "[]=").concat(e));
            });
            break;
          case "repeat":
            a.forEach(function (e) {
              r.push(("").concat(t, "=").concat(e));
            });
            break;
          case "comma":
            var o = "";
            (a.forEach(function (e) {
              o += (o ? "," : "") + e;
            }), r.push(("").concat(t, "=").concat(o)));
            break;
          default:
            a.forEach(function (e) {
              r.push(("").concat(t, "[]=").concat(e));
            });
        } else r.push(("").concat(t, "=").concat(a));
      };
      for (var o in e) i(o);
      return r.length ? a + r.join("&") : "";
    },
    toast: function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2e3;
      uni.showToast({
        title: String(e),
        icon: "none",
        duration: t
      });
    },
    type2icon: function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "success", t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      -1 == ["primary", "info", "error", "warning", "success"].indexOf(e) && (e = "success");
      var n = "";
      switch (e) {
        case "primary":
          n = "info-circle";
          break;
        case "info":
          n = "info-circle";
          break;
        case "error":
          n = "close-circle";
          break;
        case "warning":
          n = "error-circle";
          break;
        case "success":
          n = "checkmark-circle";
          break;
        default:
          n = "checkmark-circle";
      }
      return (t && (n += "-fill"), n);
    },
    priceFormat: function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ".", a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ",";
      e = ("").concat(e).replace(/[^0-9+-Ee.]/g, "");
      var r = isFinite(+e) ? +e : 0, i = isFinite(+t) ? Math.abs(t) : 0, o = "undefined" === typeof a ? "," : a, u = "undefined" === typeof n ? "." : n, d = "";
      d = (i ? (0, s.round)(r, i) + "" : ("").concat(Math.round(r))).split(".");
      var c = /(-?\d+)(\d{3})/;
      while (c.test(d[0])) d[0] = d[0].replace(c, ("$1").concat(o, "$2"));
      return ((d[1] || "").length < i && (d[1] = d[1] || "", d[1] += new Array(i - d[1].length + 1).join("0")), d.join(u));
    },
    getDuration: function (e) {
      var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n = parseInt(e);
      return t ? (/s$/).test(e) ? e : ("").concat(e, e > 30 ? "ms" : "s") : (/ms$/).test(e) ? n : (/s$/).test(e) ? n > 30 ? n : 1e3 * n : n;
    },
    padZero: function (e) {
      return ("00").concat(e).slice(-2);
    },
    formValidate: function (e, t) {
      var n = uni.$u.$parent.call(e, "u-form-item"), a = uni.$u.$parent.call(e, "u-form");
      n && a && a.validateField(n.prop, function () {}, t);
    },
    getProperty: function (e, t) {
      if (e) {
        if ("string" !== typeof t || "" === t) return "";
        if (-1 !== t.indexOf(".")) {
          for (var n = t.split("."), a = e[n[0]] || ({}), r = 1; r < n.length; r++) a && (a = a[n[r]]);
          return a;
        }
        return e[t];
      }
    },
    setProperty: function (e, t, n) {
      if (e) {
        if ("string" !== typeof t || "" === t) ; else if (-1 !== t.indexOf(".")) {
          var a = t.split(".");
          (function e(t, n, a) {
            if (1 !== n.length) while (n.length > 1) {
              var r = n[0];
              t[r] && "object" === (0, i.default)(t[r]) || (t[r] = {});
              n.shift();
              e(t[r], n, a);
            } else t[n[0]] = a;
          })(e, a, n);
        } else e[t] = n;
      }
    },
    page: function () {
      var e, t, n = getCurrentPages();
      return ("/").concat(null !== (e = null === (t = n[n.length - 1]) || void 0 === t ? void 0 : t.route) && void 0 !== e ? e : "");
    },
    pages: function () {
      var e = getCurrentPages();
      return e;
    },
    setConfig: function (e) {
      var t = e.props, n = void 0 === t ? {} : t, a = e.config, r = void 0 === a ? {} : a, i = e.color, o = void 0 === i ? {} : i, s = e.zIndex, u = void 0 === s ? {} : s, d = uni.$u.deepMerge;
      (uni.$u.config = d(uni.$u.config, r), uni.$u.props = d(uni.$u.props, n), uni.$u.color = d(uni.$u.color, o), uni.$u.zIndex = d(uni.$u.zIndex, u));
    }
  };
  t.default = l;
})(module, exports, __r);
