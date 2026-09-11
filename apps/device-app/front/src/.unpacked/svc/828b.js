// webpack 模块 828b  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  function a(e, t, n, a, r, i, o, s, u, d) {
    var c, l = "function" === typeof e ? e.options : e;
    if (u) {
      l.components || (l.components = {});
      var f = Object.prototype.hasOwnProperty;
      for (var m in u) f.call(u, m) && !f.call(l.components, m) && (l.components[m] = u[m]);
    }
    if ((d && ("function" === typeof d.beforeCreate && (d.beforeCreate = [d.beforeCreate]), (d.beforeCreate || (d.beforeCreate = [])).unshift(function () {
      this[d.__module] = this;
    }), (l.mixins || (l.mixins = [])).push(d)), t && (l.render = t, l.staticRenderFns = n, l._compiled = !0), a && (l.functional = !0), i && (l._scopeId = "data-v-" + i), o ? (c = function (e) {
      (e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, e || "undefined" === typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), r && r.call(this, e), e && e._registeredComponents && e._registeredComponents.add(o));
    }, l._ssrRegister = c) : r && (c = s ? function () {
      r.call(this, this.$root.$options.shadowRoot);
    } : r), c)) if (l.functional) {
      l._injectStyles = c;
      var p = l.render;
      l.render = function (e, t) {
        return (c.call(t), p(e, t));
      };
    } else {
      var _ = l.beforeCreate;
      l.beforeCreate = _ ? [].concat(_, c) : [c];
    }
    return {
      exports: e,
      options: l
    };
  }
  n.d(t, "a", function () {
    return a;
  });
})(module, exports, __r);
