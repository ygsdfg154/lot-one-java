// webpack 模块 76  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    return e.defineLocale("ga", {
      months: ["Ean\xe1ir", "Feabhra", "M\xe1rta", "Aibre\xe1n", "Bealtaine", "Meitheamh", "I\xfail", "L\xfanasa", "Me\xe1n F\xf3mhair", "Deireadh F\xf3mhair", "Samhain", "Nollaig"],
      monthsShort: ["Ean", "Feabh", "M\xe1rt", "Aib", "Beal", "Meith", "I\xfail", "L\xfan", "M.F.", "D.F.", "Samh", "Noll"],
      monthsParseExact: !0,
      weekdays: ["D\xe9 Domhnaigh", "D\xe9 Luain", "D\xe9 M\xe1irt", "D\xe9 C\xe9adaoin", "D\xe9ardaoin", "D\xe9 hAoine", "D\xe9 Sathairn"],
      weekdaysShort: ["Domh", "Luan", "M\xe1irt", "C\xe9ad", "D\xe9ar", "Aoine", "Sath"],
      weekdaysMin: ["Do", "Lu", "M\xe1", "C\xe9", "D\xe9", "A", "Sa"],
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      calendar: {
        sameDay: "[Inniu ag] LT",
        nextDay: "[Am\xe1rach ag] LT",
        nextWeek: "dddd [ag] LT",
        lastDay: "[Inn\xe9 ag] LT",
        lastWeek: "dddd [seo caite] [ag] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "i %s",
        past: "%s \xf3 shin",
        s: "c\xfapla soicind",
        ss: "%d soicind",
        m: "n\xf3im\xe9ad",
        mm: "%d n\xf3im\xe9ad",
        h: "uair an chloig",
        hh: "%d uair an chloig",
        d: "l\xe1",
        dd: "%d l\xe1",
        M: "m\xed",
        MM: "%d m\xedonna",
        y: "bliain",
        yy: "%d bliain"
      },
      dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/,
      ordinal: function (e) {
        return e + (1 === e ? "d" : e % 10 == 2 ? "na" : "mh");
      },
      week: {
        dow: 1,
        doy: 4
      }
    });
  }, "object" === s(t) && void 0 !== e ? o(require("moment")) : (r = [require("moment")], void 0 === (i = "function" == typeof (a = o) ? a.apply(t, r) : a) || (e.exports = i)));
})(module, exports, __r);
