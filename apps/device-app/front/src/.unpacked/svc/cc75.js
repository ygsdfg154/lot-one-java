// webpack 模块 cc75  [svc]
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
    uLoadmore: require("uview-ui/components/u-loadmore/u-loadmore.vue").default,
    uEmpty: require("uview-ui/components/u-empty/u-empty.vue").default
  }, r = function () {
    var t = this, e = t.$createElement, a = t._self._c || e;
    return a("view", [a("calendarFrame", {
      attrs: {
        currentDate: t.currentDate,
        param: t.param,
        name: "audio",
        _i: 1
      },
      on: {
        "update:currentDate": function (e) {
          t.currentDate = e;
        },
        "update:current-date": function (e) {
          t.currentDate = e;
        },
        fetchData: t.fetchData
      }
    }), a("audioAgree", {
      attrs: {
        _i: 2
      },
      on: {
        fetchData: t.fetchData,
        loadTerminalExtend: t.loadTerminalExtend
      },
      model: {
        value: t._$s(2, "v-model", t.isRecordIng),
        callback: function (e) {
          t.isRecordIng = e;
        },
        expression: "isRecordIng"
      }
    }), t._$s(3, "i", !t.agreeAudio) ? a("view", {
      staticClass: t._$s(3, "sc", "page p-b-xl"),
      attrs: {
        _i: 3
      }
    }, [a("view", {
      staticClass: t._$s(4, "sc", "flex-col p-l-xl"),
      attrs: {
        _i: 4
      }
    }, [t._l(t._$s(5, "f", {
      forItems: t.audioList
    }), function (e, n, r, i) {
      return a("view", {
        key: t._$s(5, "f", {
          forIndex: r,
          key: e.id
        }),
        staticClass: t._$s("5-" + i, "sc", "flex-col m-v-lg"),
        attrs: {
          _i: "5-" + i
        }
      }, [a("view", {
        staticClass: t._$s("6-" + i, "sc", "flex-row justify-center"),
        attrs: {
          _i: "6-" + i
        }
      }, [a("text", {
        staticClass: t._$s("7-" + i, "sc", "text-sm text-grey"),
        attrs: {
          _i: "7-" + i
        }
      }, [t._v(t._$s("7-" + i, "t0-0", t._s(e.createTime)))])]), a("view", {
        staticClass: t._$s("8-" + i, "sc", "flex-row m-t-lg items-center"),
        attrs: {
          _i: "8-" + i
        },
        on: {
          longpress: function (a) {
            return t.longpressAudio(e);
          }
        }
      }, [a("image", {
        staticClass: t._$s("9-" + i, "sc", "m-r-lg"),
        attrs: {
          src: t._$s("9-" + i, "a-src", t.cdn + "/ikon/qzwl-voice-lu.png"),
          _i: "9-" + i
        }
      }), a("view", {
        staticClass: t._$s("10-" + i, "sc", "flex-row bg-primary p-v-sm p-l-lg br-xxl"),
        style: t._$s("10-" + i, "s", {
          width: "312rpx"
        }),
        attrs: {
          _i: "10-" + i
        },
        on: {
          click: function (a) {
            return t.audioPlay(e);
          }
        }
      }, [a("image", {
        style: t._$s("11-" + i, "s", {
          width: "48rpx",
          height: "48rpx"
        }),
        attrs: {
          src: t._$s("11-" + i, "a-src", t.cdn + "/ikon/voice-" + e.iconShow + ".png"),
          _i: "11-" + i
        }
      })]), t._$s("12-" + i, "i", !e.isRead) ? a("view", {
        staticClass: t._$s("12-" + i, "sc", "m-l audioRead"),
        attrs: {
          _i: "12-" + i
        }
      }) : t._e()])]);
    }), t._$s(13, "i", t.audioList.length) ? a("u-loadmore", {
      attrs: {
        status: t.status,
        line: !0,
        "loadmore-text": t.l("common.load.more"),
        "loading-text": t.l("common.loading"),
        "nomore-text": t.l("common.no.more"),
        _i: 13
      }
    }) : t._e(), t._$s(14, "i", !t.audioList.length) ? a("u-empty", {
      attrs: {
        text: t.l("common.no.audio"),
        icon: t.cdn + "/draw/qzwl-empty.png",
        _i: 14
      }
    }) : t._e()], 2), a("audioBut", {
      attrs: {
        recordVipLimit: t.recordVipLimit,
        _i: 15
      },
      on: {
        recover: t.recover
      },
      model: {
        value: t._$s(15, "v-model", t.isRecordIng),
        callback: function (e) {
          t.isRecordIng = e;
        },
        expression: "isRecordIng"
      }
    })], 1) : t._e()], 1);
  }, i = [];
})(module, exports, __r);
