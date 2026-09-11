// webpack 模块 32e6  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    var t = e.defineLocale("vi", {
      months: ("th\xe1ng 1_th\xe1ng 2_th\xe1ng 3_th\xe1ng 4_th\xe1ng 5_th\xe1ng 6_th\xe1ng 7_th\xe1ng 8_th\xe1ng 9_th\xe1ng 10_th\xe1ng 11_th\xe1ng 12").split("_"),
      monthsShort: ("Thg 01_Thg 02_Thg 03_Thg 04_Thg 05_Thg 06_Thg 07_Thg 08_Thg 09_Thg 10_Thg 11_Thg 12").split("_"),
      monthsParseExact: !0,
      weekdays: ("ch\u1ee7 nh\u1eadt_th\u1ee9 hai_th\u1ee9 ba_th\u1ee9 t\u01b0_th\u1ee9 n\u0103m_th\u1ee9 s\xe1u_th\u1ee9 b\u1ea3y").split("_"),
      weekdaysShort: ("CN_T2_T3_T4_T5_T6_T7").split("_"),
      weekdaysMin: ("CN_T2_T3_T4_T5_T6_T7").split("_"),
      weekdaysParseExact: !0,
      meridiemParse: /sa|ch/i,
      isPM: function (e) {
        return (/^ch$/i).test(e);
      },
      meridiem: function (e, t, n) {
        return e < 12 ? n ? "sa" : "SA" : n ? "ch" : "CH";
      },
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM [n\u0103m] YYYY",
        LLL: "D MMMM [n\u0103m] YYYY HH:mm",
        LLLL: "dddd, D MMMM [n\u0103m] YYYY HH:mm",
        l: "DD/M/YYYY",
        ll: "D MMM YYYY",
        lll: "D MMM YYYY HH:mm",
        llll: "ddd, D MMM YYYY HH:mm"
      },
      calendar: {
        sameDay: "[H\xf4m nay l\xfac] LT",
        nextDay: "[Ng\xe0y mai l\xfac] LT",
        nextWeek: "dddd [tu\u1ea7n t\u1edbi l\xfac] LT",
        lastDay: "[H\xf4m qua l\xfac] LT",
        lastWeek: "dddd [tu\u1ea7n tr\u01b0\u1edbc l\xfac] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "%s t\u1edbi",
        past: "%s tr\u01b0\u1edbc",
        s: "v\xe0i gi\xe2y",
        ss: "%d gi\xe2y",
        m: "m\u1ed9t ph\xfat",
        mm: "%d ph\xfat",
        h: "m\u1ed9t gi\u1edd",
        hh: "%d gi\u1edd",
        d: "m\u1ed9t ng\xe0y",
        dd: "%d ng\xe0y",
        w: "m\u1ed9t tu\u1ea7n",
        ww: "%d tu\u1ea7n",
        M: "m\u1ed9t th\xe1ng",
        MM: "%d th\xe1ng",
        y: "m\u1ed9t n\u0103m",
        yy: "%d n\u0103m"
      },
      dayOfMonthOrdinalParse: /\d{1,2}/,
      ordinal: function (e) {
        return e;
      },
      week: {
        dow: 1,
        doy: 4
      }
    });
    return t;
  });
})(module, exports, __r);
