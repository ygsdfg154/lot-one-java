// webpack 模块 136  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    return e.defineLocale("sw", {
      months: ("Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba").split("_"),
      monthsShort: ("Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des").split("_"),
      weekdays: ("Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi").split("_"),
      weekdaysShort: ("Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos").split("_"),
      weekdaysMin: ("J2_J3_J4_J5_Al_Ij_J1").split("_"),
      weekdaysParseExact: !0,
      longDateFormat: {
        LT: "hh:mm A",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      calendar: {
        sameDay: "[leo saa] LT",
        nextDay: "[kesho saa] LT",
        nextWeek: "[wiki ijayo] dddd [saat] LT",
        lastDay: "[jana] LT",
        lastWeek: "[wiki iliyopita] dddd [saat] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "%s baadaye",
        past: "tokea %s",
        s: "hivi punde",
        ss: "sekunde %d",
        m: "dakika moja",
        mm: "dakika %d",
        h: "saa limoja",
        hh: "masaa %d",
        d: "siku moja",
        dd: "siku %d",
        M: "mwezi mmoja",
        MM: "miezi %d",
        y: "mwaka mmoja",
        yy: "miaka %d"
      },
      week: {
        dow: 1,
        doy: 7
      }
    });
  }, "object" === s(t) && void 0 !== e ? o(require("moment")) : (r = [require("moment")], void 0 === (i = "function" == typeof (a = o) ? a.apply(t, r) : a) || (e.exports = i)));
})(module, exports, __r);
