// webpack 模块 61  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    return e.defineLocale("eo", {
      months: ("januaro_februaro_marto_aprilo_majo_junio_julio_a\u016dgusto_septembro_oktobro_novembro_decembro").split("_"),
      monthsShort: ("jan_feb_mart_apr_maj_jun_jul_a\u016dg_sept_okt_nov_dec").split("_"),
      weekdays: ("diman\u0109o_lundo_mardo_merkredo_\u0135a\u016ddo_vendredo_sabato").split("_"),
      weekdaysShort: ("dim_lun_mard_merk_\u0135a\u016d_ven_sab").split("_"),
      weekdaysMin: ("di_lu_ma_me_\u0135a_ve_sa").split("_"),
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "[la] D[-an de] MMMM, YYYY",
        LLL: "[la] D[-an de] MMMM, YYYY HH:mm",
        LLLL: "dddd[n], [la] D[-an de] MMMM, YYYY HH:mm",
        llll: "ddd, [la] D[-an de] MMM, YYYY HH:mm"
      },
      meridiemParse: /[ap]\.t\.m/i,
      isPM: function (e) {
        return "p" === e.charAt(0).toLowerCase();
      },
      meridiem: function (e, t, n) {
        return e > 11 ? n ? "p.t.m." : "P.T.M." : n ? "a.t.m." : "A.T.M.";
      },
      calendar: {
        sameDay: "[Hodia\u016d je] LT",
        nextDay: "[Morga\u016d je] LT",
        nextWeek: "dddd[n je] LT",
        lastDay: "[Hiera\u016d je] LT",
        lastWeek: "[pasintan] dddd[n je] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "post %s",
        past: "anta\u016d %s",
        s: "kelkaj sekundoj",
        ss: "%d sekundoj",
        m: "unu minuto",
        mm: "%d minutoj",
        h: "unu horo",
        hh: "%d horoj",
        d: "unu tago",
        dd: "%d tagoj",
        M: "unu monato",
        MM: "%d monatoj",
        y: "unu jaro",
        yy: "%d jaroj"
      },
      dayOfMonthOrdinalParse: /\d{1,2}a/,
      ordinal: "%da",
      week: {
        dow: 1,
        doy: 7
      }
    });
  }, "object" === s(t) && void 0 !== e ? o(require("moment")) : (r = [require("moment")], void 0 === (i = "function" == typeof (a = o) ? a.apply(t, r) : a) || (e.exports = i)));
})(module, exports, __r);
