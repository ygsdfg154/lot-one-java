// webpack 模块 6fdf  [svc]
// 出现于: pagesCore/app-sub-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, a) {
  "use strict";
  (a.d(t, "b", function () {
    return n;
  }), a.d(t, "c", function () {
    return o;
  }), a.d(t, "a", function () {}));
  var n = function () {
    var e = this.$createElement, t = this._self._c || e;
    return t("view", [t("web-view", {
      ref: "webview",
      attrs: {
        "webview-styles": this._$s(1, "a-webview-styles", {
          progress: {
            color: this.primaryColor
          }
        }),
        src: this._$s(1, "a-src", this.dataUrl),
        _i: 1
      },
      on: {
        message: this.handlePostMessage
      }
    })]);
  }, o = [];
})(module, exports, __r);
