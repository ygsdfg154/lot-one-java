// webpack 模块 692  [nvue]
// 出现于: pagesFunc/terminal/locate-mode/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), o = a(require("@/.unpacked/nvue/5.js")), s = require("vuex"), d = a(require("../../common/config.nvue.js")), u = require("../../common/utils.nvue.js"), l = a(require("../../components/xMode/xMode.nvue")), _ = a(require("../../components/payPopup/payPopup.nvue"));
    function c(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        (t && (a = a.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), n.push.apply(n, a));
      }
      return n;
    }
    function m(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? c(Object(n), !0).forEach(function (t) {
          (0, o.default)(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : c(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }
      return e;
    }
    var p = getApp().globalData, f = {
      components: {
        xMode: l.default,
        payPopup: _.default
      },
      data: function () {
        return {
          cdn: d.default.cdn,
          runningModelist: [{
            id: 7,
            name: "\u79d2\u5b9a\u6a21\u5f0f",
            text: "\u6b64\u6a21\u5f0f\u4e0b\uff0c\u8bbe\u5907\u6bcf10\u79d2\u4e0a\u62a5\u5b9a\u4f4d\u6570\u636e\uff0c\u5e76\u5f00\u542f\u62d0\u70b9\u8865\u507f\uff0c\u6570\u636e\u4e0a\u62a5\u9891\u7387\u975e\u5e38\u9ad8\uff0c\u53ef\u67e5\u8be2\u8f68\u8ff9\u6570\u636e\u5b8c\u6574",
            disabled: !1,
            value: 7,
            seconds: [10],
            columns: [[p.$t("common.10-s")]],
            mask: "\u672a\u5f00\u901a",
            timeShow: !0
          }, {
            id: 1,
            name: p.$t("locate-mode.intelligent-positioning-mode"),
            text: p.$t("locate-mode.intelligent-positioning-mode.describe"),
            disabled: !1,
            value: 1,
            seconds: [30, 60, 180, 300, 600],
            columns: [[p.$t("common.0.5-min"), p.$t("common.1-min"), p.$t("common.3-min"), p.$t("common.5-min"), p.$t("common.10-min")]]
          }, {
            id: 2,
            name: p.$t("locate-mode.timing-positioning-mode"),
            text: p.$t("locate-mode.timing-positioning-mode.describe"),
            disabled: !1,
            value: 2,
            seconds: [30, 60, 180, 300, 600],
            columns: [[p.$t("common.0.5-min"), p.$t("common.1-min"), p.$t("common.3-min"), p.$t("common.5-min"), p.$t("common.10-min")]]
          }, {
            id: 3,
            name: p.$t("locate-mode.power-saving-mode"),
            text: p.$t("locate-mode.power-saving-mode.describe"),
            disabled: !1,
            value: 3,
            seconds: [1800, 3600, 10800, 21600],
            columns: [[p.$t("common.0.5-hour-new"), p.$t("common.1-hour-new"), p.$t("common.3-hour-new"), p.$t("common.6-hour-new")]]
          }, {
            id: 4,
            name: p.$t("locate-mode.power-trace-mode"),
            text: p.$t("locate-mode.power-trace-mode.describe"),
            disabled: !1,
            value: 2,
            seconds: [30, 60, 180, 300, 600],
            columns: [[p.$t("common.0.5-min"), p.$t("common.1-min"), p.$t("common.3-min"), p.$t("common.5-min"), p.$t("common.10-min")]]
          }, {
            id: 8,
            name: p.$t("locate-mode.timing-positioning-mode"),
            text: p.$t("locate-mode.timing-positioning-mode.describe"),
            disabled: !1,
            value: 2,
            seconds: [86400],
            columns: [[p.$t("common.1-day")]],
            timeShow: !0
          }, {
            id: 5,
            name: p.$t("locate-mode.power-week-mode"),
            text: p.$t("locate-mode.power-week-mode.describe"),
            disabled: !1,
            value: 5,
            weekList: [{
              name: "\u661f\u671f\u4e00",
              value: 1,
              iconShow: !1
            }, {
              name: "\u661f\u671f\u4e8c",
              value: 2,
              iconShow: !1
            }, {
              name: "\u661f\u671f\u4e09",
              value: 3,
              iconShow: !1
            }, {
              name: "\u661f\u671f\u56db",
              value: 4,
              iconShow: !1
            }, {
              name: "\u661f\u671f\u4e94",
              value: 5,
              iconShow: !1
            }, {
              name: "\u661f\u671f\u516d",
              value: 6,
              iconShow: !1
            }, {
              name: "\u661f\u671f\u4e03",
              value: 7,
              iconShow: !1
            }],
            selectedAppointTimeName: ""
          }, {
            id: 6,
            name: p.$t("locate-mode.power-alarmClock-mode"),
            text: p.$t("locate-mode.power-alarmClock-mode.describe"),
            disabled: !1,
            value: 6,
            alarmClockList: [{
              name: "\u4e00",
              value: ""
            }, {
              name: "\u4e8c",
              value: ""
            }, {
              name: "\u4e09",
              value: ""
            }, {
              name: "\u56db",
              value: ""
            }]
          }, {
            id: 11,
            name: "\u79d2\u5b9a\u6a21\u5f0f",
            text: "\u8bbe\u5907\u6bcf\u9694 30\u79d2 \u4e0a\u62a5\u4e00\u6b21\u5b9a\u4f4d\u4fe1\u606f\uff0c\u6570\u636e\u4e0a\u4f20\u9891\u7387\u9ad8\uff0c\u4f18\u70b9\u662f\u56de\u653e\u8f68\u8ff9\u65f6\uff0c\u8f68\u8ff9\u7ebf\u6bb5\u5b8c\u6574\uff0c\u53ef\u67e5\u8be2\u8f68\u8ff9\u6570\u636e\u66f4\u591a\uff0c\u66f4\u5168",
            disabled: !1,
            value: 1,
            timeShow: !0
          }, {
            id: 12,
            name: "\u666e\u901a\u6a21\u5f0f",
            text: "\u8bbe\u5907\u6bcf\u9694 3\u5206\u949f \u4e0a\u62a5\u4e00\u6b21\u5b9a\u4f4d\u4fe1\u606f\uff0c\u6570\u636e\u4e0a\u4f20\u9891\u7387\u9002\u4e2d\uff0c\u8f68\u8ff9\u6bd4\u8f83\u5b8c\u6574",
            disabled: !1,
            value: 2,
            timeShow: !0
          }, {
            id: 13,
            name: "\u6253\u70b9\u6a21\u5f0f",
            text: "\u8bbe\u5907\u6bcf\u9694 1\u5c0f\u65f6 \u4e0a\u62a5\u4e00\u6b21\u5b9a\u4f4d\u4fe1\u606f\uff0c\u6570\u636e\u4e0a\u4f20\u9891\u7387\u4f4e\u53ea\u80fd\u770b\u5230\u5c11\u91cf\u7684\u4f4d\u7f6e\u70b9\uff0c\u53ef\u67e5\u8be2\u8f68\u8ff9\u6570\u636e\u4e5f\u5f88\u5c11\uff0c\u8f68\u8ff9\u6210\u70b9\u72b6\u5206\u5e03",
            disabled: !1,
            value: 3,
            timeShow: !0
          }, {
            id: 14,
            name: "\u5f85\u673a\u6a21\u5f0f",
            text: "\u8bbe\u5907\u4e0d\u4e3b\u52a8\u4e0a\u62a5\u4f4d\u7f6e\uff0c\u4e0e\u5e73\u53f0\u4fdd\u6301\u6b63\u5e38\u5fc3\u8df3\uff0c\u5e73\u53f0\u53ef\u4e3b\u52a8\u5b9a\u4f4d",
            disabled: !1,
            value: 4,
            timeShow: !0
          }, {
            id: 15,
            name: "\u5feb\u901f\u5b9a\u4f4d\u6a21\u5f0f",
            text: "\u6b64\u5b9a\u4f4d\u6a21\u5f0f\u4e0b\uff0c\u8bbe\u5907\u6bcf\u9694 10\u79d2\u949f \u4e0a\u62a5\u4e00\u6b21\u5b9a\u4f4d\u4fe1\u606f\uff0c\u6570\u636e\u4e0a\u4f20\u9891\u7387\u9ad8\uff0c\u8f68\u8ff9\u5b8c\u6574",
            disabled: !1,
            value: 11,
            seconds: [10],
            columns: [["10\u79d2"]],
            timeShow: !0
          }],
          currentRunningMode: 0,
          prioritylist: [{
            value: 1,
            name: p.$t("locate-mode.WIFI-location-priority"),
            text: p.$t("locate-mode.WIFI-location-priority.describe"),
            disabled: !1
          }, {
            value: 2,
            name: p.$t("locate-mode.GPS-location-priority"),
            text: p.$t("locate-mode.GPS-location-priority.describe"),
            disabled: !1
          }],
          currentPriority: 0,
          timePickerShow: !1,
          interval: 0,
          weekPopupShow: !1,
          datePickerShow: !1,
          alarmClockIndex: null,
          dateValue: "",
          locationVip: !1,
          vipPopupShow: !1,
          vipPopupData: null,
          vipPopupUrl: ""
        };
      },
      onShow: function () {
        (this.getDeviceMode(), this.getDeviceVipTypeList());
      },
      computed: m(m({}, (0, s.mapGetters)(["selectedTerminal"])), {}, {
        isPriority: function () {
          var t = this.isTA900, n = "JS-Q1" == this.selectedTerminal.terminalTypeDisplayName, a = "SK1" == this.selectedTerminal.terminalTypeDisplayName;
          return (e("log", t, n, a, "sk1", " at pagesFunc/terminal/locate-mode/index.nvue:357"), t || n || a);
        },
        isTA900: function () {
          return d.default.ta900.includes(this.selectedTerminal.terminalTypeDisplayName);
        },
        isSK11OrSK11: function () {
          return "SK1" == this.selectedTerminal.terminalTypeDisplayName || "SK11" == this.selectedTerminal.terminalTypeDisplayName;
        },
        weekDailyAlarmsMode: function () {
          var e = !1;
          return (5 != this.currentRunningMode && 6 != this.currentRunningMode && "JS-Q1" != this.selectedTerminal.terminalTypeDisplayName && (e = !0), e);
        },
        currentRunningModelist: function () {
          var e = this, t = !!this.selectedTerminal && this.selectedTerminal.enablePositionMode, n = this.runningModelist.filter(function (t) {
            return e.isTA900 ? !![4, 5, 6].find(function (e) {
              return e == t.id;
            }) : d.default.tm200.includes(e.selectedTerminal.terminalTypeDisplayName) ? !![1, 7].find(function (e) {
              return e == t.id;
            }) : "P1" == e.selectedTerminal.terminalTypeDisplayName ? !![8].find(function (e) {
              return e == t.id;
            }) : "JS-Q1" == e.selectedTerminal.terminalTypeDisplayName ? !![11, 12, 13, 14].find(function (e) {
              return e == t.id;
            }) : e.isSK11OrSK11 ? !![15].find(function (e) {
              return e == t.id;
            }) : !![1, 2, 7].find(function (e) {
              return e == t.id;
            });
          });
          return n = n.filter(function (e) {
            return t ? e : 7 != e.id;
          });
        },
        selectedRunningMode: function () {
          var e = this;
          if (this.currentRunningModelist && this.currentRunningMode) return this.currentRunningModelist.find(function (t) {
            return t.value == e.currentRunningMode;
          });
        },
        currentTimePickerInfo: function () {
          if (this.selectedRunningMode) {
            if (this.weekDailyAlarmsMode) {
              var e = this.selectedRunningMode.seconds.indexOf(this.interval);
              return (-1 == e && (e = 0), this.interval = this.selectedRunningMode.seconds[e], [this.selectedRunningMode.columns[0][e], [e]]);
            }
            if (5 == this.selectedRunningMode.value) return [this.selectedRunningMode.weekList, this.selectedRunningMode.selectedAppointTimeName];
            if (6 == this.selectedRunningMode.value) return [this.selectedRunningMode.alarmClockList];
          }
        }
      }),
      methods: m(m(m({}, (0, s.mapActions)("remoteSet", ["SetTerminalParams", "GetTerminalParams"])), (0, s.mapActions)("packageInfo", ["GetDeviceVipTypeList"])), {}, {
        l: function (e) {
          return p.$t(e);
        },
        getDeviceVipTypeList: function () {
          var e = this;
          return (async function () {
            var n;
            (n = await e.GetDeviceVipTypeList({
              terminalId: e.selectedTerminal.id,
              type: 3
            })).succeeded && n.data && new Date(n.data.expirationTime) > new Date() && (e.locationVip = !0);
          })();
        },
        getDeviceMode: function () {
          var t = this;
          return (0, i.default)(r.default.mark(function n() {
            var a, i, o, s, d, l;
            return r.default.wrap(function (n) {
              for (; ; ) switch (n.prev = n.next) {
                case 0:
                  return (n.next = 2, t.GetTerminalParams({
                    terminalId: t.selectedTerminal.id
                  }));
                case 2:
                  if ((a = n.sent).succeeded) {
                    n.next = 6;
                    break;
                  }
                  return ((0, u.qzwlToast)(a.msg, "none"), n.abrupt("return"));
                case 6:
                  (i = a.data.find(function (e) {
                    return "ChangeMode" === e.FieldName;
                  }), o = i.FieldList, e("log", o, "selectMode", " at pagesFunc/terminal/locate-mode/index.nvue:500"), t.currentRunningMode = o[0].Value, "JS-Q1" != t.selectedTerminal.terminalTypeDisplayName && (t.interval = o[1].Value), 1 == t.currentRunningMode && 10 == t.interval && (t.currentRunningMode = 7), t.weekDailyAlarmsMode && "JS-Q1" != t.selectedTerminal.terminalTypeDisplayName && (s = a.data.find(function (e) {
                    return "GPSPriority" === e.FieldName;
                  }), t.currentPriority = s.Value), 5 == t.currentRunningMode && (d = o.find(function (e) {
                    return "UpDate" == e.FieldName;
                  }).Value, t.runningModelist = t.runningModelist.map(function (e) {
                    return (5 == e.id && (e.selectedAppointTimeName = o.find(function (e) {
                      return "StartTime" == e.FieldName;
                    }).Value.slice(0, 5), e.weekList = e.weekList.map(function (e) {
                      return (d.forEach(function (t) {
                        t == e.value && (e.iconShow = !0);
                      }), e);
                    })), e);
                  })), 6 == t.currentRunningMode && (l = o.find(function (e) {
                    return "UpTimeList" == e.FieldName;
                  }).Value, t.runningModelist = t.runningModelist.map(function (e) {
                    return (6 == e.id && (e.alarmClockList = e.alarmClockList.map(function (e, t) {
                      return (l.forEach(function (n, a) {
                        a == t && (e.value = n.slice(0, 5));
                      }), e);
                    })), e);
                  })));
                case 15:
                case "end":
                  return n.stop();
              }
            }, n);
          }))();
        },
        confirmPickerTime: function (e) {
          (this.timePickerShow = !1, this.interval = this.selectedRunningMode.seconds[e.indexs[0]]);
        },
        openPickerShow: function (e) {
          (this[e[0]] = !0, e[1] || 0 == e[1] ? this.alarmClockIndex = e[1] : this.alarmClockIndex = null);
        },
        confirmPickerDate: function (e) {
          var t = this;
          (this.runningModelist = this.runningModelist.map(function (n) {
            return (5 == n.value && 5 == t.currentRunningMode && (n.selectedAppointTimeName = e.value), 6 == n.value && 6 == t.currentRunningMode && (n.alarmClockList[t.alarmClockIndex].value = e.value), n);
          }), this.datePickerShow = !1);
        },
        clearPickerDate: function (t) {
          var n = this;
          (e("log", "index", t, " at pagesFunc/terminal/locate-mode/index.nvue:590"), this.runningModelist = this.runningModelist.map(function (e) {
            return (6 == e.value && 6 == n.currentRunningMode && (e.alarmClockList[t].value = ""), e);
          }));
        },
        weekSelect: function (e) {
          this.runningModelist = this.runningModelist.map(function (t) {
            return (5 == t.id && (t.weekList = t.weekList.map(function (n) {
              return (n.value == e.value && (n.iconShow = !t.iconShow), n);
            })), t);
          });
        },
        closeVipPopup: function () {
          this.vipPopupShow = !1;
        },
        changeRunningMode: function (e) {
          if (7 == e && !this.locationVip) return (this.vipPopupData = {
            title: "\u79d2\u5b9a\u6a21\u5f0f\u5145\u503c",
            content: "\u5f53\u524d\u8bbe\u5907\u672a\u5f00\u901a\u79d2\u5b9a\u6a21\u5f0f\u670d\u52a1\u6216\u5df2\u5230\u671f\uff0c\u662f\u5426\u524d\u5f80\u5145\u503c",
            description: "1. \u9650\u65f6\u79d2\u901f\u5b9a\u4f4d\u529f\u80fd\u4f7f\u7528\u6743\u9650\n2. 7*16\u5c0f\u65f6\u8fdc\u7a0b\u6280\u672f\u670d\u52a1\u652f\u6301\u4fdd\u969c\n3. \u7ec8\u8eab\u552e\u540e\u670d\u52a1\uff0c1\u5bf91\u5168\u7a0b\u670d\u52a1\n4. \u66f4\u591aAPP\u521b\u65b0\u529f\u80fd\u62a2\u5148\u514d\u8d39\u4f53\u9a8c"
          }, this.vipPopupUrl = "/pagesPay/value-added/index?type=2", void (this.vipPopupShow = !0));
          this.currentRunningMode = e;
        },
        savaSubmit: function () {
          var t = this;
          return (0, i.default)(r.default.mark(function n() {
            var a, i, o, s, d;
            return r.default.wrap(function (n) {
              for (; ; ) switch (n.prev = n.next) {
                case 0:
                  if ((a = 7 == t.currentRunningMode ? 1 : t.currentRunningMode, t.weekDailyAlarmsMode && "JS-Q1" != t.selectedTerminal.terminalTypeDisplayName && (i = {
                    deviceId: t.selectedTerminal.id,
                    param: [{
                      name: "ChangeMode",
                      value: {
                        runningMode: a,
                        Interval: t.interval
                      }
                    }, {
                      name: "GPSPriority",
                      value: t.currentPriority
                    }]
                  }), "SK1" == t.selectedTerminal.terminalTypeDisplayName && (i = {
                    deviceId: t.selectedTerminal.id,
                    param: [{
                      name: "ChangeMode",
                      value: {
                        runningMode: a,
                        Interval: t.interval
                      }
                    }]
                  }), "JS-Q1" === t.selectedTerminal.terminalTypeDisplayName && (o = 1 == a ? {
                    runningMode: a,
                    Interval: 30
                  } : {
                    runningMode: a
                  }, i = {
                    deviceId: t.selectedTerminal.id,
                    param: [{
                      name: "ChangeMode",
                      value: o
                    }],
                    sendDirectly: 1
                  }), 5 != a)) {
                    n.next = 9;
                    break;
                  }
                  if ((s = t.selectedRunningMode.weekList.filter(function (e) {
                    return e.iconShow;
                  }).map(function (e) {
                    return e.value;
                  }), t.selectedRunningMode.selectedAppointTimeName && s.length)) {
                    n.next = 8;
                    break;
                  }
                  return n.abrupt("return", (0, u.qzwlToast)(t.l("common.switch-mode-week-toast"), "none"));
                case 8:
                  i = {
                    deviceId: t.selectedTerminal.id,
                    param: [{
                      name: "ChangeMode",
                      value: {
                        runningMode: a,
                        StartTime: t.selectedRunningMode.selectedAppointTimeName,
                        UpDate: s
                      }
                    }, {
                      name: "GPSPriority",
                      value: 1
                    }]
                  };
                case 9:
                  if (6 != a) {
                    n.next = 14;
                    break;
                  }
                  if ((d = t.selectedRunningMode.alarmClockList.filter(function (e) {
                    return e.value;
                  }).map(function (e) {
                    return e.value;
                  })).length) {
                    n.next = 13;
                    break;
                  }
                  return n.abrupt("return", (0, u.qzwlToast)(t.l("common.switch-mode-alarmClock-toast"), "none"));
                case 13:
                  i = {
                    deviceId: t.selectedTerminal.id,
                    param: [{
                      name: "ChangeMode",
                      value: {
                        runningMode: a,
                        UpTimeList: d
                      }
                    }, {
                      name: "GPSPriority",
                      value: 1
                    }]
                  };
                case 14:
                  return (e("log", i, "data", " at pagesFunc/terminal/locate-mode/index.nvue:727"), n.next = 17, t.SetTerminalParams(i));
                case 17:
                  n.sent.succeeded && (0, u.qzwlToast)(t.l("common.switch.mode"), "none");
                case 19:
                case "end":
                  return n.stop();
              }
            }, n);
          }))();
        }
      })
    };
    t.default = f;
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
