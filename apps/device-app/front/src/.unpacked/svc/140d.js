// webpack 模块 140d  [svc]
// 出现于: pagesFunc/app-sub-service.js
const __r = require('./__runtime.js').wrap();
(function (t, e, a) {
  "use strict";
  (a.d(e, "b", function () {
    return r;
  }), a.d(e, "c", function () {
    return i;
  }), a.d(e, "a", function () {
    return n;
  }));
  var n = {
    uButton: require("uview-ui/components/u-button/u-button.vue").default
  }, r = function () {
    var t = this, e = t.$createElement, a = t._self._c || e;
    return a("view", [a("view", {
      staticClass: t._$s(1, "sc", "audio-min flex-col"),
      attrs: {
        _i: 1
      }
    }, [a("view", {
      staticClass: t._$s(2, "sc", "audio-bar"),
      attrs: {
        _i: 2
      }
    }, [t._$s(3, "i", 1 == t.value) ? a("u-button", {
      attrs: {
        type: "primary",
        shape: "circle",
        text: t.l("audio.start"),
        _i: 3
      },
      on: {
        click: t.manualAudio
      }
    }) : t._e(), t._$s(4, "i", 2 == t.value) ? a("u-button", {
      attrs: {
        type: "primary",
        shape: "circle",
        text: t.l("audio.state"),
        _i: 4
      },
      on: {
        click: t.isCloseAtouAudio
      }
    }) : t._e(), t._$s(5, "i", 3 == t.value) ? a("u-button", {
      attrs: {
        type: "primary",
        shape: "circle",
        text: "\u6b63\u5728\u6301\u7eed\u58f0\u97f3\u5b89\u9632...",
        _i: 5
      },
      on: {
        click: t.isCloseAlwaysAudio
      }
    }) : t._e()], 1), a("view", {
      staticClass: t._$s(6, "sc", "audio-title flex-col flex-wrap"),
      attrs: {
        _i: 6
      }
    }, [a("text", {
      staticClass: t._$s(7, "sc", "text"),
      attrs: {
        _i: 7
      }
    }, [t._v(t._$s(7, "t0-0", t._s(t.l("audio.prompt.title"))))]), a("view", [a("text", {
      staticClass: t._$s(9, "sc", "text-sm text-gray"),
      attrs: {
        _i: 9
      }
    }, [t._v(t._$s(9, "t0-0", t._s(t.l("audio.prompt.content"))))])])])])]);
  }, i = [];
})(module, exports, __r);
