// webpack 模块 577  [nvue]
// 出现于: pages/home/home.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = r(require("@/.unpacked/nvue/1.js")), i = r(require("@/.unpacked/nvue/940.js")), o = {
    name: "u-swiper",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, i.default],
    data: function () {
      return {
        currentIndex: 0
      };
    },
    watch: {
      current: function (e, t) {
        e !== t && (this.currentIndex = e);
      }
    },
    computed: {
      itemStyle: function () {
        return function (e) {
          return {};
        };
      }
    },
    methods: {
      getItemType: function (e) {
        return "string" == typeof e ? uni.$u.test.video(this.getSource(e)) ? "video" : "image" : "object" === (0, a.default)(e) && this.keyName ? e.type ? "image" === e.type ? "image" : "video" === e.type ? "video" : "image" : uni.$u.test.video(this.getSource(e)) ? "video" : "image" : void 0;
      },
      getSource: function (e) {
        return "string" == typeof e ? e : "object" === (0, a.default)(e) && this.keyName ? e[this.keyName] : (uni.$u.error("\u8bf7\u6309\u683c\u5f0f\u4f20\u9012\u5217\u8868\u53c2\u6570"), "");
      },
      change: function (e) {
        var t = e.detail.current;
        (this.pauseVideo(this.currentIndex), this.currentIndex = t, this.$emit("change", e.detail));
      },
      pauseVideo: function (e) {
        var t = this.getSource(this.list[e]);
        uni.$u.test.video(t) && uni.createVideoContext(("video-").concat(e), this).pause();
      },
      getPoster: function (e) {
        return "object" === (0, a.default)(e) && e.poster ? e.poster : "";
      },
      clickHandler: function (e) {
        this.$emit("click", e);
      }
    }
  };
  t.default = o;
})(module, exports, __r);
