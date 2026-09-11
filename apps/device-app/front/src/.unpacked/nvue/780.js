// webpack 模块 780  [nvue]
// 出现于: pagesFunc/terminal/alerts-set/index.js
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
    uCellGroup: require("uview-ui/components/u-cell-group/u-cell-group.vue").default,
    uCell: require("uview-ui/components/u-cell/u-cell.vue").default,
    uSwitch: require("uview-ui/components/u-switch/u-switch.vue").default,
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("scroll-view", {
      staticStyle: {
        flexDirection: "column"
      },
      attrs: {
        scrollY: !0,
        showScrollbar: !0,
        enableBackToTop: !0,
        bubble: "true"
      }
    }, [n("view", {
      staticClass: ["p-t-xl", "bg-white", "m-b-xl"]
    }, [n("view", {
      staticClass: ["flex-col"]
    }, [e.pushState ? n("u-text", {
      staticClass: ["text-md", "text-bold", "m-b", "m-l-xl"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("alarm.setup.msg.push")))]) : e._e(), e.pushState ? n("u-cell-group", {
      staticStyle: {
        marginBottom: "48rpx"
      }
    }, [n("view", {}, [e.showPushAlarm ? n("u-cell", {
      staticClass: ["flex-col", "justify-between"]
    }, [n("view", {
      staticClass: ["flex-row", "justify-between"],
      attrs: {
        slot: "title"
      },
      slot: "title"
    }, [n("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("alarm.setup.app.push")))]), n("u-switch", {
      attrs: {
        loading: e.loadingList.push,
        activeColor: e.primaryColor
      },
      on: {
        change: e.setPushOn
      },
      model: {
        value: e.stateOnList.push,
        callback: function (t) {
          e.$set(e.stateOnList, "push", t);
        },
        expression: "stateOnList.push"
      }
    })], 1)]) : e._e()], 1), n("view", {}, [e.showWechatAlarm ? n("u-cell", {
      staticClass: ["flex-col", "justify-between"]
    }, [n("view", {
      staticClass: ["flex-col"],
      attrs: {
        slot: "title"
      },
      slot: "title"
    }, [n("view", {
      staticClass: ["flex-row", "justify-between"]
    }, [n("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("alarm.setup.wx.push")))]), n("u-switch", {
      attrs: {
        loading: e.loadingList.wechat,
        activeColor: e.primaryColor
      },
      on: {
        change: e.changeWechatOn
      },
      model: {
        value: e.stateOnList.wechat,
        callback: function (t) {
          e.$set(e.stateOnList, "wechat", t);
        },
        expression: "stateOnList.wechat"
      }
    })], 1), e.wechatTextOn ? n("view", {
      staticClass: ["flex-row", "justify-between"],
      staticStyle: {
        marginTop: "40rpx"
      },
      on: {
        click: function (t) {
          e.gotoPage("/pagesFunc/terminal/alerts-set/wx?wechatImgurl=" + e.wechatHeadimgurl + "&wechatName=" + e.wechatNickname + "&wechatId=" + e.id);
        }
      }
    }, [n("u-text", {
      staticClass: ["text", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("alarm.setup.wx.account")))]), n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("u-text", {
      staticClass: ["text", "text-grey"],
      staticStyle: {
        marginRight: "5rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.wechatNickname))]), n("u-icon", {
      attrs: {
        name: "arrow-right",
        color: "#999999"
      }
    })], 1)]) : e._e()])]) : e._e()], 1), n("view", {}, [e.showTelAlarm ? n("u-cell", {
      staticClass: ["flex-col", "justify-between"]
    }, [n("view", {
      staticClass: ["flex-col"],
      attrs: {
        slot: "title"
      },
      slot: "title"
    }, [n("view", {
      staticClass: ["flex-row", "justify-between"]
    }, [n("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("alarm.setup.tel.notice")))]), n("u-switch", {
      attrs: {
        loading: e.loadingList.tel,
        activeColor: e.primaryColor
      },
      on: {
        change: e.setTelAlarmNotice
      },
      model: {
        value: e.stateOnList.tel,
        callback: function (t) {
          e.$set(e.stateOnList, "tel", t);
        },
        expression: "stateOnList.tel"
      }
    })], 1), e.stateOnList.tel ? n("view", {
      staticClass: ["flex-row", "justify-between"],
      staticStyle: {
        marginTop: "40rpx"
      },
      on: {
        click: function (t) {
          e.gotoPage("/pagesFunc/terminal/alerts-set/phone");
        }
      }
    }, [n("u-text", {
      staticClass: ["text", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("alarm.setup.tel.setting")))]), n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("u-text", {
      staticClass: ["text", "text-grey"],
      staticStyle: {
        marginRight: "5rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s("" + e.l("alarm.setup.soudn.setting") + e.telSum + e.l("alarm.setup.number")))]), n("u-icon", {
      attrs: {
        name: "arrow-right",
        color: "#999999"
      }
    })], 1)]) : e._e()])]) : e._e()], 1), n("view", {}, [e.showSmsAlarm ? n("u-cell", {
      staticClass: ["flex-col", "justify-between"]
    }, [n("view", {
      staticClass: ["flex-col"],
      attrs: {
        slot: "title"
      },
      slot: "title"
    }, [n("view", {
      staticClass: ["flex-row", "justify-between"]
    }, [n("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("alarm.setup.sms.notice")))]), n("u-switch", {
      attrs: {
        loading: e.loadingList.sms,
        activeColor: e.primaryColor
      },
      on: {
        change: e.setSmsAlarmNotice
      },
      model: {
        value: e.stateOnList.sms,
        callback: function (t) {
          e.$set(e.stateOnList, "sms", t);
        },
        expression: "stateOnList.sms"
      }
    })], 1), e.stateOnList.sms ? n("view", {
      staticClass: ["flex-row", "justify-between"],
      staticStyle: {
        marginTop: "40rpx"
      },
      on: {
        click: function (t) {
          e.gotoPage("/pagesFunc/terminal/alerts-set/messages");
        }
      }
    }, [n("u-text", {
      staticClass: ["text", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("alarm.setup.tel.setting")))]), n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("u-text", {
      staticClass: ["text", "text-grey"],
      staticStyle: {
        marginRight: "5rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s("" + e.l("alarm.setup.soudn.setting") + e.smsSum + e.l("alarm.setup.number")))]), n("u-icon", {
      attrs: {
        name: "arrow-right",
        color: "#999999"
      }
    })], 1)]) : e._e()])]) : e._e()], 1)]) : e._e(), n("u-text", {
      staticClass: ["p-t-xl", "text-md", "text-bold", "m-b", "m-l-xl"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u544a\u8b66\u63a8\u9001\u5f00\u5173")]), n("u-cell-group", [n("view", {}, [e.terminalFuncShow(43) ? n("u-cell", {
      staticClass: ["flex-col", "justify-between"]
    }, [n("view", {
      staticClass: ["flex-row", "justify-between"],
      attrs: {
        slot: "title"
      },
      slot: "title"
    }, [n("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("alarm.setup.vibration")))]), n("u-switch", {
      attrs: {
        loading: e.loadingList.vibration,
        activeColor: e.primaryColor
      },
      on: {
        change: e.vibrationHandler
      },
      model: {
        value: e.stateOnList.vibration,
        callback: function (t) {
          e.$set(e.stateOnList, "vibration", t);
        },
        expression: "stateOnList.vibration"
      }
    })], 1)]) : e._e()], 1), n("view", {}, [e.terminalFuncShow(59) || e.terminalFuncShow(35) ? n("u-cell", {
      staticClass: ["flex-col", "justify-between"]
    }, [n("view", {
      staticClass: ["flex-row", "justify-between"],
      staticStyle: {
        flexDirection: "row"
      },
      attrs: {
        slot: "title"
      },
      slot: "title"
    }, [n("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("alarm.setup.sos-alarm")))]), n("u-switch", {
      attrs: {
        loading: e.loadingList.sos,
        activeColor: e.primaryColor
      },
      on: {
        change: e.sosHandler
      },
      model: {
        value: e.stateOnList.sos,
        callback: function (t) {
          e.$set(e.stateOnList, "sos", t);
        },
        expression: "stateOnList.sos"
      }
    })], 1)]) : e._e()], 1), n("view", {}, [e.terminalFuncShow(45) ? n("u-cell", {
      staticClass: ["flex-col", "justify-between"]
    }, [n("view", {
      staticClass: ["flex-row", "justify-between"],
      attrs: {
        slot: "title"
      },
      slot: "title"
    }, [n("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("alarm.setup.dismantle")))]), n("u-switch", {
      attrs: {
        loading: e.loadingList.dismantle,
        activeColor: e.primaryColor
      },
      on: {
        change: e.dismantleHandler
      },
      model: {
        value: e.stateOnList.dismantle,
        callback: function (t) {
          e.$set(e.stateOnList, "dismantle", t);
        },
        expression: "stateOnList.dismantle"
      }
    })], 1)]) : e._e()], 1), n("view", {}, [e.terminalFuncShow(55) ? n("u-cell", {
      staticClass: ["flex-col", "justify-between"]
    }, [n("view", {
      staticClass: ["flex-row", "justify-between"],
      attrs: {
        slot: "title"
      },
      slot: "title"
    }, [n("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("alarm.setup.battery")))]), n("u-switch", {
      attrs: {
        loading: e.loadingList.battery,
        activeColor: e.primaryColor
      },
      on: {
        change: e.batteryHandler
      },
      model: {
        value: e.stateOnList.battery,
        callback: function (t) {
          e.$set(e.stateOnList, "battery", t);
        },
        expression: "stateOnList.battery"
      }
    })], 1)]) : e._e()], 1), n("view", {}, [e.terminalFuncShow(44) ? n("u-cell", {
      staticClass: ["flex-col", "justify-between"]
    }, [n("view", {
      staticClass: ["flex-row", "justify-between"],
      attrs: {
        slot: "title"
      },
      slot: "title"
    }, [n("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("alarm.setup.speed")))]), n("u-switch", {
      attrs: {
        loading: e.loadingList.speed,
        activeColor: e.primaryColor
      },
      on: {
        change: e.speedHandler
      },
      model: {
        value: e.stateOnList.speed,
        callback: function (t) {
          e.$set(e.stateOnList, "speed", t);
        },
        expression: "stateOnList.speed"
      }
    })], 1)]) : e._e()], 1), n("view", {}, [e.terminalFuncShow(60) ? n("u-cell", {
      staticClass: ["flex-col", "justify-between"]
    }, [n("view", {
      staticClass: ["flex-row", "justify-between"],
      attrs: {
        slot: "title"
      },
      slot: "title"
    }, [n("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("alarm-setup.cut-power")))]), n("u-switch", {
      attrs: {
        loading: e.loadingList.cutPower,
        activeColor: e.primaryColor
      },
      on: {
        change: e.cutPowerHandler
      },
      model: {
        value: e.stateOnList.cutPower,
        callback: function (t) {
          e.$set(e.stateOnList, "cutPower", t);
        },
        expression: "stateOnList.cutPower"
      }
    })], 1)]) : e._e()], 1), n("view", {}, [e.terminalFuncShow(46) ? n("u-cell", {
      staticClass: ["flex-col", "justify-between"]
    }, [n("view", {
      staticClass: ["flex-row", "justify-between"],
      attrs: {
        slot: "title"
      },
      slot: "title"
    }, [n("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("alarm-setup.Voice")))]), n("u-switch", {
      attrs: {
        loading: e.loadingList.voice,
        activeColor: e.primaryColor
      },
      on: {
        change: e.voiceHandler
      },
      model: {
        value: e.stateOnList.voice,
        callback: function (t) {
          e.$set(e.stateOnList, "voice", t);
        },
        expression: "stateOnList.voice"
      }
    })], 1)]) : e._e()], 1), n("view", {}, [e.terminalFuncShow(47) ? n("u-cell", {
      staticClass: ["flex-col", "justify-between"]
    }, [n("view", {
      staticClass: ["flex-row", "justify-between"],
      attrs: {
        slot: "title"
      },
      slot: "title"
    }, [n("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u9759\u6b62\u544a\u8b66")]), n("u-switch", {
      attrs: {
        loading: e.loadingList.rest,
        activeColor: e.primaryColor
      },
      on: {
        change: e.restHandler
      },
      model: {
        value: e.stateOnList.rest,
        callback: function (t) {
          e.$set(e.stateOnList, "rest", t);
        },
        expression: "stateOnList.rest"
      }
    })], 1)]) : e._e()], 1), n("view", {}, [e.terminalFuncShow(65) ? n("u-cell", {
      staticClass: ["flex-col", "justify-between"]
    }, [n("view", {
      staticClass: ["flex-row", "justify-between"],
      attrs: {
        slot: "title"
      },
      slot: "title"
    }, [n("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u79bb\u7ebf\u544a\u8b66")]), n("u-switch", {
      attrs: {
        loading: e.loadingList.offline,
        activeColor: e.primaryColor
      },
      on: {
        change: e.offlineHandler
      },
      model: {
        value: e.stateOnList.offline,
        callback: function (t) {
          e.$set(e.stateOnList, "offline", t);
        },
        expression: "stateOnList.offline"
      }
    })], 1)]) : e._e()], 1), n("view", [e.terminalFuncShow(16) ? n("u-cell", {
      staticClass: ["flex-col", "justify-between"]
    }, [n("view", {
      staticClass: ["flex-row", "justify-between"],
      attrs: {
        slot: "title"
      },
      slot: "title"
    }, [n("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("alarm-setup.fence")))]), n("u-switch", {
      attrs: {
        loading: e.loadingList.fence,
        activeColor: e.primaryColor
      },
      on: {
        change: e.fenceHandler
      },
      model: {
        value: e.stateOnList.fence,
        callback: function (t) {
          e.$set(e.stateOnList, "fence", t);
        },
        expression: "stateOnList.fence"
      }
    })], 1)]) : e._e()], 1)]), n("view", {
      staticClass: ["telText", "text-md", "flex-row", "flex-wrap", "m-l-xl"]
    }, [n("u-text", {
      staticClass: ["text"],
      style: {
        color: "#f56c6b"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("alarm-setup.clue")) + "\uff1a")]), n("u-text", {
      staticClass: ["text-sm", "text-gray"],
      staticStyle: {
        width: "690rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("alarm-setup.clue1")) + e._s(e.appConfig.alarmNotificationInterval || 10) + e._s(e.l("alarm-setup.clue2")))])])], 1)])]);
  }, i = [];
})(module, exports, __r);
