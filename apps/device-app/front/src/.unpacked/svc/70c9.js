// webpack 模块 70c9  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/svc/7ca3.js")), i = a(require("@/.unpacked/svc/a7fc.js")), o = a(require("@/.unpacked/svc/8d60.js")), s = a(require("@/.unpacked/svc/56de.js")), u = a(require("@/.unpacked/svc/b65c.js")), d = a(require("@/.unpacked/svc/a4af.js")), c = a(require("@/.unpacked/svc/f28f.js")), l = a(require("@/.unpacked/svc/a8dc.js")), f = a(require("@/.unpacked/svc/0211.js")), m = a(require("@/.unpacked/svc/2709.js")), p = a(require("@/.unpacked/svc/8e73.js")), _ = a(require("@/.unpacked/svc/b76e.js")), h = a(require("@/.unpacked/svc/9376.js")), y = a(require("@/.unpacked/svc/7207.js")), v = a(require("@/.unpacked/svc/5a89.js"));
  function b(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(e);
      (t && (a = a.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, a));
    }
    return n;
  }
  function g(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? b(Object(n), !0).forEach(function (t) {
        (0, r.default)(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : b(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  var M = g(g({
    route: u.default,
    date: m.default.timeFormat,
    colorGradient: d.default.colorGradient,
    hexToRgb: d.default.hexToRgb,
    rgbToHex: d.default.rgbToHex,
    colorToRgba: d.default.colorToRgba,
    test: c.default,
    type: ["primary", "success", "error", "warning", "info"],
    http: new s.default(),
    config: p.default,
    zIndex: h.default,
    debounce: l.default,
    throttle: f.default,
    mixin: i.default,
    mpMixin: o.default,
    props: _.default
  }, m.default), {}, {
    color: y.default,
    platform: v.default
  });
  uni.$u = M;
  var w = {
    install: function (e) {
      (e.filter("timeFormat", function (e, t) {
        return uni.$u.timeFormat(e, t);
      }), e.filter("date", function (e, t) {
        return uni.$u.timeFormat(e, t);
      }), e.filter("timeFrom", function (e, t) {
        return uni.$u.timeFrom(e, t);
      }), e.prototype.$u = M, e.mixin(i.default));
    }
  };
  t.default = w;
})(module, exports, __r);
