// webpack 模块 751  [nvue]
// 出现于: pagesMore/my/developers/push-msgs.js
const __r = require('./__runtime.js').wrap();
(function (t, e, i) {
  "use strict";
  (i.d(e, "b", function () {
    return r;
  }), i.d(e, "c", function () {
    return n;
  }), i.d(e, "a", function () {
    return o;
  }));
  var o = {
    uCellGroup: require("uview-ui/components/u-cell-group/u-cell-group.vue").default,
    uCell: require("uview-ui/components/u-cell/u-cell.vue").default
  }, r = function () {
    var t = this, e = t.$createElement, i = t._self._c || e;
    return i("scroll-view", {
      staticStyle: {
        flexDirection: "column"
      },
      attrs: {
        scrollY: !0,
        showScrollbar: !0,
        enableBackToTop: !0,
        bubble: "true"
      }
    }, [i("view", [i("u-cell-group", t._l(t.pushMessages, function (e, o) {
      return i("u-cell", {
        key: o,
        attrs: {
          title: e.title,
          value: e.type,
          label: e.time,
          arrow: !1
        },
        on: {
          click: function (i) {
            t.showMessage(e);
          }
        }
      });
    }), 1)], 1)]);
  }, n = [];
})(module, exports, __r);
