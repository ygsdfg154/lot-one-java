// webpack 模块 79  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    function t(e, t, n, a) {
      var r = {
        s: ["\u0925\u094b\u0921\u092f\u093e \u0938\u0945\u0915\u0902\u0921\u093e\u0902\u0928\u0940", "\u0925\u094b\u0921\u0947 \u0938\u0945\u0915\u0902\u0921"],
        ss: [e + " \u0938\u0945\u0915\u0902\u0921\u093e\u0902\u0928\u0940", e + " \u0938\u0945\u0915\u0902\u0921"],
        m: ["\u090f\u0915\u093e \u092e\u093f\u0923\u091f\u093e\u0928", "\u090f\u0915 \u092e\u093f\u0928\u0942\u091f"],
        mm: [e + " \u092e\u093f\u0923\u091f\u093e\u0902\u0928\u0940", e + " \u092e\u093f\u0923\u091f\u093e\u0902"],
        h: ["\u090f\u0915\u093e \u0935\u0930\u093e\u0928", "\u090f\u0915 \u0935\u0930"],
        hh: [e + " \u0935\u0930\u093e\u0902\u0928\u0940", e + " \u0935\u0930\u093e\u0902"],
        d: ["\u090f\u0915\u093e \u0926\u093f\u0938\u093e\u0928", "\u090f\u0915 \u0926\u0940\u0938"],
        dd: [e + " \u0926\u093f\u0938\u093e\u0902\u0928\u0940", e + " \u0926\u0940\u0938"],
        M: ["\u090f\u0915\u093e \u092e\u094d\u0939\u092f\u0928\u094d\u092f\u093e\u0928", "\u090f\u0915 \u092e\u094d\u0939\u092f\u0928\u094b"],
        MM: [e + " \u092e\u094d\u0939\u092f\u0928\u094d\u092f\u093e\u0928\u0940", e + " \u092e\u094d\u0939\u092f\u0928\u0947"],
        y: ["\u090f\u0915\u093e \u0935\u0930\u094d\u0938\u093e\u0928", "\u090f\u0915 \u0935\u0930\u094d\u0938"],
        yy: [e + " \u0935\u0930\u094d\u0938\u093e\u0902\u0928\u0940", e + " \u0935\u0930\u094d\u0938\u093e\u0902"]
      };
      return a ? r[n][0] : r[n][1];
    }
    return e.defineLocale("gom-deva", {
      months: {
        standalone: ("\u091c\u093e\u0928\u0947\u0935\u093e\u0930\u0940_\u092b\u0947\u092c\u094d\u0930\u0941\u0935\u093e\u0930\u0940_\u092e\u093e\u0930\u094d\u091a_\u090f\u092a\u094d\u0930\u0940\u0932_\u092e\u0947_\u091c\u0942\u0928_\u091c\u0941\u0932\u092f_\u0911\u0917\u0938\u094d\u091f_\u0938\u092a\u094d\u091f\u0947\u0902\u092c\u0930_\u0911\u0915\u094d\u091f\u094b\u092c\u0930_\u0928\u094b\u0935\u094d\u0939\u0947\u0902\u092c\u0930_\u0921\u093f\u0938\u0947\u0902\u092c\u0930").split("_"),
        format: ("\u091c\u093e\u0928\u0947\u0935\u093e\u0930\u0940\u091a\u094d\u092f\u093e_\u092b\u0947\u092c\u094d\u0930\u0941\u0935\u093e\u0930\u0940\u091a\u094d\u092f\u093e_\u092e\u093e\u0930\u094d\u091a\u093e\u091a\u094d\u092f\u093e_\u090f\u092a\u094d\u0930\u0940\u0932\u093e\u091a\u094d\u092f\u093e_\u092e\u0947\u092f\u093e\u091a\u094d\u092f\u093e_\u091c\u0942\u0928\u093e\u091a\u094d\u092f\u093e_\u091c\u0941\u0932\u092f\u093e\u091a\u094d\u092f\u093e_\u0911\u0917\u0938\u094d\u091f\u093e\u091a\u094d\u092f\u093e_\u0938\u092a\u094d\u091f\u0947\u0902\u092c\u0930\u093e\u091a\u094d\u092f\u093e_\u0911\u0915\u094d\u091f\u094b\u092c\u0930\u093e\u091a\u094d\u092f\u093e_\u0928\u094b\u0935\u094d\u0939\u0947\u0902\u092c\u0930\u093e\u091a\u094d\u092f\u093e_\u0921\u093f\u0938\u0947\u0902\u092c\u0930\u093e\u091a\u094d\u092f\u093e").split("_"),
        isFormat: /MMMM(\s)+D[oD]?/
      },
      monthsShort: ("\u091c\u093e\u0928\u0947._\u092b\u0947\u092c\u094d\u0930\u0941._\u092e\u093e\u0930\u094d\u091a_\u090f\u092a\u094d\u0930\u0940._\u092e\u0947_\u091c\u0942\u0928_\u091c\u0941\u0932._\u0911\u0917._\u0938\u092a\u094d\u091f\u0947\u0902._\u0911\u0915\u094d\u091f\u094b._\u0928\u094b\u0935\u094d\u0939\u0947\u0902._\u0921\u093f\u0938\u0947\u0902.").split("_"),
      monthsParseExact: !0,
      weekdays: ("\u0906\u092f\u0924\u093e\u0930_\u0938\u094b\u092e\u093e\u0930_\u092e\u0902\u0917\u0933\u093e\u0930_\u092c\u0941\u0927\u0935\u093e\u0930_\u092c\u093f\u0930\u0947\u0938\u094d\u0924\u093e\u0930_\u0938\u0941\u0915\u094d\u0930\u093e\u0930_\u0936\u0947\u0928\u0935\u093e\u0930").split("_"),
      weekdaysShort: ("\u0906\u092f\u0924._\u0938\u094b\u092e._\u092e\u0902\u0917\u0933._\u092c\u0941\u0927._\u092c\u094d\u0930\u0947\u0938\u094d\u0924._\u0938\u0941\u0915\u094d\u0930._\u0936\u0947\u0928.").split("_"),
      weekdaysMin: ("\u0906_\u0938\u094b_\u092e\u0902_\u092c\u0941_\u092c\u094d\u0930\u0947_\u0938\u0941_\u0936\u0947").split("_"),
      weekdaysParseExact: !0,
      longDateFormat: {
        LT: "A h:mm [\u0935\u093e\u091c\u0924\u093e\u0902]",
        LTS: "A h:mm:ss [\u0935\u093e\u091c\u0924\u093e\u0902]",
        L: "DD-MM-YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY A h:mm [\u0935\u093e\u091c\u0924\u093e\u0902]",
        LLLL: "dddd, MMMM Do, YYYY, A h:mm [\u0935\u093e\u091c\u0924\u093e\u0902]",
        llll: "ddd, D MMM YYYY, A h:mm [\u0935\u093e\u091c\u0924\u093e\u0902]"
      },
      calendar: {
        sameDay: "[\u0906\u092f\u091c] LT",
        nextDay: "[\u092b\u093e\u0932\u094d\u092f\u093e\u0902] LT",
        nextWeek: "[\u092b\u0941\u0921\u0932\u094b] dddd[,] LT",
        lastDay: "[\u0915\u093e\u0932] LT",
        lastWeek: "[\u092b\u093e\u091f\u0932\u094b] dddd[,] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "%s",
        past: "%s \u0906\u0926\u0940\u0902",
        s: t,
        ss: t,
        m: t,
        mm: t,
        h: t,
        hh: t,
        d: t,
        dd: t,
        M: t,
        MM: t,
        y: t,
        yy: t
      },
      dayOfMonthOrdinalParse: /\d{1,2}(\u0935\u0947\u0930)/,
      ordinal: function (e, t) {
        switch (t) {
          case "D":
            return e + "\u0935\u0947\u0930";
          default:
          case "M":
          case "Q":
          case "DDD":
          case "d":
          case "w":
          case "W":
            return e;
        }
      },
      week: {
        dow: 0,
        doy: 3
      },
      meridiemParse: /\u0930\u093e\u0924\u0940|\u0938\u0915\u093e\u0933\u0940\u0902|\u0926\u0928\u092a\u093e\u0930\u093e\u0902|\u0938\u093e\u0902\u091c\u0947/,
      meridiemHour: function (e, t) {
        return (12 === e && (e = 0), "\u0930\u093e\u0924\u0940" === t ? e < 4 ? e : e + 12 : "\u0938\u0915\u093e\u0933\u0940\u0902" === t ? e : "\u0926\u0928\u092a\u093e\u0930\u093e\u0902" === t ? e > 12 ? e : e + 12 : "\u0938\u093e\u0902\u091c\u0947" === t ? e + 12 : void 0);
      },
      meridiem: function (e, t, n) {
        return e < 4 ? "\u0930\u093e\u0924\u0940" : e < 12 ? "\u0938\u0915\u093e\u0933\u0940\u0902" : e < 16 ? "\u0926\u0928\u092a\u093e\u0930\u093e\u0902" : e < 20 ? "\u0938\u093e\u0902\u091c\u0947" : "\u0930\u093e\u0924\u0940";
      }
    });
  }, "object" === s(t) && void 0 !== e ? o(require("moment")) : (r = [require("moment")], void 0 === (i = "function" == typeof (a = o) ? a.apply(t, r) : a) || (e.exports = i)));
})(module, exports, __r);
