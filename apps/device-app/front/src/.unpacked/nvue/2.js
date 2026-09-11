// webpack 模块 2  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  function a(e, t, n, a, r, i, o, s, d, u) {
    var l, c = "function" == typeof e ? e.options : e;
    if (d) {
      c.components || (c.components = {});
      var _ = Object.prototype.hasOwnProperty;
      for (var m in d) _.call(d, m) && !_.call(c.components, m) && (c.components[m] = d[m]);
    }
    if ((u && ("function" == typeof u.beforeCreate && (u.beforeCreate = [u.beforeCreate]), (u.beforeCreate || (u.beforeCreate = [])).unshift(function () {
      this[u.__module] = this;
    }), (c.mixins || (c.mixins = [])).push(u)), t && (c.render = t, c.staticRenderFns = n, c._compiled = !0), a && (c.functional = !0), i && (c._scopeId = "data-v-" + i), o ? (l = function (e) {
      ((e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), r && r.call(this, e), e && e._registeredComponents && e._registeredComponents.add(o));
    }, c._ssrRegister = l) : r && (l = s ? function () {
      r.call(this, this.$root.$options.shadowRoot);
    } : r), l)) if (c.functional) {
      c._injectStyles = l;
      var p = c.render;
      c.render = function (e, t) {
        return (l.call(t), p(e, t));
      };
    } else {
      var f = c.beforeCreate;
      c.beforeCreate = f ? [].concat(f, l) : [l];
    }
    return {
      exports: e,
      options: c
    };
  }
  n.d(t, "a", function () {
    return a;
  });
})(module, exports, __r);
