// webpack 模块 c5b7  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    var t = e.defineLocale("eu", {
      months: ("urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua").split("_"),
      monthsShort: ("urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.").split("_"),
      monthsParseExact: !0,
      weekdays: ("igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata").split("_"),
      weekdaysShort: ("ig._al._ar._az._og._ol._lr.").split("_"),
      weekdaysMin: ("ig_al_ar_az_og_ol_lr").split("_"),
      weekdaysParseExact: !0,
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "YYYY[ko] MMMM[ren] D[a]",
        LLL: "YYYY[ko] MMMM[ren] D[a] HH:mm",
        LLLL: "dddd, YYYY[ko] MMMM[ren] D[a] HH:mm",
        l: "YYYY-M-D",
        ll: "YYYY[ko] MMM D[a]",
        lll: "YYYY[ko] MMM D[a] HH:mm",
        llll: "ddd, YYYY[ko] MMM D[a] HH:mm"
      },
      calendar: {
        sameDay: "[gaur] LT[etan]",
        nextDay: "[bihar] LT[etan]",
        nextWeek: "dddd LT[etan]",
        lastDay: "[atzo] LT[etan]",
        lastWeek: "[aurreko] dddd LT[etan]",
        sameElse: "L"
      },
      relativeTime: {
        future: "%s barru",
        past: "duela %s",
        s: "segundo batzuk",
        ss: "%d segundo",
        m: "minutu bat",
        mm: "%d minutu",
        h: "ordu bat",
        hh: "%d ordu",
        d: "egun bat",
        dd: "%d egun",
        M: "hilabete bat",
        MM: "%d hilabete",
        y: "urte bat",
        yy: "%d urte"
      },
      dayOfMonthOrdinalParse: /\d{1,2}\./,
      ordinal: "%d.",
      week: {
        dow: 1,
        doy: 7
      }
    });
    return t;
  });
})(module, exports, __r);
