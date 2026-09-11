// webpack 模块 6719  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    function t(e, t, n) {
      var a = e + " ";
      switch (n) {
        case "ss":
          return (a += 1 === e ? "sekunda" : 2 === e || 3 === e || 4 === e ? "sekunde" : "sekundi", a);
        case "m":
          return t ? "jedna minuta" : "jedne minute";
        case "mm":
          return (a += 1 === e ? "minuta" : 2 === e || 3 === e || 4 === e ? "minute" : "minuta", a);
        case "h":
          return t ? "jedan sat" : "jednog sata";
        case "hh":
          return (a += 1 === e ? "sat" : 2 === e || 3 === e || 4 === e ? "sata" : "sati", a);
        case "dd":
          return (a += 1 === e ? "dan" : "dana", a);
        case "MM":
          return (a += 1 === e ? "mjesec" : 2 === e || 3 === e || 4 === e ? "mjeseca" : "mjeseci", a);
        case "yy":
          return (a += 1 === e ? "godina" : 2 === e || 3 === e || 4 === e ? "godine" : "godina", a);
      }
    }
    var n = e.defineLocale("bs", {
      months: ("januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar").split("_"),
      monthsShort: ("jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.").split("_"),
      monthsParseExact: !0,
      weekdays: ("nedjelja_ponedjeljak_utorak_srijeda_\u010detvrtak_petak_subota").split("_"),
      weekdaysShort: ("ned._pon._uto._sri._\u010det._pet._sub.").split("_"),
      weekdaysMin: ("ne_po_ut_sr_\u010de_pe_su").split("_"),
      weekdaysParseExact: !0,
      longDateFormat: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd, D. MMMM YYYY H:mm"
      },
      calendar: {
        sameDay: "[danas u] LT",
        nextDay: "[sutra u] LT",
        nextWeek: function () {
          switch (this.day()) {
            case 0:
              return "[u] [nedjelju] [u] LT";
            case 3:
              return "[u] [srijedu] [u] LT";
            case 6:
              return "[u] [subotu] [u] LT";
            case 1:
            case 2:
            case 4:
            case 5:
              return "[u] dddd [u] LT";
          }
        },
        lastDay: "[ju\u010der u] LT",
        lastWeek: function () {
          switch (this.day()) {
            case 0:
            case 3:
              return "[pro\u0161lu] dddd [u] LT";
            case 6:
              return "[pro\u0161le] [subote] [u] LT";
            case 1:
            case 2:
            case 4:
            case 5:
              return "[pro\u0161li] dddd [u] LT";
          }
        },
        sameElse: "L"
      },
      relativeTime: {
        future: "za %s",
        past: "prije %s",
        s: "par sekundi",
        ss: t,
        m: t,
        mm: t,
        h: t,
        hh: t,
        d: "dan",
        dd: t,
        M: "mjesec",
        MM: t,
        y: "godinu",
        yy: t
      },
      dayOfMonthOrdinalParse: /\d{1,2}\./,
      ordinal: "%d.",
      week: {
        dow: 1,
        doy: 7
      }
    });
    return n;
  });
})(module, exports, __r);
