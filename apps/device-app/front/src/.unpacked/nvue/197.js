// webpack 模块 197  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a = require("@/.unpacked/nvue/1.js").default;
  function r() {
    "use strict";
    (e.exports = r = function () {
      return t;
    }, e.exports.__esModule = !0, e.exports.default = e.exports);
    var t = {}, n = Object.prototype, i = n.hasOwnProperty, o = Object.defineProperty || (function (e, t, n) {
      e[t] = n.value;
    }), s = "function" == typeof Symbol ? Symbol : {}, d = s.iterator || "@@iterator", u = s.asyncIterator || "@@asyncIterator", l = s.toStringTag || "@@toStringTag";
    function c(e, t, n) {
      return (Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), e[t]);
    }
    try {
      c({}, "");
    } catch (e) {
      c = function (e, t, n) {
        return e[t] = n;
      };
    }
    function _(e, t, n, a) {
      var r = t && t.prototype instanceof f ? t : f, i = Object.create(r.prototype), s = new x(a || []);
      return (o(i, "_invoke", {
        value: k(e, n, s)
      }), i);
    }
    function m(e, t, n) {
      try {
        return {
          type: "normal",
          arg: e.call(t, n)
        };
      } catch (e) {
        return {
          type: "throw",
          arg: e
        };
      }
    }
    t.wrap = _;
    var p = {};
    function f() {}
    function h() {}
    function y() {}
    var M = {};
    c(M, d, function () {
      return this;
    });
    var g = Object.getPrototypeOf, L = g && g(g(S([])));
    L && L !== n && i.call(L, d) && (M = L);
    var v = y.prototype = f.prototype = Object.create(M);
    function Y(e) {
      ["next", "throw", "return"].forEach(function (t) {
        c(e, t, function (e) {
          return this._invoke(t, e);
        });
      });
    }
    function b(e, t) {
      var n;
      o(this, "_invoke", {
        value: function (r, o) {
          function s() {
            return new t(function (n, s) {
              !(function n(r, o, s, d) {
                var u = m(e[r], e, o);
                if ("throw" !== u.type) {
                  var l = u.arg, c = l.value;
                  return c && "object" == a(c) && i.call(c, "__await") ? t.resolve(c.__await).then(function (e) {
                    n("next", e, s, d);
                  }, function (e) {
                    n("throw", e, s, d);
                  }) : t.resolve(c).then(function (e) {
                    (l.value = e, s(l));
                  }, function (e) {
                    return n("throw", e, s, d);
                  });
                }
                d(u.arg);
              })(r, o, n, s);
            });
          }
          return n = n ? n.then(s, s) : s();
        }
      });
    }
    function k(e, t, n) {
      var a = "suspendedStart";
      return function (r, i) {
        if ("executing" === a) throw new Error("Generator is already running");
        if ("completed" === a) {
          if ("throw" === r) throw i;
          return j();
        }
        for ((n.method = r, n.arg = i); ; ) {
          var o = n.delegate;
          if (o) {
            var s = w(o, n);
            if (s) {
              if (s === p) continue;
              return s;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg; else if ("throw" === n.method) {
            if ("suspendedStart" === a) throw (a = "completed", n.arg);
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          a = "executing";
          var d = m(e, t, n);
          if ("normal" === d.type) {
            if ((a = n.done ? "completed" : "suspendedYield", d.arg === p)) continue;
            return {
              value: d.arg,
              done: n.done
            };
          }
          "throw" === d.type && (a = "completed", n.method = "throw", n.arg = d.arg);
        }
      };
    }
    function w(e, t) {
      var n = t.method, a = e.iterator[n];
      if (void 0 === a) return (t.delegate = null, "throw" === n && e.iterator.return && (t.method = "return", t.arg = void 0, w(e, t), "throw" === t.method) || "return" !== n && (t.method = "throw", t.arg = new TypeError("The iterator does not provide a '" + n + "' method")), p);
      var r = m(a, e.iterator, t.arg);
      if ("throw" === r.type) return (t.method = "throw", t.arg = r.arg, t.delegate = null, p);
      var i = r.arg;
      return i ? i.done ? (t[e.resultName] = i.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = void 0), t.delegate = null, p) : i : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, p);
    }
    function T(e) {
      var t = {
        tryLoc: e[0]
      };
      ((1 in e) && (t.catchLoc = e[1]), (2 in e) && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t));
    }
    function D(e) {
      var t = e.completion || ({});
      (t.type = "normal", delete t.arg, e.completion = t);
    }
    function x(e) {
      (this.tryEntries = [{
        tryLoc: "root"
      }], e.forEach(T, this), this.reset(!0));
    }
    function S(e) {
      if (e) {
        var t = e[d];
        if (t) return t.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var n = -1, a = function t() {
            for (; ++n < e.length; ) if (i.call(e, n)) return (t.value = e[n], t.done = !1, t);
            return (t.value = void 0, t.done = !0, t);
          };
          return a.next = a;
        }
      }
      return {
        next: j
      };
    }
    function j() {
      return {
        value: void 0,
        done: !0
      };
    }
    return (h.prototype = y, o(v, "constructor", {
      value: y,
      configurable: !0
    }), o(y, "constructor", {
      value: h,
      configurable: !0
    }), h.displayName = c(y, l, "GeneratorFunction"), t.isGeneratorFunction = function (e) {
      var t = "function" == typeof e && e.constructor;
      return !!t && (t === h || "GeneratorFunction" === (t.displayName || t.name));
    }, t.mark = function (e) {
      return (Object.setPrototypeOf ? Object.setPrototypeOf(e, y) : (e.__proto__ = y, c(e, l, "GeneratorFunction")), e.prototype = Object.create(v), e);
    }, t.awrap = function (e) {
      return {
        __await: e
      };
    }, Y(b.prototype), c(b.prototype, u, function () {
      return this;
    }), t.AsyncIterator = b, t.async = function (e, n, a, r, i) {
      void 0 === i && (i = Promise);
      var o = new b(_(e, n, a, r), i);
      return t.isGeneratorFunction(n) ? o : o.next().then(function (e) {
        return e.done ? e.value : o.next();
      });
    }, Y(v), c(v, l, "Generator"), c(v, d, function () {
      return this;
    }), c(v, "toString", function () {
      return "[object Generator]";
    }), t.keys = function (e) {
      var t = Object(e), n = [];
      for (var a in t) n.push(a);
      return (n.reverse(), function e() {
        for (; n.length; ) {
          var a = n.pop();
          if ((a in t)) return (e.value = a, e.done = !1, e);
        }
        return (e.done = !0, e);
      });
    }, t.values = S, x.prototype = {
      constructor: x,
      reset: function (e) {
        if ((this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(D), !e)) for (var t in this) "t" === t.charAt(0) && i.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0);
      },
      stop: function () {
        this.done = !0;
        var e = this.tryEntries[0].completion;
        if ("throw" === e.type) throw e.arg;
        return this.rval;
      },
      dispatchException: function (e) {
        if (this.done) throw e;
        var t = this;
        function n(n, a) {
          return (o.type = "throw", o.arg = e, t.next = n, a && (t.method = "next", t.arg = void 0), !!a);
        }
        for (var a = this.tryEntries.length - 1; a >= 0; --a) {
          var r = this.tryEntries[a], o = r.completion;
          if ("root" === r.tryLoc) return n("end");
          if (r.tryLoc <= this.prev) {
            var s = i.call(r, "catchLoc"), d = i.call(r, "finallyLoc");
            if (s && d) {
              if (this.prev < r.catchLoc) return n(r.catchLoc, !0);
              if (this.prev < r.finallyLoc) return n(r.finallyLoc);
            } else if (s) {
              if (this.prev < r.catchLoc) return n(r.catchLoc, !0);
            } else {
              if (!d) throw new Error("try statement without catch or finally");
              if (this.prev < r.finallyLoc) return n(r.finallyLoc);
            }
          }
        }
      },
      abrupt: function (e, t) {
        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
          var a = this.tryEntries[n];
          if (a.tryLoc <= this.prev && i.call(a, "finallyLoc") && this.prev < a.finallyLoc) {
            var r = a;
            break;
          }
        }
        r && ("break" === e || "continue" === e) && r.tryLoc <= t && t <= r.finallyLoc && (r = null);
        var o = r ? r.completion : {};
        return (o.type = e, o.arg = t, r ? (this.method = "next", this.next = r.finallyLoc, p) : this.complete(o));
      },
      complete: function (e, t) {
        if ("throw" === e.type) throw e.arg;
        return ("break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), p);
      },
      finish: function (e) {
        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
          var n = this.tryEntries[t];
          if (n.finallyLoc === e) return (this.complete(n.completion, n.afterLoc), D(n), p);
        }
      },
      catch: function (e) {
        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
          var n = this.tryEntries[t];
          if (n.tryLoc === e) {
            var a = n.completion;
            if ("throw" === a.type) {
              var r = a.arg;
              D(n);
            }
            return r;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (e, t, n) {
        return (this.delegate = {
          iterator: S(e),
          resultName: t,
          nextLoc: n
        }, "next" === this.method && (this.arg = void 0), p);
      }
    }, t);
  }
  (e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports);
})(module, exports, __r);
