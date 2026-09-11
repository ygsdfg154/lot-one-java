// webpack 模块 3675  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    var t = e.defineLocale("gd", {
      months: ["Am Faoilleach", "An Gearran", "Am M\xe0rt", "An Giblean", "An C\xe8itean", "An t-\xd2gmhios", "An t-Iuchar", "An L\xf9nastal", "An t-Sultain", "An D\xe0mhair", "An t-Samhain", "An D\xf9bhlachd"],
      monthsShort: ["Faoi", "Gear", "M\xe0rt", "Gibl", "C\xe8it", "\xd2gmh", "Iuch", "L\xf9n", "Sult", "D\xe0mh", "Samh", "D\xf9bh"],
      monthsParseExact: !0,
      weekdays: ["Did\xf2mhnaich", "Diluain", "Dim\xe0irt", "Diciadain", "Diardaoin", "Dihaoine", "Disathairne"],
      weekdaysShort: ["Did", "Dil", "Dim", "Dic", "Dia", "Dih", "Dis"],
      weekdaysMin: ["D\xf2", "Lu", "M\xe0", "Ci", "Ar", "Ha", "Sa"],
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      calendar: {
        sameDay: "[An-diugh aig] LT",
        nextDay: "[A-m\xe0ireach aig] LT",
        nextWeek: "dddd [aig] LT",
        lastDay: "[An-d\xe8 aig] LT",
        lastWeek: "dddd [seo chaidh] [aig] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "ann an %s",
        past: "bho chionn %s",
        s: "beagan diogan",
        ss: "%d diogan",
        m: "mionaid",
        mm: "%d mionaidean",
        h: "uair",
        hh: "%d uairean",
        d: "latha",
        dd: "%d latha",
        M: "m\xecos",
        MM: "%d m\xecosan",
        y: "bliadhna",
        yy: "%d bliadhna"
      },
      dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/,
      ordinal: function (e) {
        var t = 1 === e ? "d" : e % 10 === 2 ? "na" : "mh";
        return e + t;
      },
      week: {
        dow: 1,
        doy: 4
      }
    });
    return t;
  });
})(module, exports, __r);
