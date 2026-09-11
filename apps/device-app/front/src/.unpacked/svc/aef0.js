// webpack 模块 aef0  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    function t(e, t, n, a) {
      var r = {
        m: ["eng Minutt", "enger Minutt"],
        h: ["eng Stonn", "enger Stonn"],
        d: ["een Dag", "engem Dag"],
        M: ["ee Mount", "engem Mount"],
        y: ["ee Joer", "engem Joer"]
      };
      return t ? r[n][0] : r[n][1];
    }
    function n(e) {
      if ((e = parseInt(e, 10), isNaN(e))) return !1;
      if (e < 0) return !0;
      if (e < 10) return 4 <= e && e <= 7;
      if (e < 100) {
        var t = e % 10, a = e / 10;
        return n(0 === t ? a : t);
      }
      if (e < 1e4) {
        while (e >= 10) e /= 10;
        return n(e);
      }
      return (e /= 1e3, n(e));
    }
    var a = e.defineLocale("lb", {
      months: ("Januar_Februar_M\xe4erz_Abr\xebll_Mee_Juni_Juli_August_September_Oktober_November_Dezember").split("_"),
      monthsShort: ("Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.").split("_"),
      monthsParseExact: !0,
      weekdays: ("Sonndeg_M\xe9indeg_D\xebnschdeg_M\xebttwoch_Donneschdeg_Freideg_Samschdeg").split("_"),
      weekdaysShort: ("So._M\xe9._D\xeb._M\xeb._Do._Fr._Sa.").split("_"),
      weekdaysMin: ("So_M\xe9_D\xeb_M\xeb_Do_Fr_Sa").split("_"),
      weekdaysParseExact: !0,
      longDateFormat: {
        LT: "H:mm [Auer]",
        LTS: "H:mm:ss [Auer]",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm [Auer]",
        LLLL: "dddd, D. MMMM YYYY H:mm [Auer]"
      },
      calendar: {
        sameDay: "[Haut um] LT",
        sameElse: "L",
        nextDay: "[Muer um] LT",
        nextWeek: "dddd [um] LT",
        lastDay: "[G\xebschter um] LT",
        lastWeek: function () {
          switch (this.day()) {
            case 2:
            case 4:
              return "[Leschten] dddd [um] LT";
            default:
              return "[Leschte] dddd [um] LT";
          }
        }
      },
      relativeTime: {
        future: function (e) {
          var t = e.substr(0, e.indexOf(" "));
          return n(t) ? "a " + e : "an " + e;
        },
        past: function (e) {
          var t = e.substr(0, e.indexOf(" "));
          return n(t) ? "viru " + e : "virun " + e;
        },
        s: "e puer Sekonnen",
        ss: "%d Sekonnen",
        m: t,
        mm: "%d Minutten",
        h: t,
        hh: "%d Stonnen",
        d: t,
        dd: "%d Deeg",
        M: t,
        MM: "%d M\xe9int",
        y: t,
        yy: "%d Joer"
      },
      dayOfMonthOrdinalParse: /\d{1,2}\./,
      ordinal: "%d.",
      week: {
        dow: 1,
        doy: 4
      }
    });
    return a;
  });
})(module, exports, __r);
