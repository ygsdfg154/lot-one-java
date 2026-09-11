// webpack 模块 663  [nvue]
// 出现于: pagesFunc/terminal/list/enterprise.js
const __r = require('./__runtime.js').wrap();
(function (t, e, r) {
  "use strict";
  var o = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = void 0);
  var i = o(require("@/.unpacked/nvue/5.js")), n = require("vuex");
  function a(t, e) {
    var r = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(t);
      (e && (o = o.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), r.push.apply(r, o));
    }
    return r;
  }
  function c(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = null != arguments[e] ? arguments[e] : {};
      e % 2 ? a(Object(r), !0).forEach(function (e) {
        (0, i.default)(t, e, r[e]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : a(Object(r)).forEach(function (e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
      });
    }
    return t;
  }
  var u = {
    components: {
      Tree: o(require("../../components/Tree/Tree.nvue")).default
    },
    data: function () {
      return {
        enterpriseList: [],
        searchEnterpriseList: [],
        maxEnterpriseInfo: null
      };
    },
    computed: c({}, (0, n.mapGetters)(["enterpriseInfo"])),
    onLoad: function () {
      this.init();
    },
    methods: c(c({}, (0, n.mapMutations)("account", ["setEnterpriseId", "setRefreshTerminalPage"])), {}, {
      init: function () {
        (this.maxEnterpriseInfo = this.enterpriseInfo.reduce(function (t, e) {
          return e.id.length < t.id.length ? e : t;
        }), this.enterpriseList = this.buildRoleTree(this.enterpriseInfo, this.maxEnterpriseInfo.parentId), this.addStateToTree(this.enterpriseList));
      },
      buildRoleTree: function (t, e) {
        for (var r = [], o = 0; o < t.length; o++) if (t[o].parentId == e) {
          var i = {
            id: t[o].id,
            parentId: t[o].parentId,
            name: t[o].name,
            openShow: (t[o].parentId, this.maxEnterpriseInfo.parentId, !0),
            iconShow: !0,
            children: this.buildRoleTree(t, t[o].id)
          };
          r.push(i);
        }
        return r;
      },
      addStateToTree: function (t) {
        var e = this, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        t.forEach(function (t) {
          (t.state = r, t.children && t.children.length > 0 && e.addStateToTree(t.children, r + 1));
        });
      },
      updateStateById: function (t) {
        var e = this;
        t.list.forEach(function (r) {
          if (r.id === t.id || t.isTopLevel) {
            if (t.isTopLevel) return (r.iconShow = !1, r.openShow = !1, void (r.children && r.children.length > 0 && e.updateStateById({
              list: r.children,
              id: t.id,
              isTopLevel: !0
            })));
            (r.iconShow = !r.iconShow, r.children.forEach(function (o) {
              r.iconShow ? o.openShow = !0 : (o.iconShow = !1, o.openShow = !1, o.children && o.children.length > 0 && e.updateStateById({
                list: o.children,
                id: t.id,
                isTopLevel: !0
              }));
            }));
          }
          r.children && r.children.length > 0 && e.updateStateById({
            list: r.children,
            id: t.id
          });
        });
      },
      searchEnterpriseHandler: function (t) {
        (t || (this.searchEnterpriseList = []), this.searchEnterpriseList = this.enterpriseInfo.filter(function (e) {
          return e.name.includes(t);
        }));
      },
      setEnterprise: function (t) {
        (this.setEnterpriseId(t.id), this.setRefreshTerminalPage(!0), uni.navigateBack());
      }
    })
  };
  e.default = u;
})(module, exports, __r);
