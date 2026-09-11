// webpack 模块 795  [nvue]
// 出现于: pages/home/home.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return a;
  }), n.d(t, "c", function () {
    return i;
  }), n.d(t, "a", function () {
    return r;
  }));
  var r = {
    uButton: require("uview-ui/components/u-button/u-button.vue").default
  }, a = function () {
    var e = this.$createElement, t = this._self._c || e;
    return t("view", {
      staticClass: ["flex-row", "justify-between", "items-center"]
    }, [t("view", {}, [t("u-image", {
      staticClass: ["logoImg"],
      attrs: {
        src: this.cdn + "/draw/qzwl-logo.png"
      }
    })], 1), this._m(0), t("view", [t("u-button", {
      staticStyle: {
        height: "60rpx",
        width: "150rpx"
      },
      attrs: {
        type: "primary",
        text: "\u7acb\u5373\u767b\u5f55"
      },
      on: {
        click: this.gotoLogin
      }
    })], 1)]);
  }, i = [function () {
    var e = this.$createElement, t = this._self._c || e;
    return t("view", {}, [t("u-text", {
      staticClass: ["text-white", "text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [this._v("\u767b\u5f55\u94ed\u667a\u7269\u8054")]), t("u-text", {
      staticClass: ["text-white", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [this._v("\u4eab\u53d7GPS\u7cbe\u51c6\u5b9a\u4f4d\u3001\u8f68\u8ff9\u670d\u52a1\u7b49")])]);
  }];
})(module, exports, __r);
