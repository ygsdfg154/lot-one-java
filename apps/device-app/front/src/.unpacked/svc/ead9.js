// webpack 模块 ead9  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return r;
  }), n.d(t, "c", function () {
    return i;
  }), n.d(t, "a", function () {
    return a;
  }));
  var a = {
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return e._$s(0, "i", e.show) ? n("view", {
      staticClass: e._$s(0, "sc", "u-empty"),
      style: e._$s(0, "s", [e.emptyStyle]),
      attrs: {
        _i: 0
      }
    }, [e._$s(1, "i", !e.isSrc) ? n("u-icon", {
      attrs: {
        name: "message" === e.mode ? "chat" : "empty-" + e.mode,
        size: e.iconSize,
        color: e.iconColor,
        "margin-top": "14",
        _i: 1
      }
    }) : n("image", {
      style: e._$s(2, "s", {
        width: e.$u.addUnit(e.width),
        height: e.$u.addUnit(e.height)
      }),
      attrs: {
        src: e._$s(2, "a-src", e.icon),
        _i: 2
      }
    }), n("text", {
      staticClass: e._$s(3, "sc", "u-empty__text"),
      style: e._$s(3, "s", [e.textStyle]),
      attrs: {
        _i: 3
      }
    }, [e._v(e._$s(3, "t0-0", e._s(e.text ? e.text : e.icons[e.mode])))]), e._$s(4, "i", e.$slots.default || e.$slots.$default) ? n("view", {
      staticClass: e._$s(4, "sc", "u-empty__wrap"),
      attrs: {
        _i: 4
      }
    }, [e._t("default", null, {
      _i: 5
    })], 2) : e._e()], 1) : e._e();
  }, i = [];
})(module, exports, __r);
