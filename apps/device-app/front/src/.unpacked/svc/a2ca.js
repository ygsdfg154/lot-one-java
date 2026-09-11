// webpack 模块 a2ca  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    function t(e, t, n, a) {
      var r = e + " ";
      switch (n) {
        case "s":
          return t || a ? "nekaj sekund" : "nekaj sekundami";
        case "ss":
          return (r += 1 === e ? t ? "sekundo" : "sekundi" : 2 === e ? t || a ? "sekundi" : "sekundah" : e < 5 ? t || a ? "sekunde" : "sekundah" : "sekund", r);
        case "m":
          return t ? "ena minuta" : "eno minuto";
        case "mm":
          return (r += 1 === e ? t ? "minuta" : "minuto" : 2 === e ? t || a ? "minuti" : "minutama" : e < 5 ? t || a ? "minute" : "minutami" : t || a ? "minut" : "minutami", r);
        case "h":
          return t ? "ena ura" : "eno uro";
        case "hh":
          return (r += 1 === e ? t ? "ura" : "uro" : 2 === e ? t || a ? "uri" : "urama" : e < 5 ? t || a ? "ure" : "urami" : t || a ? "ur" : "urami", r);
        case "d":
          return t || a ? "en dan" : "enim dnem";
        case "dd":
          return (r += 1 === e ? t || a ? "dan" : "dnem" : 2 === e ? t || a ? "dni" : "dnevoma" : t || a ? "dni" : "dnevi", r);
        case "M":
          return t || a ? "en mesec" : "enim mesecem";
        case "MM":
          return (r += 1 === e ? t || a ? "mesec" : "mesecem" : 2 === e ? t || a ? "meseca" : "mesecema" : e < 5 ? t || a ? "mesece" : "meseci" : t || a ? "mesecev" : "meseci", r);
        case "y":
          return t || a ? "eno leto" : "enim letom";
        case "yy":
          return (r += 1 === e ? t || a ? "leto" : "letom" : 2 === e ? t || a ? "leti" : "letoma" : e < 5 ? t || a ? "leta" : "leti" : t || a ? "let" : "leti", r);
      }
    }
    var n = e.defineLocale("sl", {
      months: ("januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december").split("_"),
      monthsShort: ("jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.").split("_"),
      monthsParseExact: !0,
      weekdays: ("nedelja_ponedeljek_torek_sreda_\u010detrtek_petek_sobota").split("_"),
      weekdaysShort: ("ned._pon._tor._sre._\u010det._pet._sob.").split("_"),
      weekdaysMin: ("ne_po_to_sr_\u010de_pe_so").split("_"),
      weekdaysParseExact: !0,
      longDateFormat: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD. MM. YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd, D. MMMM YYYY H:mm"
      },
      calendar: {
        sameDay: "[danes ob] LT",
        nextDay: "[jutri ob] LT",
        nextWeek: function () {
          switch (this.day()) {
            case 0:
              return "[v] [nedeljo] [ob] LT";
            case 3:
              return "[v] [sredo] [ob] LT";
            case 6:
              return "[v] [soboto] [ob] LT";
            case 1:
            case 2:
            case 4:
            case 5:
              return "[v] dddd [ob] LT";
          }
        },
        lastDay: "[v\u010deraj ob] LT",
        lastWeek: function () {
          switch (this.day()) {
            case 0:
              return "[prej\u0161njo] [nedeljo] [ob] LT";
            case 3:
              return "[prej\u0161njo] [sredo] [ob] LT";
            case 6:
              return "[prej\u0161njo] [soboto] [ob] LT";
            case 1:
            case 2:
            case 4:
            case 5:
              return "[prej\u0161nji] dddd [ob] LT";
          }
        },
        sameElse: "L"
      },
      relativeTime: {
        future: "\u010dez %s",
        past: "pred %s",
        s: t,
        ss: t,
        m: t,
        mm: t,
        h: t,
        hh: t,
        d: t,
        dd: t,
        M: t,
        MM: t,
        y: t,
        yy: t
      },
      dayOfMonthOrdinalParse: /\d{1,2}\./,
      ordinal: "%d.",
      week: {
        dow: 1,
        doy: 7
      }
    });
    return n;
  });
})(module, exports, __r);
