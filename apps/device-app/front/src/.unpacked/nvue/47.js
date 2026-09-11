// webpack 模块 47  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    return e.defineLocale("da", {
      months: ("januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december").split("_"),
      monthsShort: ("jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec").split("_"),
      weekdays: ("s\xf8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\xf8rdag").split("_"),
      weekdaysShort: ("s\xf8n_man_tir_ons_tor_fre_l\xf8r").split("_"),
      weekdaysMin: ("s\xf8_ma_ti_on_to_fr_l\xf8").split("_"),
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY HH:mm",
        LLLL: "dddd [d.] D. MMMM YYYY [kl.] HH:mm"
      },
      calendar: {
        sameDay: "[i dag kl.] LT",
        nextDay: "[i morgen kl.] LT",
        nextWeek: "p\xe5 dddd [kl.] LT",
        lastDay: "[i g\xe5r kl.] LT",
        lastWeek: "[i] dddd[s kl.] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "om %s",
        past: "%s siden",
        s: "f\xe5 sekunder",
        ss: "%d sekunder",
        m: "et minut",
        mm: "%d minutter",
        h: "en time",
        hh: "%d timer",
        d: "en dag",
        dd: "%d dage",
        M: "en m\xe5ned",
        MM: "%d m\xe5neder",
        y: "et \xe5r",
        yy: "%d \xe5r"
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
