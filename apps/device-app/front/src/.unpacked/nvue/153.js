// webpack 模块 153  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    return e.defineLocale("uz-latn", {
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
  }, "object" === s(t) && void 0 !== e ? o(require("moment")) : (r = [require("moment")], void 0 === (i = "function" == typeof (a = o) ? a.apply(t, r) : a) || (e.exports = i)));
})(module, exports, __r);
