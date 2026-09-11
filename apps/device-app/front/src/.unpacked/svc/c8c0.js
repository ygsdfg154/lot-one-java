// webpack 模块 c8c0  [svc]
// 出现于: pagesFunc/app-sub-service.js
const __r = require('./__runtime.js').wrap();
(function (t, e, a) {
  "use strict";
  var n = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = void 0);
  var r = n(require("@/.unpacked/svc/127e.js")), i = n(require("@/.unpacked/svc/ee10.js")), s = n(require("@/.unpacked/svc/7ca3.js")), o = require("vuex"), c = require("../../common/utils.js");
  function u(t, e) {
    var a = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(t);
      (e && (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), a.push.apply(a, n));
    }
    return a;
  }
  function l(t) {
    for (var e = 1; e < arguments.length; e++) {
      var a = null != arguments[e] ? arguments[e] : {};
      e % 2 ? u(Object(a), !0).forEach(function (e) {
        (0, s.default)(t, e, a[e]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : u(Object(a)).forEach(function (e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e));
      });
    }
    return t;
  }
  var d = getApp().globalData, f = {
    computed: l({}, (0, o.mapGetters)(["agreeAudio", "selectedTerminal"])),
    created: function () {
      this.agreeAudio || this.init();
    },
    methods: l(l(l({}, (0, o.mapMutations)("app", ["setAgreeAudio"])), (0, o.mapActions)("audio", ["GetautoStatus"])), {}, {
      l: function (t) {
        return d.$t(t);
      },
      agreeClose: function () {
        return (async function () {
          uni.showToast({
            title: d.$t("audio.unconfirmed-clause"),
            icon: "none"
          });
          await d.$sleep(500);
          uni.navigateBack();
        })();
      },
      agreeConfirm: function () {
        (this.setAgreeAudio(!1), this.init());
      },
      init: function () {
        (this.$emit("fetchData", {
          updateType: 0,
          id: 0,
          refresh: !0
        }), this.getAutoAudioState(), this.$emit("loadTerminalExtend"));
      },
      getAutoAudioState: function () {
        var t = this;
        return (async function () {
          var a, n;
          (a = await t.GetautoStatus({
            deviceId: t.selectedTerminal.id
          }), a.succeeded && (n = 1, a.data.isAuto ? (n = 2, (0, c.qzwlToast)(t.l("audio.terminal-using-voice-control"), "none")) : a.data.isAlways && (n = 3, (0, c.qzwlToast)("\u5f53\u524d\u8bbe\u5907\u6b63\u5728\u6301\u7eed\u58f0\u97f3\u5b89\u9632", "none")), t.$nextTick(function () {
            t.$emit("input", n);
          })));
        })();
      }
    })
  };
  e.default = f;
})(module, exports, __r);
