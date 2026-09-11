// webpack 模块 828b  [view]
// 出现于: app-view.js
const __r = require('./__runtime.js').wrap();
(function (t, e, a) {
  "use strict";
  function n(t, e, a, n, i, r, o, s, c, u) {
    var d, l = "function" === typeof t ? t.options : t;
    if (c) {
      l.components || (l.components = {});
      var f = Object.prototype.hasOwnProperty;
      for (var p in c) f.call(c, p) && !f.call(l.components, p) && (l.components[p] = c[p]);
    }
    if ((u && ("function" === typeof u.beforeCreate && (u.beforeCreate = [u.beforeCreate]), (u.beforeCreate || (u.beforeCreate = [])).unshift(function () {
      this[u.__module] = this;
    }), (l.mixins || (l.mixins = [])).push(u)), e && (l.render = e, l.staticRenderFns = a, l._compiled = !0), n && (l.functional = !0), r && (l._scopeId = "data-v-" + r), o ? (d = function (t) {
      (t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, t || "undefined" === typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), i && i.call(this, t), t && t._registeredComponents && t._registeredComponents.add(o));
    }, l._ssrRegister = d) : i && (d = s ? function () {
      i.call(this, this.$root.$options.shadowRoot);
    } : i), d)) if (l.functional) {
      l._injectStyles = d;
      var v = l.render;
      l.render = function (t, e) {
        return (d.call(e), v(t, e));
      };
    } else {
      var _ = l.beforeCreate;
      l.beforeCreate = _ ? [].concat(_, d) : [d];
    }
    return {
      exports: t,
      options: l
    };
  }
  a.d(e, "a", function () {
    return n;
  });
})(module, exports, __r);
