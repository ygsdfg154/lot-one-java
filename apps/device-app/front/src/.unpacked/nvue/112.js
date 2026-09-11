// webpack 模块 112  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    return e.defineLocale("mt", {
      months: ("Jannar_Frar_Marzu_April_Mejju_\u0120unju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Di\u010bembru").split("_"),
      monthsShort: ("Jan_Fra_Mar_Apr_Mej_\u0120un_Lul_Aww_Set_Ott_Nov_Di\u010b").split("_"),
      weekdays: ("Il-\u0126add_It-Tnejn_It-Tlieta_L-Erbg\u0127a_Il-\u0126amis_Il-\u0120img\u0127a_Is-Sibt").split("_"),
      weekdaysShort: ("\u0126ad_Tne_Tli_Erb_\u0126am_\u0120im_Sib").split("_"),
      weekdaysMin: ("\u0126a_Tn_Tl_Er_\u0126a_\u0120i_Si").split("_"),
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      calendar: {
        sameDay: "[Illum fil-]LT",
        nextDay: "[G\u0127ada fil-]LT",
        nextWeek: "dddd [fil-]LT",
        lastDay: "[Il-biera\u0127 fil-]LT",
        lastWeek: "dddd [li g\u0127adda] [fil-]LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "f\u2019 %s",
        past: "%s ilu",
        s: "ftit sekondi",
        ss: "%d sekondi",
        m: "minuta",
        mm: "%d minuti",
        h: "sieg\u0127a",
        hh: "%d sieg\u0127at",
        d: "\u0121urnata",
        dd: "%d \u0121ranet",
        M: "xahar",
        MM: "%d xhur",
        y: "sena",
        yy: "%d sni"
      },
      dayOfMonthOrdinalParse: /\d{1,2}\xba/,
      ordinal: "%d\xba",
      week: {
        dow: 1,
        doy: 4
      }
    });
  }, "object" === s(t) && void 0 !== e ? o(require("moment")) : (r = [require("moment")], void 0 === (i = "function" == typeof (a = o) ? a.apply(t, r) : a) || (e.exports = i)));
})(module, exports, __r);
