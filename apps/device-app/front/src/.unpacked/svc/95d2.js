// webpack 模块 95d2  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = getApp().globalData, r = {
    name: "u-calendar-header",
    mixins: [uni.$u.mpMixin, uni.$u.mixin],
    props: {
      title: {
        type: String,
        default: ""
      },
      subtitle: {
        type: String,
        default: ""
      },
      showTitle: {
        type: Boolean,
        default: !0
      },
      showSubtitle: {
        type: Boolean,
        default: !0
      }
    },
    data: function () {
      return {};
    },
    methods: {
      name: function () {},
      l: function (e) {
        return a.$t(e);
      }
    }
  };
  t.default = r;
})(module, exports, __r);
