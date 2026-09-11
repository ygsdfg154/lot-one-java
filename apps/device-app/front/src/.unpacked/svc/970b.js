// webpack 模块 970b  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return a;
  }), n.d(t, "c", function () {
    return r;
  }), n.d(t, "a", function () {}));
  var a = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: e._$s(0, "sc", "flex-center"),
      attrs: {
        _i: 0
      }
    }, [n("view", {
      staticClass: e._$s(1, "sc", "content botton-radius"),
      attrs: {
        _i: 1
      }
    }, [n("view", {
      staticClass: e._$s(2, "sc", "content-bg"),
      attrs: {
        _i: 2
      }
    }), n("view", {
      staticClass: e._$s(3, "sc", "content-top"),
      attrs: {
        _i: 3
      }
    }, [n("image", {
      staticClass: e._$s(4, "sc", "content-top"),
      attrs: {
        src: e._$s(4, "a-src", e.cdn + "/draw/qzwl-update.png"),
        _i: 4
      }
    })]), n("view", {
      staticClass: e._$s(5, "sc", "content-header"),
      attrs: {
        _i: 5
      }
    }), n("view", {
      staticClass: e._$s(6, "sc", "content-body"),
      attrs: {
        _i: 6
      }
    }, [n("view", {
      staticClass: e._$s(7, "sc", "title"),
      attrs: {
        _i: 7
      }
    }, [n("text", [e._v(e._$s(8, "t0-0", e._s(e.installing ? "\u6b63\u5728\u5347\u7ea7" : e.title)))])]), n("view", {
      staticClass: e._$s(9, "sc", "body"),
      attrs: {
        _i: 9
      }
    }, [n("scroll-view", {
      staticClass: e._$s(10, "sc", "box-des-scroll"),
      attrs: {
        _i: 10
      }
    }, [n("text", {
      staticClass: e._$s(11, "sc", "box-des"),
      attrs: {
        _i: 11
      }
    }, [e._v(e._$s(11, "t0-0", e._s(e.installing ? "\u6b63\u5728\u4e3a\u60a8\u4e0b\u8f7d\uff0c\u8bf7\u8010\u5fc3\u7b49\u5f85..." : e.content)))])])]), n("view", {
      staticClass: e._$s(12, "sc", "footer flex-center"),
      attrs: {
        _i: 12
      }
    }, [e._$s(13, "i", e.isAppStore) ? [n("button", {
      staticClass: e._$s(14, "sc", "content-button"),
      style: e._$s(14, "s", {
        backgroundColor: e.primaryColor
      }),
      attrs: {
        _i: 14
      },
      on: {
        click: e.jumpToAppStore
      }
    }, [e._v(e._$s(14, "t0-0", e._s(e.downLoadBtnTextiOS)))])] : [e._$s(16, "i", !e.downloadSuccess) ? [e._$s(17, "i", e.downloading) ? n("view", {
      staticClass: e._$s(17, "sc", "progress-box flex-column"),
      attrs: {
        _i: 17
      }
    }, [n("progress", {
      staticClass: e._$s(18, "sc", "progress"),
      attrs: {
        percent: e._$s(18, "a-percent", e.downLoadPercent),
        activeColor: e._$s(18, "a-activeColor", e.primaryColor),
        _i: 18
      }
    }), n("view", [n("text", [e._v(e._$s(20, "t0-0", e._s(e.downLoadingText)))]), n("text", [e._v(e._$s(21, "t0-0", e._s(e.downloadedSize)) + e._$s(21, "t0-1", e._s(e.packageFileSize)))])]), n("button", {
      staticClass: e._$s(22, "sc", "content-button"),
      attrs: {
        _i: 22
      },
      on: {
        click: e.cancelUpdate
      }
    })]) : n("button", {
      staticClass: e._$s(23, "sc", "content-button"),
      style: e._$s(23, "s", {
        backgroundColor: e.primaryColor
      }),
      attrs: {
        _i: 23
      },
      on: {
        click: e.updateApp
      }
    }, [e._v(e._$s(23, "t0-0", e._s(e.downLoadBtnText)))])] : e._$s(24, "e", e.downloadSuccess && !e.installed) ? n("button", {
      staticClass: e._$s(24, "sc", "content-button"),
      style: e._$s(24, "s", {
        backgroundColor: e.primaryColor
      }),
      attrs: {
        loading: e._$s(24, "a-loading", e.installing),
        disabled: e._$s(24, "a-disabled", e.installing),
        _i: 24
      },
      on: {
        click: e.installPackage
      }
    }, [e._v(e._$s(24, "t0-0", e._s(e.installing ? "\u6b63\u5728\u5b89\u88c5\u2026\u2026" : "\u4e0b\u8f7d\u5b8c\u6210\uff0c\u7acb\u5373\u5b89\u88c5")))]) : e._e(), e._$s(25, "i", e.installed && e.isWGT) ? n("button", {
      staticClass: e._$s(25, "sc", "content-button"),
      style: e._$s(25, "s", {
        backgroundColor: e.primaryColor
      }),
      attrs: {
        _i: 25
      },
      on: {
        click: e.restart
      }
    }) : e._e()]], 2)]), e._$s(26, "i", !e.isMandatory) ? n("image", {
      staticClass: e._$s(26, "sc", "close-img"),
      attrs: {
        src: e._$s(26, "a-src", e.cdn + "/draw/qzwl-close.png"),
        _i: 26
      },
      on: {
        click: function (t) {
          return (t.stopPropagation(), e.closeUpdate(t));
        }
      }
    }) : e._e()])]);
  }, r = [];
})(module, exports, __r);
