// webpack 模块 c4380  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    var t = e.defineLocale("af", {
      months: ("Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember").split("_"),
      monthsShort: ("Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des").split("_"),
      weekdays: ("Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag").split("_"),
      weekdaysShort: ("Son_Maa_Din_Woe_Don_Vry_Sat").split("_"),
      weekdaysMin: ("So_Ma_Di_Wo_Do_Vr_Sa").split("_"),
      meridiemParse: /vm|nm/i,
      isPM: function (e) {
        return (/^nm$/i).test(e);
      },
      meridiem: function (e, t, n) {
        return e < 12 ? n ? "vm" : "VM" : n ? "nm" : "NM";
      },
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      calendar: {
        sameDay: "[Vandag om] LT",
        nextDay: "[M\xf4re om] LT",
        nextWeek: "dddd [om] LT",
        lastDay: "[Gister om] LT",
        lastWeek: "[Laas] dddd [om] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "oor %s",
        past: "%s gelede",
        s: "'n paar sekondes",
        ss: "%d sekondes",
        m: "'n minuut",
        mm: "%d minute",
        h: "'n uur",
        hh: "%d ure",
        d: "'n dag",
        dd: "%d dae",
        M: "'n maand",
        MM: "%d maande",
        y: "'n jaar",
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
    return t;
  });
})(module, exports, __r);
