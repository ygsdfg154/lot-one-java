// webpack 模块 42  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    function t(e, t, n) {
      var a = e + " ";
      switch (n) {
        case "ss":
          return a += 1 === e ? "sekunda" : 2 === e || 3 === e || 4 === e ? "sekunde" : "sekundi";
        case "m":
          return t ? "jedna minuta" : "jedne minute";
        case "mm":
          return a += 1 === e ? "minuta" : 2 === e || 3 === e || 4 === e ? "minute" : "minuta";
        case "h":
          return t ? "jedan sat" : "jednog sata";
        case "hh":
          return a += 1 === e ? "sat" : 2 === e || 3 === e || 4 === e ? "sata" : "sati";
        case "dd":
          return a += 1 === e ? "dan" : "dana";
        case "MM":
          return a += 1 === e ? "mjesec" : 2 === e || 3 === e || 4 === e ? "mjeseca" : "mjeseci";
        case "yy":
          return a += 1 === e ? "godina" : 2 === e || 3 === e || 4 === e ? "godine" : "godina";
      }
    }
    return e.defineLocale("bs", {
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
  }, "object" === s(t) && void 0 !== e ? o(require("moment")) : (r = [require("moment")], void 0 === (i = "function" == typeof (a = o) ? a.apply(t, r) : a) || (e.exports = i)));
})(module, exports, __r);
