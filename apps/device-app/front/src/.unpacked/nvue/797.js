// webpack 模块 797  [nvue]
// 出现于: pages/home/home.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return r;
  }), n.d(t, "c", function () {
    return a;
  }), n.d(t, "a", function () {}));
  var r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return e.isPermissionAlertShow ? n("view", {
      staticClass: ["main", "p", "bg-white"]
    }, [n("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.permissionDeclare.title) + "\uff1a")]), n("u-text", {
      staticClass: ["text", "text-gray", "m-t-mini"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.permissionDeclare.details))])]) : e._e();
  }, a = [];
})(module, exports, __r);
