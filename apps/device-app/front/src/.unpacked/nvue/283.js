// webpack 模块 283  [nvue]
// 出现于: pagesCore/login/bind-tel-more.js, pagesCore/login/bind-tel.js, pagesCore/login/find-pas.js, pagesCore/login/logout.js, pagesCore/login/register.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/367.js")), i = {
    name: "u-code",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default],
    data: function () {
      return {
        secNum: this.seconds,
        timer: null,
        canGetCode: !0
      };
    },
    mounted: function () {
      this.checkKeepRunning();
    },
    watch: {
      seconds: {
        immediate: !0,
        handler: function (e) {
          this.secNum = e;
        }
      }
    },
    methods: {
      checkKeepRunning: function () {
        var e = Number(uni.getStorageSync(this.uniqueKey + "_$uCountDownTimestamp"));
        if (!e) return this.changeEvent(this.startText);
        var t = Math.floor(+new Date() / 1e3);
        this.keepRunning && e && e > t ? (this.secNum = e - t, uni.removeStorageSync(this.uniqueKey + "_$uCountDownTimestamp"), this.start()) : this.changeEvent(this.startText);
      },
      start: function () {
        var e = this;
        (this.timer && (clearInterval(this.timer), this.timer = null), this.$emit("start"), this.canGetCode = !1, this.changeEvent(this.changeText.replace(/x|X/, this.secNum)), this.timer = setInterval(function () {
          --e.secNum ? e.changeEvent(e.changeText.replace(/x|X/, e.secNum)) : (clearInterval(e.timer), e.timer = null, e.changeEvent(e.endText), e.secNum = e.seconds, e.$emit("end"), e.canGetCode = !0);
        }, 1e3), this.setTimeToStorage());
      },
      reset: function () {
        (this.canGetCode = !0, clearInterval(this.timer), this.secNum = this.seconds, this.changeEvent(this.endText));
      },
      changeEvent: function (e) {
        this.$emit("change", e);
      },
      setTimeToStorage: function () {
        if (this.keepRunning && this.timer && this.secNum > 0 && this.secNum <= this.seconds) {
          var e = Math.floor(+new Date() / 1e3);
          uni.setStorage({
            key: this.uniqueKey + "_$uCountDownTimestamp",
            data: e + Number(this.secNum)
          });
        }
      }
    },
    beforeDestroy: function () {
      (this.setTimeToStorage(), clearTimeout(this.timer), this.timer = null);
    }
  };
  t.default = i;
})(module, exports, __r);
