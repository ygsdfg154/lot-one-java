// webpack 模块 918f  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/svc/47a9.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = function () {
      return new Promise(function (t, n) {
        (0, o.default)().then((function () {
          var a = (0, i.default)(r.default.mark(function a(i) {
            var o, s, u, d, c;
            return r.default.wrap(function (a) {
              while (1) switch (a.prev = a.next) {
                case 0:
                  if (i.data) {
                    a.next = 2;
                    break;
                  }
                  return a.abrupt("return", t(i));
                case 2:
                  if ((o = i.code, s = i.message, u = i.data, d = u.isSilently, c = u.url, u.platform, u.type, !(o > 0))) {
                    a.next = 15;
                    break;
                  }
                  if ((uni.downloadFile({
                    url: c,
                    success: function (t) {
                      200 === t.statusCode ? (i.data.url = t.tempFilePath, e("log", "\u6587\u4ef6\u4e0b\u8f7d\u6210\u529f:", t.tempFilePath, " at pages/app-updateVersions/utils/update-check.js:46")) : e("error", "\u4e0b\u8f7d\u5931\u8d25\uff0c\u72b6\u6001\u7801:", t.statusCode, " at pages/app-updateVersions/utils/update-check.js:48");
                    },
                    fail: function (t) {
                      e("error", "\u4e0b\u8f7d\u5931\u8d25:", t, " at pages/app-updateVersions/utils/update-check.js:52");
                    }
                  }), t(i), !d)) {
                    a.next = 10;
                    break;
                  }
                  return (uni.downloadFile({
                    url: i.data.url,
                    success: function (e) {
                      200 == e.statusCode && plus.runtime.install(e.tempFilePath, {
                        force: !1
                      });
                    }
                  }), a.abrupt("return"));
                case 10:
                  return (uni.setStorageSync("__package_info__", i.data), uni.navigateTo({
                    url: ("/pages/app-updateVersions/pages/upgrade-popup?local_storage_key=").concat("__package_info__"),
                    fail: function (t) {
                      (e("error", "\u66f4\u65b0\u5f39\u6846\u8df3\u8f6c\u5931\u8d25", t, " at pages/app-updateVersions/utils/update-check.js:89"), uni.removeStorageSync("__package_info__"));
                    }
                  }), a.abrupt("return"));
                case 15:
                  if (!(o < 0)) {
                    a.next = 18;
                    break;
                  }
                  return (e("error", s, " at pages/app-updateVersions/utils/update-check.js:97"), a.abrupt("return", n(i)));
                case 18:
                  return a.abrupt("return", t(i));
                case 19:
                case "end":
                  return a.stop();
              }
            }, a);
          }));
          return function (e) {
            return a.apply(this, arguments);
          };
        })()).catch(function (t) {
          (e("error", t, " at pages/app-updateVersions/utils/update-check.js:102"), e("error", t.message, " at pages/app-updateVersions/utils/update-check.js:104"), n(t));
        });
      });
    });
    var r = a(require("@/.unpacked/svc/127e.js")), i = a(require("@/.unpacked/svc/ee10.js")), o = a(require("@/.unpacked/svc/bd05.js"));
    require("../../common/utils.js");
  }).call(this, require("@/.unpacked/svc/f3b9.js")["default"]);
})(module, exports, __r);
