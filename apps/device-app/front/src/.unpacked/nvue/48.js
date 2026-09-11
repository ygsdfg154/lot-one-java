// webpack 模块 48  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    function t(e, t, n, a) {
      var r = {
        m: ["eine Minute", "einer Minute"],
        h: ["eine Stunde", "einer Stunde"],
        d: ["ein Tag", "einem Tag"],
        dd: [e + " Tage", e + " Tagen"],
        w: ["eine Woche", "einer Woche"],
        M: ["ein Monat", "einem Monat"],
        MM: [e + " Monate", e + " Monaten"],
        y: ["ein Jahr", "einem Jahr"],
        yy: [e + " Jahre", e + " Jahren"]
      };
      return t ? r[n][0] : r[n][1];
    }
    return e.defineLocale("de", {
      months: ("Januar_Februar_M\xe4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember").split("_"),
      monthsShort: ("Jan._Feb._M\xe4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.").split("_"),
      monthsParseExact: !0,
      weekdays: ("Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag").split("_"),
      weekdaysShort: ("So._Mo._Di._Mi._Do._Fr._Sa.").split("_"),
      weekdaysMin: ("So_Mo_Di_Mi_Do_Fr_Sa").split("_"),
      weekdaysParseExact: !0,
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY HH:mm",
        LLLL: "dddd, D. MMMM YYYY HH:mm"
      },
      calendar: {
        sameDay: "[heute um] LT [Uhr]",
        sameElse: "L",
        nextDay: "[morgen um] LT [Uhr]",
        nextWeek: "dddd [um] LT [Uhr]",
        lastDay: "[gestern um] LT [Uhr]",
        lastWeek: "[letzten] dddd [um] LT [Uhr]"
      },
      relativeTime: {
        future: "in %s",
        past: "vor %s",
        s: "ein paar Sekunden",
        ss: "%d Sekunden",
        m: t,
        mm: "%d Minuten",
        h: t,
        hh: "%d Stunden",
        d: t,
        dd: t,
        w: t,
        ww: "%d Wochen",
        M: t,
        MM: t,
        y: t,
        yy: t
      },
      dayOfMonthOrdinalParse: /\d{1,2}\./,
      ordinal: "%d.",
      week: {
        dow: 1,
        doy: 4
      }
    });
  }, "object" === s(t) && void 0 !== e ? o(require("moment")) : (r = [require("moment")], void 0 === (i = "function" == typeof (a = o) ? a.apply(t, r) : a) || (e.exports = i)));
})(module, exports, __r);
