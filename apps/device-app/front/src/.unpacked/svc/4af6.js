// webpack 模块 4af6  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    var t = e.defineLocale("it-ch", {
      months: ("gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre").split("_"),
      monthsShort: ("gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic").split("_"),
      weekdays: ("domenica_luned\xec_marted\xec_mercoled\xec_gioved\xec_venerd\xec_sabato").split("_"),
      weekdaysShort: ("dom_lun_mar_mer_gio_ven_sab").split("_"),
      weekdaysMin: ("do_lu_ma_me_gi_ve_sa").split("_"),
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd D MMMM YYYY HH:mm"
      },
      calendar: {
        sameDay: "[Oggi alle] LT",
        nextDay: "[Domani alle] LT",
        nextWeek: "dddd [alle] LT",
        lastDay: "[Ieri alle] LT",
        lastWeek: function () {
          switch (this.day()) {
            case 0:
              return "[la scorsa] dddd [alle] LT";
            default:
              return "[lo scorso] dddd [alle] LT";
          }
        },
        sameElse: "L"
      },
      relativeTime: {
        future: function (e) {
          return ((/^[0-9].+$/).test(e) ? "tra" : "in") + " " + e;
        },
        past: "%s fa",
        s: "alcuni secondi",
        ss: "%d secondi",
        m: "un minuto",
        mm: "%d minuti",
        h: "un'ora",
        hh: "%d ore",
        d: "un giorno",
        dd: "%d giorni",
        M: "un mese",
        MM: "%d mesi",
        y: "un anno",
        yy: "%d anni"
      },
      dayOfMonthOrdinalParse: /\d{1,2}\xba/,
      ordinal: "%d\xba",
      week: {
        dow: 1,
        doy: 4
      }
    });
    return t;
  });
})(module, exports, __r);
