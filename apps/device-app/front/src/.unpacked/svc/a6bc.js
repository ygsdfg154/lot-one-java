// webpack 模块 a6bc  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    var t = e.defineLocale("sq", {
      months: ("Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_N\xebntor_Dhjetor").split("_"),
      monthsShort: ("Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_N\xebn_Dhj").split("_"),
      weekdays: ("E Diel_E H\xebn\xeb_E Mart\xeb_E M\xebrkur\xeb_E Enjte_E Premte_E Shtun\xeb").split("_"),
      weekdaysShort: ("Die_H\xebn_Mar_M\xebr_Enj_Pre_Sht").split("_"),
      weekdaysMin: ("D_H_Ma_M\xeb_E_P_Sh").split("_"),
      weekdaysParseExact: !0,
      meridiemParse: /PD|MD/,
      isPM: function (e) {
        return "M" === e.charAt(0);
      },
      meridiem: function (e, t, n) {
        return e < 12 ? "PD" : "MD";
      },
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      calendar: {
        sameDay: "[Sot n\xeb] LT",
        nextDay: "[Nes\xebr n\xeb] LT",
        nextWeek: "dddd [n\xeb] LT",
        lastDay: "[Dje n\xeb] LT",
        lastWeek: "dddd [e kaluar n\xeb] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "n\xeb %s",
        past: "%s m\xeb par\xeb",
        s: "disa sekonda",
        ss: "%d sekonda",
        m: "nj\xeb minut\xeb",
        mm: "%d minuta",
        h: "nj\xeb or\xeb",
        hh: "%d or\xeb",
        d: "nj\xeb dit\xeb",
        dd: "%d dit\xeb",
        M: "nj\xeb muaj",
        MM: "%d muaj",
        y: "nj\xeb vit",
        yy: "%d vite"
      },
      dayOfMonthOrdinalParse: /\d{1,2}\./,
      ordinal: "%d.",
      week: {
        dow: 1,
        doy: 4
      }
    });
    return t;
  });
})(module, exports, __r);
