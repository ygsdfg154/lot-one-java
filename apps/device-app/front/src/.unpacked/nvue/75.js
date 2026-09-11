// webpack 模块 75  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    var t = ("jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.").split("_"), n = ("jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des").split("_");
    return e.defineLocale("fy", {
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
  }, "object" === s(t) && void 0 !== e ? o(require("moment")) : (r = [require("moment")], void 0 === (i = "function" == typeof (a = o) ? a.apply(t, r) : a) || (e.exports = i)));
})(module, exports, __r);
