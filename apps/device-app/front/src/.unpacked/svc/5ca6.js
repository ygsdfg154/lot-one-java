// webpack 模块 5ca6  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    var t = e.defineLocale("uz-latn", {
      months: ("Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr").split("_"),
      monthsShort: ("Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek").split("_"),
      weekdays: ("Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba").split("_"),
      weekdaysShort: ("Yak_Dush_Sesh_Chor_Pay_Jum_Shan").split("_"),
      weekdaysMin: ("Ya_Du_Se_Cho_Pa_Ju_Sha").split("_"),
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "D MMMM YYYY, dddd HH:mm"
      },
      calendar: {
        sameDay: "[Bugun soat] LT [da]",
        nextDay: "[Ertaga] LT [da]",
        nextWeek: "dddd [kuni soat] LT [da]",
        lastDay: "[Kecha soat] LT [da]",
        lastWeek: "[O'tgan] dddd [kuni soat] LT [da]",
        sameElse: "L"
      },
      relativeTime: {
        future: "Yaqin %s ichida",
        past: "Bir necha %s oldin",
        s: "soniya",
        ss: "%d soniya",
        m: "bir daqiqa",
        mm: "%d daqiqa",
        h: "bir soat",
        hh: "%d soat",
        d: "bir kun",
        dd: "%d kun",
        M: "bir oy",
        MM: "%d oy",
        y: "bir yil",
        yy: "%d yil"
      },
      week: {
        dow: 1,
        doy: 7
      }
    });
    return t;
  });
})(module, exports, __r);
