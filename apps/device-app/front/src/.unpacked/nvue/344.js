// webpack 模块 344  [nvue]
// 出现于: pages/msg/index.js, pagesFunc/terminal/locate-mode/index.js, pagesFunc/terminal/locus/index.js
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
    uPicker: require("uview-ui/components/u-picker/u-picker.vue").default
  }, a = function () {
    var e = this, t = e.$createElement;
    return (e._self._c || t)("u-picker", {
      ref: "picker",
      attrs: {
        show: e.show,
        closeOnClickOverlay: e.closeOnClickOverlay,
        columns: e.columns,
        title: e.title,
        itemHeight: e.itemHeight,
        showToolbar: e.showToolbar,
        visibleItemCount: e.visibleItemCount,
        defaultIndex: e.innerDefaultIndex,
        cancelText: e.cancelText,
        confirmText: e.confirmText,
        cancelColor: e.cancelColor,
        confirmColor: e.confirmColor
      },
      on: {
        close: e.close,
        cancel: e.cancel,
        confirm: e.confirm,
        change: e.change
      }
    });
  }, i = [];
})(module, exports, __r);
