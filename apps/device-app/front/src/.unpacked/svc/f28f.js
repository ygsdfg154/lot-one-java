// webpack 模块 f28f  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/svc/3b2d.js"));
  function i(e) {
    return (/^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/).test(e);
  }
  function o(e) {
    switch ((0, r.default)(e)) {
      case "undefined":
        return !0;
      case "string":
        if (0 == e.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length) return !0;
        break;
      case "boolean":
        if (!e) return !0;
        break;
      case "number":
        if (0 === e || isNaN(e)) return !0;
        break;
      case "object":
        if (null === e || 0 === e.length) return !0;
        for (var t in e) return !1;
        return !0;
    }
    return !1;
  }
  function s(e) {
    return "[object Object]" === Object.prototype.toString.call(e);
  }
  function u(e) {
    return "function" === typeof e;
  }
  var d = {
    email: function (e) {
      return (/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(e);
    },
    mobile: function (e) {
      return (/^1([3589]\d|4[5-9]|6[1-2,4-7]|7[0-8])\d{8}$/).test(e);
    },
    url: function (e) {
      return (/^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/).test(e);
    },
    date: function (e) {
      return !!e && (i(e) && (e = +e), !(/Invalid|NaN/).test(new Date(e).toString()));
    },
    dateISO: function (e) {
      return (/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/).test(e);
    },
    number: i,
    digits: function (e) {
      return (/^\d+$/).test(e);
    },
    idCard: function (e) {
      return (/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/).test(e);
    },
    carNo: function (e) {
      return 7 === e.length ? (/^[\u4eac\u6d25\u6caa\u6e1d\u5180\u8c6b\u4e91\u8fbd\u9ed1\u6e58\u7696\u9c81\u65b0\u82cf\u6d59\u8d63\u9102\u6842\u7518\u664b\u8499\u9655\u5409\u95fd\u8d35\u7ca4\u9752\u85cf\u5ddd\u5b81\u743c\u4f7f\u9886A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9\u6302\u5b66\u8b66\u6e2f\u6fb3]{1}$/).test(e) : 8 === e.length && (/^[\u4eac\u6d25\u6caa\u6e1d\u5180\u8c6b\u4e91\u8fbd\u9ed1\u6e58\u7696\u9c81\u65b0\u82cf\u6d59\u8d63\u9102\u6842\u7518\u664b\u8499\u9655\u5409\u95fd\u8d35\u7ca4\u9752\u85cf\u5ddd\u5b81\u743c\u4f7f\u9886A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/).test(e);
    },
    amount: function (e) {
      return (/^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/).test(e);
    },
    chinese: function (e) {
      return (/^[\u4e00-\u9fa5]+$/gi).test(e);
    },
    letter: function (e) {
      return (/^[a-zA-Z]*$/).test(e);
    },
    enOrNum: function (e) {
      return (/^[0-9a-zA-Z]*$/g).test(e);
    },
    contains: function (e, t) {
      return e.indexOf(t) >= 0;
    },
    range: function (e, t) {
      return e >= t[0] && e <= t[1];
    },
    rangeLength: function (e, t) {
      return e.length >= t[0] && e.length <= t[1];
    },
    empty: o,
    isEmpty: o,
    jsonString: function (e) {
      if ("string" === typeof e) try {
        var t = JSON.parse(e);
        return !("object" !== (0, r.default)(t) || !t);
      } catch (n) {
        return !1;
      }
      return !1;
    },
    landline: function (e) {
      return (/^\d{3,4}-\d{7,8}(-\d{3,4})?$/).test(e);
    },
    object: s,
    array: function (e) {
      return "function" === typeof Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.call(e);
    },
    code: function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 6;
      return new RegExp(("^\\d{").concat(t, "}$")).test(e);
    },
    func: u,
    promise: function (e) {
      return s(e) && u(e.then) && u(e.catch);
    },
    video: function (e) {
      return (/\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i).test(e);
    },
    image: function (e) {
      var t = e.split("?")[0];
      return (/\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i).test(t);
    },
    regExp: function (e) {
      return e && "[object RegExp]" === Object.prototype.toString.call(e);
    },
    string: function (e) {
      return "string" === typeof e;
    }
  };
  t.default = d;
})(module, exports, __r);
