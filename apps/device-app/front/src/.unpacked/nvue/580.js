// webpack 模块 580  [nvue]
// 出现于: pages/home/home.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = r(require("@/.unpacked/nvue/22.js")), i = r(require("@/.unpacked/nvue/23.js")), o = r(require("@/.unpacked/nvue/5.js")), s = require("vuex");
  function d(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      (t && (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, r));
    }
    return n;
  }
  function u(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? d(Object(n), !0).forEach(function (t) {
        (0, o.default)(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : d(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  var l = {
    data: function () {
      return {};
    },
    computed: u(u({}, (0, s.mapGetters)(["advertisingContent", "advertisingState"])), {}, {
      advertisingList: function () {
        return this.advertisingContent.map(function (e) {
          return e.mediaUrl;
        });
      }
    }),
    methods: u(u(u({}, (0, s.mapMutations)("app", ["setAdvertisingState"])), (0, s.mapActions)("app", ["ClickAd"])), {}, {
      closeAdvertising: function () {
        this.setAdvertisingState(!1);
      },
      clickAdvertising: function (e) {
        var t = this;
        return (async function () {
          await t.ClickAd({
            id: t.advertisingContent[e].id
          });
          uni.navigateTo({
            url: ("/pagesCore/webframe?url=").concat(t.advertisingContent[e].linkUrl)
          });
        })();
      }
    })
  };
  t.default = l;
})(module, exports, __r);
