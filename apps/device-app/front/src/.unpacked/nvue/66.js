// webpack 模块 66  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    function t(e, t, n, a) {
      var r = {
        s: ["m\xf5ne sekundi", "m\xf5ni sekund", "paar sekundit"],
        ss: [e + "sekundi", e + "sekundit"],
        m: ["\xfche minuti", "\xfcks minut"],
        mm: [e + " minuti", e + " minutit"],
        h: ["\xfche tunni", "tund aega", "\xfcks tund"],
        hh: [e + " tunni", e + " tundi"],
        d: ["\xfche p\xe4eva", "\xfcks p\xe4ev"],
        M: ["kuu aja", "kuu aega", "\xfcks kuu"],
        MM: [e + " kuu", e + " kuud"],
        y: ["\xfche aasta", "aasta", "\xfcks aasta"],
        yy: [e + " aasta", e + " aastat"]
      };
      return t ? r[n][2] ? r[n][2] : r[n][1] : a ? r[n][0] : r[n][1];
    }
    return e.defineLocale("et", {
      months: ("jaanuar_veebruar_m\xe4rts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember").split("_"),
      monthsShort: ("jaan_veebr_m\xe4rts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets").split("_"),
      weekdays: ("p\xfchap\xe4ev_esmasp\xe4ev_teisip\xe4ev_kolmap\xe4ev_neljap\xe4ev_reede_laup\xe4ev").split("_"),
      weekdaysShort: ("P_E_T_K_N_R_L").split("_"),
      weekdaysMin: ("P_E_T_K_N_R_L").split("_"),
      longDateFormat: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd, D. MMMM YYYY H:mm"
      },
      calendar: {
        sameDay: "[T\xe4na,] LT",
        nextDay: "[Homme,] LT",
        nextWeek: "[J\xe4rgmine] dddd LT",
        lastDay: "[Eile,] LT",
        lastWeek: "[Eelmine] dddd LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "%s p\xe4rast",
        past: "%s tagasi",
        s: t,
        ss: t,
        m: t,
        mm: t,
        h: t,
        hh: t,
        d: t,
        dd: "%d p\xe4eva",
        M: t,
        MM: t,
        y: t,
        yy: t
      },
      dayOfMonthOrdinalParse: /\d{1,2}\./,
      ordinal: "%d.",
      week: {
        dow: 1,
        doy: 4
      }
    });
  }, "object" === s(t) && void 0 !== e ? o(require("moment")) : (r = [require("moment")], void 0 === (i = "function" == typeof (a = o) ? a.apply(t, r) : a) || (e.exports = i)));
})(module, exports, __r);
