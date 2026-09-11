// webpack 模块 9249  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    var t = e.defineLocale("fil", {
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
    return t;
  });
})(module, exports, __r);
