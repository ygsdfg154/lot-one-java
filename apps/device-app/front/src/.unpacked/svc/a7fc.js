// webpack 模块 a7fc  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t) {
  e.exports = {
    props: {
      customStyle: {
        type: [Object, String],
        default: function () {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      },
      url: {
        type: String,
        default: ""
      },
      linkType: {
        type: String,
        default: "navigateTo"
      }
    },
    data: function () {
      return {};
    },
    onLoad: function () {
      this.$u.getRect = this.$uGetRect;
    },
    created: function () {
      this.$u.getRect = this.$uGetRect;
    },
    computed: {
      $u: function () {
        return uni.$u.deepMerge(uni.$u, {
          props: void 0,
          http: void 0,
          mixin: void 0
        });
      },
      bem: function () {
        return function (e, t, n) {
          var a = this, r = ("u-").concat(e, "--"), i = {};
          return (t && t.map(function (e) {
            i[r + a[e]] = !0;
          }), n && n.map(function (e) {
            a[e] ? i[r + e] = a[e] : delete i[r + e];
          }), Object.keys(i));
        };
      }
    },
    methods: {
      openPage: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "url", t = this[e];
        t && uni[this.linkType]({
          url: t
        });
      },
      $uGetRect: function (e, t) {
        var n = this;
        return new Promise(function (a) {
          uni.createSelectorQuery().in(n)[t ? "selectAll" : "select"](e).boundingClientRect(function (e) {
            (t && Array.isArray(e) && e.length && a(e), !t && e && a(e));
          }).exec();
        });
      },
      getParentData: function () {
        var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        (this.parent || (this.parent = {}), this.parent = uni.$u.$parent.call(this, t), this.parent.children && -1 === this.parent.children.indexOf(this) && this.parent.children.push(this), this.parent && this.parentData && Object.keys(this.parentData).map(function (t) {
          e.parentData[t] = e.parent[t];
        }));
      },
      preventEvent: function (e) {
        e && "function" === typeof e.stopPropagation && e.stopPropagation();
      },
      noop: function (e) {
        this.preventEvent(e);
      }
    },
    onReachBottom: function () {
      uni.$emit("uOnReachBottom");
    },
    beforeDestroy: function () {
      var e = this;
      if (this.parent && uni.$u.test.array(this.parent.children)) {
        var t = this.parent.children;
        t.map(function (n, a) {
          n === e && t.splice(a, 1);
        });
      }
    }
  };
})(module, exports, __r);
