// webpack 模块 359a  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    var t = e.defineLocale("tet", {
      months: ("Janeiru_Fevereiru_Marsu_Abril_Maiu_Ju\xf1u_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru").split("_"),
      monthsShort: ("Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez").split("_"),
      weekdays: ("Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu").split("_"),
      weekdaysShort: ("Dom_Seg_Ters_Kua_Kint_Sest_Sab").split("_"),
      weekdaysMin: ("Do_Seg_Te_Ku_Ki_Ses_Sa").split("_"),
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      calendar: {
        sameDay: "[Ohin iha] LT",
        nextDay: "[Aban iha] LT",
        nextWeek: "dddd [iha] LT",
        lastDay: "[Horiseik iha] LT",
        lastWeek: "dddd [semana kotuk] [iha] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "iha %s",
        past: "%s liuba",
        s: "segundu balun",
        ss: "segundu %d",
        m: "minutu ida",
        mm: "minutu %d",
        h: "oras ida",
        hh: "oras %d",
        d: "loron ida",
        dd: "loron %d",
        M: "fulan ida",
        MM: "fulan %d",
        y: "tinan ida",
        yy: "tinan %d"
      },
      dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
      ordinal: function (e) {
        var t = e % 10, n = 1 === ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
        return e + n;
      },
      week: {
        dow: 1,
        doy: 4
      }
    });
    return t;
  });
})(module, exports, __r);
