// webpack 模块 69  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    var t = ("nolla yksi kaksi kolme nelj\xe4 viisi kuusi seitsem\xe4n kahdeksan yhdeks\xe4n").split(" "), n = ["nolla", "yhden", "kahden", "kolmen", "nelj\xe4n", "viiden", "kuuden", t[7], t[8], t[9]];
    function a(e, a, r, i) {
      var o = "";
      switch (r) {
        case "s":
          return i ? "muutaman sekunnin" : "muutama sekunti";
        case "ss":
          o = i ? "sekunnin" : "sekuntia";
          break;
        case "m":
          return i ? "minuutin" : "minuutti";
        case "mm":
          o = i ? "minuutin" : "minuuttia";
          break;
        case "h":
          return i ? "tunnin" : "tunti";
        case "hh":
          o = i ? "tunnin" : "tuntia";
          break;
        case "d":
          return i ? "p\xe4iv\xe4n" : "p\xe4iv\xe4";
        case "dd":
          o = i ? "p\xe4iv\xe4n" : "p\xe4iv\xe4\xe4";
          break;
        case "M":
          return i ? "kuukauden" : "kuukausi";
        case "MM":
          o = i ? "kuukauden" : "kuukautta";
          break;
        case "y":
          return i ? "vuoden" : "vuosi";
        case "yy":
          o = i ? "vuoden" : "vuotta";
      }
      return o = (function (e, a) {
        return e < 10 ? a ? n[e] : t[e] : e;
      })(e, i) + " " + o;
    }
    return e.defineLocale("fi", {
      months: ("tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kes\xe4kuu_hein\xe4kuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu").split("_"),
      monthsShort: ("tammi_helmi_maalis_huhti_touko_kes\xe4_hein\xe4_elo_syys_loka_marras_joulu").split("_"),
      weekdays: ("sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai").split("_"),
      weekdaysShort: ("su_ma_ti_ke_to_pe_la").split("_"),
      weekdaysMin: ("su_ma_ti_ke_to_pe_la").split("_"),
      longDateFormat: {
        LT: "HH.mm",
        LTS: "HH.mm.ss",
        L: "DD.MM.YYYY",
        LL: "Do MMMM[ta] YYYY",
        LLL: "Do MMMM[ta] YYYY, [klo] HH.mm",
        LLLL: "dddd, Do MMMM[ta] YYYY, [klo] HH.mm",
        l: "D.M.YYYY",
        ll: "Do MMM YYYY",
        lll: "Do MMM YYYY, [klo] HH.mm",
        llll: "ddd, Do MMM YYYY, [klo] HH.mm"
      },
      calendar: {
        sameDay: "[t\xe4n\xe4\xe4n] [klo] LT",
        nextDay: "[huomenna] [klo] LT",
        nextWeek: "dddd [klo] LT",
        lastDay: "[eilen] [klo] LT",
        lastWeek: "[viime] dddd[na] [klo] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "%s p\xe4\xe4st\xe4",
        past: "%s sitten",
        s: a,
        ss: a,
        m: a,
        mm: a,
        h: a,
        hh: a,
        d: a,
        dd: a,
        M: a,
        MM: a,
        y: a,
        yy: a
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
