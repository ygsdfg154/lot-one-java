// webpack 模块 70  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    return e.defineLocale("fil", {
      months: ("Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre").split("_"),
      monthsShort: ("Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis").split("_"),
      weekdays: ("Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado").split("_"),
      weekdaysShort: ("Lin_Lun_Mar_Miy_Huw_Biy_Sab").split("_"),
      weekdaysMin: ("Li_Lu_Ma_Mi_Hu_Bi_Sab").split("_"),
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "MM/D/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY HH:mm",
        LLLL: "dddd, MMMM DD, YYYY HH:mm"
      },
      calendar: {
        sameDay: "LT [ngayong araw]",
        nextDay: "[Bukas ng] LT",
        nextWeek: "LT [sa susunod na] dddd",
        lastDay: "LT [kahapon]",
        lastWeek: "LT [noong nakaraang] dddd",
        sameElse: "L"
      },
      relativeTime: {
        future: "sa loob ng %s",
        past: "%s ang nakalipas",
        s: "ilang segundo",
        ss: "%d segundo",
        m: "isang minuto",
        mm: "%d minuto",
        h: "isang oras",
        hh: "%d oras",
        d: "isang araw",
        dd: "%d araw",
        M: "isang buwan",
        MM: "%d buwan",
        y: "isang taon",
        yy: "%d taon"
      },
      dayOfMonthOrdinalParse: /\d{1,2}/,
      ordinal: function (e) {
        return e;
      },
      week: {
        dow: 1,
        doy: 4
      }
    });
  }, "object" === s(t) && void 0 !== e ? o(require("moment")) : (r = [require("moment")], void 0 === (i = "function" == typeof (a = o) ? a.apply(t, r) : a) || (e.exports = i)));
})(module, exports, __r);
