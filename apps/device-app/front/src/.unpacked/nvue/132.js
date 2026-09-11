// webpack 模块 132  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    var t = {
      words: {
        ss: ["sekunda", "sekunde", "sekundi"],
        m: ["jedan minut", "jednog minuta"],
        mm: ["minut", "minuta", "minuta"],
        h: ["jedan sat", "jednog sata"],
        hh: ["sat", "sata", "sati"],
        d: ["jedan dan", "jednog dana"],
        dd: ["dan", "dana", "dana"],
        M: ["jedan mesec", "jednog meseca"],
        MM: ["mesec", "meseca", "meseci"],
        y: ["jednu godinu", "jedne godine"],
        yy: ["godinu", "godine", "godina"]
      },
      correctGrammaticalCase: function (e, t) {
        return e % 10 >= 1 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? e % 10 == 1 ? t[0] : t[1] : t[2];
      },
      translate: function (e, n, a, r) {
        var i, o = t.words[a];
        return 1 === a.length ? "y" === a && n ? "jedna godina" : r || n ? o[0] : o[1] : (i = t.correctGrammaticalCase(e, o), "yy" === a && n && "godinu" === i ? e + " godina" : e + " " + i);
      }
    };
    return e.defineLocale("sr", {
      months: ("januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar").split("_"),
      monthsShort: ("jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.").split("_"),
      monthsParseExact: !0,
      weekdays: ("nedelja_ponedeljak_utorak_sreda_\u010detvrtak_petak_subota").split("_"),
      weekdaysShort: ("ned._pon._uto._sre._\u010det._pet._sub.").split("_"),
      weekdaysMin: ("ne_po_ut_sr_\u010de_pe_su").split("_"),
      weekdaysParseExact: !0,
      longDateFormat: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "D. M. YYYY.",
        LL: "D. MMMM YYYY.",
        LLL: "D. MMMM YYYY. H:mm",
        LLLL: "dddd, D. MMMM YYYY. H:mm"
      },
      calendar: {
        sameDay: "[danas u] LT",
        nextDay: "[sutra u] LT",
        nextWeek: function () {
          switch (this.day()) {
            case 0:
              return "[u] [nedelju] [u] LT";
            case 3:
              return "[u] [sredu] [u] LT";
            case 6:
              return "[u] [subotu] [u] LT";
            case 1:
            case 2:
            case 4:
            case 5:
              return "[u] dddd [u] LT";
          }
        },
        lastDay: "[ju\u010de u] LT",
        lastWeek: function () {
          return ["[pro\u0161le] [nedelje] [u] LT", "[pro\u0161log] [ponedeljka] [u] LT", "[pro\u0161log] [utorka] [u] LT", "[pro\u0161le] [srede] [u] LT", "[pro\u0161log] [\u010detvrtka] [u] LT", "[pro\u0161log] [petka] [u] LT", "[pro\u0161le] [subote] [u] LT"][this.day()];
        },
        sameElse: "L"
      },
      relativeTime: {
        future: "za %s",
        past: "pre %s",
        s: "nekoliko sekundi",
        ss: t.translate,
        m: t.translate,
        mm: t.translate,
        h: t.translate,
        hh: t.translate,
        d: t.translate,
        dd: t.translate,
        M: t.translate,
        MM: t.translate,
        y: t.translate,
        yy: t.translate
      },
      dayOfMonthOrdinalParse: /\d{1,2}\./,
      ordinal: "%d.",
      week: {
        dow: 1,
        doy: 7
      }
    });
  }, "object" === s(t) && void 0 !== e ? o(require("moment")) : (r = [require("moment")], void 0 === (i = "function" == typeof (a = o) ? a.apply(t, r) : a) || (e.exports = i)));
})(module, exports, __r);
