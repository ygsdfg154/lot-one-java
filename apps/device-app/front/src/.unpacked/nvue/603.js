// webpack 模块 603  [nvue]
// 出现于: pagesMore/message/statement.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), s = a(require("@/.unpacked/nvue/5.js")), o = require("vuex"), d = a(require("../../common/config.nvue.js"));
  require("../../common/utils.nvue.js");
  function _(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(e);
      (t && (a = a.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, a));
    }
    return n;
  }
  function u(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? _(Object(n), !0).forEach(function (t) {
        (0, s.default)(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : _(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  var l = {
    data: function () {
      return {
        cdn: d.default.cdn,
        titleColor: d.default.titleColor,
        primaryColor: d.default.primaryColor,
        scale: d.default.defaultScale,
        markers: [],
        longitude: 116.4,
        latitude: 39.91,
        alarmId: 0,
        alarmInfo: null
      };
    },
    computed: u(u({}, (0, o.mapGetters)(["sysInfo", "selectedTerminal", "appConfig"])), {}, {
      headTitle: function () {
        return this.alarmInfo ? this.alarmInfo.alarmTypeName : "\u544a\u8b66\u8be6\u60c5";
      }
    }),
    onLoad: function (e) {
      if ((e.id && (this.alarmId = e.id, this.fetchData()), e.data)) {
        var t = JSON.parse(e.data);
        this.pushInit(t);
      }
    },
    methods: u(u(u({}, (0, o.mapActions)("alarmLog", ["GetAlarmDetail"])), (0, o.mapActions)("device", ["GetGeocode"])), {}, {
      gotoPages: function (e) {
        uni.navigateBack();
      },
      fetchData: function () {
        var e = this;
        return (async function () {
          var n;
          (n = await e.GetAlarmDetail({
            alarmId: e.alarmId
          })).succeeded && (e.alarmInfo = n.data, e.longitude = e.alarmInfo.beginLng || 116.4, e.latitude = e.alarmInfo.beginLat || 39.91, e.setMarker());
        })();
      },
      pushInit: function (e) {
        (this.longitude = e.coordinate[0] || 116.4, this.latitude = e.coordinate[1] || 39.91, this.alarmInfo = {
          beginLng: e.coordinate[0],
          beginLat: e.coordinate[1],
          beginTime: e.beginTime,
          terminalNo: e.terminalNo,
          alarmTypeName: e.title,
          beginLngWGS84: e.beginLngWGS84,
          beginLatWGS84: e.beginLatWGS84
        }, this.setMarker());
      },
      setMarker: function () {
        var e = this;
        return (0, i.default)(r.default.mark(function t() {
          var n, a, i, s;
          return r.default.wrap(function (t) {
            for (; ; ) switch (t.prev = t.next) {
              case 0:
                if (!e.alarmInfo.beginLng || !e.alarmInfo.beginLat) {
                  t.next = 10;
                  break;
                }
                return (t.next = 3, e.GetGeocode({
                  longitude: e.alarmInfo.beginLngWGS84,
                  latitude: e.alarmInfo.beginLatWGS84
                }));
              case 3:
                return (t.next = 5, t.sent);
              case 5:
                (a = t.sent, (n = a.succeeded ? a.address : "") && ((i = n.split("")).splice(18, 0, "\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"), n = i.join("")), s = {
                  content: ("\u8bbe\u5907\u53f7:\xa0").concat(e.alarmInfo.terminalNo, "\n\u544a\u8b66\u5f00\u59cb\u65f6\u95f4:\xa0").concat(e.alarmInfo.beginTime).concat(e.alarmInfo.endTime ? "\n\u544a\u8b66\u7ed3\u675f\u65f6\u95f4:\xa0" + e.alarmInfo.endTime : "", "\n\u544a\u8b66\u5730\u5740:\xa0").concat(n),
                  display: "ALWAYS",
                  color: "#333",
                  bgColor: "#fff",
                  textAlign: "left",
                  padding: 8,
                  borderRadius: 10,
                  fontSize: 13
                }, e.markers = [{
                  id: 0,
                  longitude: e.alarmInfo.beginLng,
                  latitude: e.alarmInfo.beginLat,
                  width: 30,
                  height: 30,
                  anchor: {
                    x: .5,
                    y: .5
                  },
                  iconPath: e.cdn + "/ikon/qzwl-msg-notice@2x.png",
                  callout: s
                }]);
              case 10:
              case "end":
                return t.stop();
            }
          }, t);
        }))();
      }
    })
  };
  t.default = l;
})(module, exports, __r);
