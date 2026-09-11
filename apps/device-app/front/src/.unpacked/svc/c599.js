// webpack 模块 c599  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    var t = ("jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.").split("_"), n = ("jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des").split("_"), a = e.defineLocale("fy", {
      months: ("jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber").split("_"),
      monthsShort: function (e, a) {
        return e ? (/-MMM-/).test(a) ? n[e.month()] : t[e.month()] : t;
      },
      monthsParseExact: !0,
      weekdays: ("snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon").split("_"),
      weekdaysShort: ("si._mo._ti._wo._to._fr._so.").split("_"),
      weekdaysMin: ("Si_Mo_Ti_Wo_To_Fr_So").split("_"),
      weekdaysParseExact: !0,
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD-MM-YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      calendar: {
        sameDay: "[hjoed om] LT",
        nextDay: "[moarn om] LT",
        nextWeek: "dddd [om] LT",
        lastDay: "[juster om] LT",
        lastWeek: "[\xf4fr\xfbne] dddd [om] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "oer %s",
        past: "%s lyn",
        s: "in pear sekonden",
        ss: "%d sekonden",
        m: "ien min\xfat",
        mm: "%d minuten",
        h: "ien oere",
        hh: "%d oeren",
        d: "ien dei",
        dd: "%d dagen",
        M: "ien moanne",
        MM: "%d moannen",
        y: "ien jier",
        yy: "%d jierren"
      },
      dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
      ordinal: function (e) {
        return e + (1 === e || 8 === e || e >= 20 ? "ste" : "de");
      },
      week: {
        dow: 1,
        doy: 4
      }
    });
    return a;
  });
})(module, exports, __r);
