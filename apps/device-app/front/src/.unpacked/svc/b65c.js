// webpack 模块 b65c  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/svc/127e.js")), i = a(require("@/.unpacked/svc/ee10.js")), o = a(require("@/.unpacked/svc/67ad.js")), s = a(require("@/.unpacked/svc/0bdb.js")), u = (function () {
    function e() {
      ((0, o.default)(this, e), this.config = {
        type: "navigateTo",
        url: "",
        delta: 1,
        params: {},
        animationType: "pop-in",
        animationDuration: 300,
        intercept: !1
      }, this.route = this.route.bind(this));
    }
    return ((0, s.default)(e, [{
      key: "addRootPath",
      value: function (e) {
        return "/" === e[0] ? e : ("/").concat(e);
      }
    }, {
      key: "mixinParam",
      value: function (e, t) {
        e = e && this.addRootPath(e);
        var n = "";
        return (/.*\/.*\?.*=.*/).test(e) ? (n = uni.$u.queryParams(t, !1), e + ("&").concat(n)) : (n = uni.$u.queryParams(t), e + n);
      }
    }, {
      key: "route",
      value: (function () {
        var e = (0, i.default)(r.default.mark(function e() {
          var t, n, a, i, o = arguments;
          return r.default.wrap(function (e) {
            while (1) switch (e.prev = e.next) {
              case 0:
                if ((t = o.length > 0 && void 0 !== o[0] ? o[0] : {}, n = o.length > 1 && void 0 !== o[1] ? o[1] : {}, a = {}, "string" === typeof t ? (a.url = this.mixinParam(t, n), a.type = "navigateTo") : (a = uni.$u.deepMerge(t, this.config), a.url = this.mixinParam(t.url, t.params)), a.url !== uni.$u.page())) {
                  e.next = 6;
                  break;
                }
                return e.abrupt("return");
              case 6:
                if ((n.intercept && (this.config.intercept = n.intercept), a.params = n, a = uni.$u.deepMerge(this.config, a), "function" !== typeof uni.$u.routeIntercept)) {
                  e.next = 16;
                  break;
                }
                return (e.next = 12, new Promise(function (e, t) {
                  uni.$u.routeIntercept(a, e);
                }));
              case 12:
                (i = e.sent, i && this.openPage(a), e.next = 17);
                break;
              case 16:
                this.openPage(a);
              case 17:
              case "end":
                return e.stop();
            }
          }, e, this);
        }));
        return function () {
          return e.apply(this, arguments);
        };
      })()
    }, {
      key: "openPage",
      value: function (e) {
        var t = e.url, n = (e.type, e.delta), a = e.animationType, r = e.animationDuration;
        ("navigateTo" != e.type && "to" != e.type || uni.navigateTo({
          url: t,
          animationType: a,
          animationDuration: r
        }), "redirectTo" != e.type && "redirect" != e.type || uni.redirectTo({
          url: t
        }), "switchTab" != e.type && "tab" != e.type || uni.switchTab({
          url: t
        }), "reLaunch" != e.type && "launch" != e.type || uni.reLaunch({
          url: t
        }), "navigateBack" != e.type && "back" != e.type || uni.navigateBack({
          delta: n
        }));
      }
    }]), e);
  })(), d = new u().route;
  t.default = d;
})(module, exports, __r);
