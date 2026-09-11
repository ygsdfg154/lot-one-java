// webpack 模块 39bf  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    var t = ("jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.").split("_"), n = ("jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec").split("_"), a = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i], r = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i, i = e.defineLocale("nl", {
      months: ("januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december").split("_"),
      monthsShort: function (e, a) {
        return e ? (/-MMM-/).test(a) ? n[e.month()] : t[e.month()] : t;
      },
      monthsRegex: r,
      monthsShortRegex: r,
      monthsStrictRegex: /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i,
      monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
      monthsParse: a,
      longMonthsParse: a,
      shortMonthsParse: a,
      weekdays: ("zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag").split("_"),
      weekdaysShort: ("zo._ma._di._wo._do._vr._za.").split("_"),
      weekdaysMin: ("zo_ma_di_wo_do_vr_za").split("_"),
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
        sameDay: "[vandaag om] LT",
        nextDay: "[morgen om] LT",
        nextWeek: "dddd [om] LT",
        lastDay: "[gisteren om] LT",
        lastWeek: "[afgelopen] dddd [om] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "over %s",
        past: "%s geleden",
        s: "een paar seconden",
        ss: "%d seconden",
        m: "\xe9\xe9n minuut",
        mm: "%d minuten",
        h: "\xe9\xe9n uur",
        hh: "%d uur",
        d: "\xe9\xe9n dag",
        dd: "%d dagen",
        w: "\xe9\xe9n week",
        ww: "%d weken",
        M: "\xe9\xe9n maand",
        MM: "%d maanden",
        y: "\xe9\xe9n jaar",
        yy: "%d jaar"
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
    return i;
  });
})(module, exports, __r);
