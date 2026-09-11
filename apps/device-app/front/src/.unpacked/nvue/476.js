// webpack 模块 476  [nvue]
// 出现于: pagesFunc/deviceInfo/index.js, pagesFunc/terminal/alerts-set/messages.js, pagesFunc/terminal/alerts-set/phone.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var r = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var a = r(require("@/.unpacked/nvue/5.js")), i = r(require("@/.unpacked/nvue/1.js"));
    function o(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        (t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), n.push.apply(n, r));
      }
      return n;
    }
    function s(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? o(Object(n), !0).forEach(function (t) {
          (0, a.default)(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : o(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }
      return e;
    }
    var d = /%[sdj%]/g, u = function () {};
    function l(e) {
      if (!e || !e.length) return null;
      var t = {};
      return (e.forEach(function (e) {
        var n = e.field;
        (t[n] = t[n] || [], t[n].push(e));
      }), t);
    }
    function _() {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
      var r = 1, a = t[0], i = t.length;
      if ("function" == typeof a) return a.apply(null, t.slice(1));
      if ("string" == typeof a) {
        for (var o = String(a).replace(d, function (e) {
          if ("%%" === e) return "%";
          if (r >= i) return e;
          switch (e) {
            case "%s":
              return String(t[r++]);
            case "%d":
              return Number(t[r++]);
            case "%j":
              try {
                return JSON.stringify(t[r++]);
              } catch (e) {
                return "[Circular]";
              }
              break;
            default:
              return e;
          }
        }), s = t[r]; r < i; s = t[++r]) o += (" ").concat(s);
        return o;
      }
      return a;
    }
    function c(e, t) {
      return null == e || (!("array" !== t || !Array.isArray(e) || e.length) || !(!(function (e) {
        return "string" === e || "url" === e || "hex" === e || "email" === e || "pattern" === e;
      })(t) || "string" != typeof e || e));
    }
    function m(e, t, n) {
      var r = 0, a = e.length;
      !(function i(o) {
        if (o && o.length) n(o); else {
          var s = r;
          (r += 1, s < a ? t(e[s], i) : n([]));
        }
      })([]);
    }
    function f(e, t, n, r) {
      if (t.first) {
        var a = new Promise(function (t, a) {
          m((function (e) {
            var t = [];
            return (Object.keys(e).forEach(function (n) {
              t.push.apply(t, e[n]);
            }), t);
          })(e), n, function (e) {
            return (r(e), e.length ? a({
              errors: e,
              fields: l(e)
            }) : t());
          });
        });
        return (a.catch(function (e) {
          return e;
        }), a);
      }
      var i = t.firstFields || [];
      !0 === i && (i = Object.keys(e));
      var o = Object.keys(e), s = o.length, d = 0, u = [], _ = new Promise(function (t, a) {
        var _ = function (e) {
          if ((u.push.apply(u, e), ++d === s)) return (r(u), u.length ? a({
            errors: u,
            fields: l(u)
          }) : t());
        };
        (o.length || (r(u), t()), o.forEach(function (t) {
          var r = e[t];
          -1 !== i.indexOf(t) ? m(r, n, _) : (function (e, t, n) {
            var r = [], a = 0, i = e.length;
            function o(e) {
              (r.push.apply(r, e), ++a === i && n(r));
            }
            e.forEach(function (e) {
              t(e, o);
            });
          })(r, n, _);
        }));
      });
      return (_.catch(function (e) {
        return e;
      }), _);
    }
    function p(e) {
      return function (t) {
        return t && t.message ? (t.field = t.field || e.fullField, t) : {
          message: "function" == typeof t ? t() : t,
          field: t.field || e.fullField
        };
      };
    }
    function h(e, t) {
      if (t) for (var n in t) if (t.hasOwnProperty(n)) {
        var r = t[n];
        "object" === (0, i.default)(r) && "object" === (0, i.default)(e[n]) ? e[n] = s(s({}, e[n]), r) : e[n] = r;
      }
      return e;
    }
    function y(e, t, n, r, a, i) {
      !e.required || n.hasOwnProperty(e.field) && !c(t, i || e.type) || r.push(_(a.messages.required, e.fullField));
    }
    "undefined" != typeof process && Object({
      NODE_ENV: "production",
      UNI_APP_ID: "__UNI__7115D8B",
      UNI_APP_NAME: "\u94ed\u667a\u7269\u8054",
      UNI_PLATFORM: "app-plus",
      VUE_APP_PLATFORM: "app-plus",
      UNI_CLOUD_PROVIDER: [],
      UNI_SECURE_NETWORK_ENABLE: !1,
      UNI_SECURE_NETWORK_CONFIG: [],
      UNICLOUD_DEBUG: void 0,
      RUN_BY_HBUILDERX: !0,
      UNI_AUTOMATOR_WS_ENDPOINT: void 0,
      UNI_STAT_UNI_CLOUD: "",
      UNI_STATISTICS_CONFIG: "",
      UNI_STAT_DEBUG: "",
      UNI_COMPILER_VERSION: "4.75",
      VUE_APP_DARK_MODE: "false"
    });
    var M = {
      email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      url: new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", "i"),
      hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
    }, L = {
      integer: function (e) {
        return (/^(-)?\d+$/).test(e);
      },
      float: function (e) {
        return (/^(-)?\d+(\.\d+)?$/).test(e);
      },
      array: function (e) {
        return Array.isArray(e);
      },
      regexp: function (e) {
        if (e instanceof RegExp) return !0;
        try {
          return !!new RegExp(e);
        } catch (e) {
          return !1;
        }
      },
      date: function (e) {
        return "function" == typeof e.getTime && "function" == typeof e.getMonth && "function" == typeof e.getYear;
      },
      number: function (e) {
        return !isNaN(e) && "number" == typeof +e;
      },
      object: function (e) {
        return "object" === (0, i.default)(e) && !L.array(e);
      },
      method: function (e) {
        return "function" == typeof e;
      },
      email: function (e) {
        return "string" == typeof e && !!e.match(M.email) && e.length < 255;
      },
      url: function (e) {
        return "string" == typeof e && !!e.match(M.url);
      },
      hex: function (e) {
        return "string" == typeof e && !!e.match(M.hex);
      }
    };
    var g = {
      required: y,
      whitespace: function (e, t, n, r, a) {
        ((/^\s+$/).test(t) || "" === t) && r.push(_(a.messages.whitespace, e.fullField));
      },
      type: function (e, t, n, r, a) {
        if (e.required && void 0 === t) y(e, t, n, r, a); else {
          var o = e.type;
          ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"].indexOf(o) > -1 ? L[o](t) || r.push(_(a.messages.types[o], e.fullField, e.type)) : o && (0, i.default)(t) !== e.type && r.push(_(a.messages.types[o], e.fullField, e.type));
        }
      },
      range: function (e, t, n, r, a) {
        var i = "number" == typeof e.len, o = "number" == typeof e.min, s = "number" == typeof e.max, d = t, u = null, l = "number" == typeof t, c = "string" == typeof t, m = Array.isArray(t);
        if ((l ? u = "number" : c ? u = "string" : m && (u = "array"), !u)) return !1;
        (m && (d = t.length), c && (d = t.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "_").length), i ? d !== e.len && r.push(_(a.messages[u].len, e.fullField, e.len)) : o && !s && d < e.min ? r.push(_(a.messages[u].min, e.fullField, e.min)) : s && !o && d > e.max ? r.push(_(a.messages[u].max, e.fullField, e.max)) : o && s && (d < e.min || d > e.max) && r.push(_(a.messages[u].range, e.fullField, e.min, e.max)));
      },
      enum: function (e, t, n, r, a) {
        (e.enum = Array.isArray(e.enum) ? e.enum : [], -1 === e.enum.indexOf(t) && r.push(_(a.messages.enum, e.fullField, e.enum.join(", "))));
      },
      pattern: function (e, t, n, r, a) {
        if (e.pattern) if (e.pattern instanceof RegExp) (e.pattern.lastIndex = 0, e.pattern.test(t) || r.push(_(a.messages.pattern.mismatch, e.fullField, t, e.pattern))); else if ("string" == typeof e.pattern) {
          new RegExp(e.pattern).test(t) || r.push(_(a.messages.pattern.mismatch, e.fullField, t, e.pattern));
        }
      }
    };
    function v(e, t, n, r, a) {
      var i = e.type, o = [];
      if (e.required || !e.required && r.hasOwnProperty(e.field)) {
        if (c(t, i) && !e.required) return n();
        (g.required(e, t, r, o, a, i), c(t, i) || g.type(e, t, r, o, a));
      }
      n(o);
    }
    var Y = {
      string: function (e, t, n, r, a) {
        var i = [];
        if (e.required || !e.required && r.hasOwnProperty(e.field)) {
          if (c(t, "string") && !e.required) return n();
          (g.required(e, t, r, i, a, "string"), c(t, "string") || (g.type(e, t, r, i, a), g.range(e, t, r, i, a), g.pattern(e, t, r, i, a), !0 === e.whitespace && g.whitespace(e, t, r, i, a)));
        }
        n(i);
      },
      method: function (e, t, n, r, a) {
        var i = [];
        if (e.required || !e.required && r.hasOwnProperty(e.field)) {
          if (c(t) && !e.required) return n();
          (g.required(e, t, r, i, a), void 0 !== t && g.type(e, t, r, i, a));
        }
        n(i);
      },
      number: function (e, t, n, r, a) {
        var i = [];
        if (e.required || !e.required && r.hasOwnProperty(e.field)) {
          if (("" === t && (t = void 0), c(t) && !e.required)) return n();
          (g.required(e, t, r, i, a), void 0 !== t && (g.type(e, t, r, i, a), g.range(e, t, r, i, a)));
        }
        n(i);
      },
      boolean: function (e, t, n, r, a) {
        var i = [];
        if (e.required || !e.required && r.hasOwnProperty(e.field)) {
          if (c(t) && !e.required) return n();
          (g.required(e, t, r, i, a), void 0 !== t && g.type(e, t, r, i, a));
        }
        n(i);
      },
      regexp: function (e, t, n, r, a) {
        var i = [];
        if (e.required || !e.required && r.hasOwnProperty(e.field)) {
          if (c(t) && !e.required) return n();
          (g.required(e, t, r, i, a), c(t) || g.type(e, t, r, i, a));
        }
        n(i);
      },
      integer: function (e, t, n, r, a) {
        var i = [];
        if (e.required || !e.required && r.hasOwnProperty(e.field)) {
          if (c(t) && !e.required) return n();
          (g.required(e, t, r, i, a), void 0 !== t && (g.type(e, t, r, i, a), g.range(e, t, r, i, a)));
        }
        n(i);
      },
      float: function (e, t, n, r, a) {
        var i = [];
        if (e.required || !e.required && r.hasOwnProperty(e.field)) {
          if (c(t) && !e.required) return n();
          (g.required(e, t, r, i, a), void 0 !== t && (g.type(e, t, r, i, a), g.range(e, t, r, i, a)));
        }
        n(i);
      },
      array: function (e, t, n, r, a) {
        var i = [];
        if (e.required || !e.required && r.hasOwnProperty(e.field)) {
          if (c(t, "array") && !e.required) return n();
          (g.required(e, t, r, i, a, "array"), c(t, "array") || (g.type(e, t, r, i, a), g.range(e, t, r, i, a)));
        }
        n(i);
      },
      object: function (e, t, n, r, a) {
        var i = [];
        if (e.required || !e.required && r.hasOwnProperty(e.field)) {
          if (c(t) && !e.required) return n();
          (g.required(e, t, r, i, a), void 0 !== t && g.type(e, t, r, i, a));
        }
        n(i);
      },
      enum: function (e, t, n, r, a) {
        var i = [];
        if (e.required || !e.required && r.hasOwnProperty(e.field)) {
          if (c(t) && !e.required) return n();
          (g.required(e, t, r, i, a), void 0 !== t && g.enum(e, t, r, i, a));
        }
        n(i);
      },
      pattern: function (e, t, n, r, a) {
        var i = [];
        if (e.required || !e.required && r.hasOwnProperty(e.field)) {
          if (c(t, "string") && !e.required) return n();
          (g.required(e, t, r, i, a), c(t, "string") || g.pattern(e, t, r, i, a));
        }
        n(i);
      },
      date: function (e, t, n, r, a) {
        var i = [];
        if (e.required || !e.required && r.hasOwnProperty(e.field)) {
          if (c(t) && !e.required) return n();
          var o;
          if ((g.required(e, t, r, i, a), !c(t))) (o = "number" == typeof t ? new Date(t) : t, g.type(e, o, r, i, a), o && g.range(e, o.getTime(), r, i, a));
        }
        n(i);
      },
      url: v,
      hex: v,
      email: v,
      required: function (e, t, n, r, a) {
        var o = [], s = Array.isArray(t) ? "array" : (0, i.default)(t);
        (g.required(e, t, r, o, a, s), n(o));
      },
      any: function (e, t, n, r, a) {
        var i = [];
        if (e.required || !e.required && r.hasOwnProperty(e.field)) {
          if (c(t) && !e.required) return n();
          g.required(e, t, r, i, a);
        }
        n(i);
      }
    };
    function b() {
      return {
        default: "Validation error on field %s",
        required: "%s is required",
        enum: "%s must be one of %s",
        whitespace: "%s cannot be empty",
        date: {
          format: "%s date %s is invalid for format %s",
          parse: "%s date could not be parsed, %s is invalid ",
          invalid: "%s date %s is invalid"
        },
        types: {
          string: "%s is not a %s",
          method: "%s is not a %s (function)",
          array: "%s is not an %s",
          object: "%s is not an %s",
          number: "%s is not a %s",
          date: "%s is not a %s",
          boolean: "%s is not a %s",
          integer: "%s is not an %s",
          float: "%s is not a %s",
          regexp: "%s is not a valid %s",
          email: "%s is not a valid %s",
          url: "%s is not a valid %s",
          hex: "%s is not a valid %s"
        },
        string: {
          len: "%s must be exactly %s characters",
          min: "%s must be at least %s characters",
          max: "%s cannot be longer than %s characters",
          range: "%s must be between %s and %s characters"
        },
        number: {
          len: "%s must equal %s",
          min: "%s cannot be less than %s",
          max: "%s cannot be greater than %s",
          range: "%s must be between %s and %s"
        },
        array: {
          len: "%s must be exactly %s in length",
          min: "%s cannot be less than %s in length",
          max: "%s cannot be greater than %s in length",
          range: "%s must be between %s and %s in length"
        },
        pattern: {
          mismatch: "%s value %s does not match pattern %s"
        },
        clone: function () {
          var e = JSON.parse(JSON.stringify(this));
          return (e.clone = this.clone, e);
        }
      };
    }
    var k = b();
    function w(e) {
      (this.rules = null, this._messages = k, this.define(e));
    }
    (w.prototype = {
      messages: function (e) {
        return (e && (this._messages = h(b(), e)), this._messages);
      },
      define: function (e) {
        if (!e) throw new Error("Cannot configure a schema with no rules");
        if ("object" !== (0, i.default)(e) || Array.isArray(e)) throw new Error("Rules must be an object");
        var t, n;
        for (t in (this.rules = {}, e)) e.hasOwnProperty(t) && (n = e[t], this.rules[t] = Array.isArray(n) ? n : [n]);
      },
      validate: function (e, t, n) {
        var r = this;
        (void 0 === t && (t = {}), void 0 === n && (n = function () {}));
        var a, o, d = e, u = t, c = n;
        if (("function" == typeof u && (c = u, u = {}), !this.rules || 0 === Object.keys(this.rules).length)) return (c && c(), Promise.resolve());
        if (u.messages) {
          var m = this.messages();
          (m === k && (m = b()), h(m, u.messages), u.messages = m);
        } else u.messages = this.messages();
        var y = {};
        (u.keys || Object.keys(this.rules)).forEach(function (t) {
          (a = r.rules[t], o = d[t], a.forEach(function (n) {
            var a = n;
            ("function" == typeof a.transform && (d === e && (d = s({}, d)), o = d[t] = a.transform(o)), (a = "function" == typeof a ? {
              validator: a
            } : s({}, a)).validator = r.getValidationMethod(a), a.field = t, a.fullField = a.fullField || t, a.type = r.getType(a), a.validator && (y[t] = y[t] || [], y[t].push({
              rule: a,
              value: o,
              source: d,
              field: t
            })));
          }));
        });
        var M = {};
        return f(y, u, function (e, t) {
          var n, r = e.rule, a = !("object" !== r.type && "array" !== r.type || "object" !== (0, i.default)(r.fields) && "object" !== (0, i.default)(r.defaultField));
          function o(e, t) {
            return s(s({}, t), {}, {
              fullField: ("").concat(r.fullField, ".").concat(e)
            });
          }
          function d(n) {
            void 0 === n && (n = []);
            var i = n;
            if ((Array.isArray(i) || (i = [i]), !u.suppressWarning && i.length && w.warning("async-validator:", i), i.length && r.message && (i = [].concat(r.message)), i = i.map(p(r)), u.first && i.length)) return (M[r.field] = 1, t(i));
            if (a) {
              if (r.required && !e.value) return (i = r.message ? [].concat(r.message).map(p(r)) : u.error ? [u.error(r, _(u.messages.required, r.field))] : [], t(i));
              var d = {};
              if (r.defaultField) for (var l in e.value) e.value.hasOwnProperty(l) && (d[l] = r.defaultField);
              for (var c in d = s(s({}, d), e.rule.fields)) if (d.hasOwnProperty(c)) {
                var m = Array.isArray(d[c]) ? d[c] : [d[c]];
                d[c] = m.map(o.bind(null, c));
              }
              var f = new w(d);
              (f.messages(u.messages), e.rule.options && (e.rule.options.messages = u.messages, e.rule.options.error = u.error), f.validate(e.value, e.rule.options || u, function (e) {
                var n = [];
                (i && i.length && n.push.apply(n, i), e && e.length && n.push.apply(n, e), t(n.length ? n : null));
              }));
            } else t(i);
          }
          (a = a && (r.required || !r.required && e.value), r.field = e.field, r.asyncValidator ? n = r.asyncValidator(r, e.value, d, e.source, u) : r.validator && (!0 === (n = r.validator(r, e.value, d, e.source, u)) ? d() : !1 === n ? d(r.message || ("").concat(r.field, " fails")) : n instanceof Array ? d(n) : n instanceof Error && d(n.message)), n && n.then && n.then(function () {
            return d();
          }, function (e) {
            return d(e);
          }));
        }, function (e) {
          !(function (e) {
            var t, n, r, a = [], i = {};
            for (t = 0; t < e.length; t++) (n = e[t], r = void 0, Array.isArray(n) ? a = (r = a).concat.apply(r, n) : a.push(n));
            (a.length ? i = l(a) : (a = null, i = null), c(a, i));
          })(e);
        });
      },
      getType: function (e) {
        if ((void 0 === e.type && e.pattern instanceof RegExp && (e.type = "pattern"), "function" != typeof e.validator && e.type && !Y.hasOwnProperty(e.type))) throw new Error(_("Unknown rule type %s", e.type));
        return e.type || "string";
      },
      getValidationMethod: function (e) {
        if ("function" == typeof e.validator) return e.validator;
        var t = Object.keys(e), n = t.indexOf("message");
        return (-1 !== n && t.splice(n, 1), 1 === t.length && "required" === t[0] ? Y.required : Y[this.getType(e)] || !1);
      }
    }, w.register = function (e, t) {
      if ("function" != typeof t) throw new Error("Cannot register a validator by type, validator is not a function");
      Y[e] = t;
    }, w.warning = u, w.messages = k);
    var D = w;
    t.default = D;
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
