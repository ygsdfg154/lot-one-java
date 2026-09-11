// webpack 模块 665  [nvue]
// 出现于: pagesFunc/terminal/list/enterprise.js
const __r = require('./__runtime.js').wrap();
(function (t, e, r) {
  "use strict";
  var o = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = void 0);
  var i = o(require("@/.unpacked/nvue/5.js"));
  function n(t, e) {
    var r = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(t);
      (e && (o = o.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), r.push.apply(r, o));
    }
    return r;
  }
  function a(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = null != arguments[e] ? arguments[e] : {};
      e % 2 ? n(Object(r), !0).forEach(function (e) {
        (0, i.default)(t, e, r[e]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : n(Object(r)).forEach(function (e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
      });
    }
    return t;
  }
  var c = {
    name: "Tree",
    props: ["enterpriseList"],
    methods: a(a({}, (0, require("vuex").mapMutations)("account", ["setEnterpriseId", "setRefreshTerminalPage"])), {}, {
      setIconState: function (t) {
        this.$emit("updateStateById", {
          list: this.enterpriseList,
          id: t.id
        });
      },
      setEnterprise: function (t) {
        (this.setEnterpriseId(t.id), this.setRefreshTerminalPage(!0), uni.navigateBack());
      }
    })
  };
  e.default = c;
})(module, exports, __r);
