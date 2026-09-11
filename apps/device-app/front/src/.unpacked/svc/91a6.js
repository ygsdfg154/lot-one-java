// webpack 模块 91a6  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    var t = e.defineLocale("sv", {
      months: ("januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december").split("_"),
      monthsShort: ("jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec").split("_"),
      weekdays: ("s\xf6ndag_m\xe5ndag_tisdag_onsdag_torsdag_fredag_l\xf6rdag").split("_"),
      weekdaysShort: ("s\xf6n_m\xe5n_tis_ons_tor_fre_l\xf6r").split("_"),
      weekdaysMin: ("s\xf6_m\xe5_ti_on_to_fr_l\xf6").split("_"),
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY [kl.] HH:mm",
        LLLL: "dddd D MMMM YYYY [kl.] HH:mm",
        lll: "D MMM YYYY HH:mm",
        llll: "ddd D MMM YYYY HH:mm"
      },
      calendar: {
        sameDay: "[Idag] LT",
        nextDay: "[Imorgon] LT",
        lastDay: "[Ig\xe5r] LT",
        nextWeek: "[P\xe5] dddd LT",
        lastWeek: "[I] dddd[s] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "om %s",
        past: "f\xf6r %s sedan",
        s: "n\xe5gra sekunder",
        ss: "%d sekunder",
        m: "en minut",
        mm: "%d minuter",
        h: "en timme",
        hh: "%d timmar",
        d: "en dag",
        dd: "%d dagar",
        M: "en m\xe5nad",
        MM: "%d m\xe5nader",
        y: "ett \xe5r",
        yy: "%d \xe5r"
      },
      dayOfMonthOrdinalParse: /\d{1,2}(\:e|\:a)/,
      ordinal: function (e) {
        var t = e % 10, n = 1 === ~~(e % 100 / 10) ? ":e" : 1 === t || 2 === t ? ":a" : ":e";
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
