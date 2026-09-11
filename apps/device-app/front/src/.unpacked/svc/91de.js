// webpack 模块 91de  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    function t(e) {
      return e % 100 === 11 || e % 10 !== 1;
    }
    function n(e, n, a, r) {
      var i = e + " ";
      switch (a) {
        case "s":
          return n || r ? "nokkrar sek\xfandur" : "nokkrum sek\xfandum";
        case "ss":
          return t(e) ? i + (n || r ? "sek\xfandur" : "sek\xfandum") : i + "sek\xfanda";
        case "m":
          return n ? "m\xedn\xfata" : "m\xedn\xfatu";
        case "mm":
          return t(e) ? i + (n || r ? "m\xedn\xfatur" : "m\xedn\xfatum") : n ? i + "m\xedn\xfata" : i + "m\xedn\xfatu";
        case "hh":
          return t(e) ? i + (n || r ? "klukkustundir" : "klukkustundum") : i + "klukkustund";
        case "d":
          return n ? "dagur" : r ? "dag" : "degi";
        case "dd":
          return t(e) ? n ? i + "dagar" : i + (r ? "daga" : "d\xf6gum") : n ? i + "dagur" : i + (r ? "dag" : "degi");
        case "M":
          return n ? "m\xe1nu\xf0ur" : r ? "m\xe1nu\xf0" : "m\xe1nu\xf0i";
        case "MM":
          return t(e) ? n ? i + "m\xe1nu\xf0ir" : i + (r ? "m\xe1nu\xf0i" : "m\xe1nu\xf0um") : n ? i + "m\xe1nu\xf0ur" : i + (r ? "m\xe1nu\xf0" : "m\xe1nu\xf0i");
        case "y":
          return n || r ? "\xe1r" : "\xe1ri";
        case "yy":
          return t(e) ? i + (n || r ? "\xe1r" : "\xe1rum") : i + (n || r ? "\xe1r" : "\xe1ri");
      }
    }
    var a = e.defineLocale("is", {
      months: ("jan\xfaar_febr\xfaar_mars_apr\xedl_ma\xed_j\xfan\xed_j\xfal\xed_\xe1g\xfast_september_okt\xf3ber_n\xf3vember_desember").split("_"),
      monthsShort: ("jan_feb_mar_apr_ma\xed_j\xfan_j\xfal_\xe1g\xfa_sep_okt_n\xf3v_des").split("_"),
      weekdays: ("sunnudagur_m\xe1nudagur_\xferi\xf0judagur_mi\xf0vikudagur_fimmtudagur_f\xf6studagur_laugardagur").split("_"),
      weekdaysShort: ("sun_m\xe1n_\xferi_mi\xf0_fim_f\xf6s_lau").split("_"),
      weekdaysMin: ("Su_M\xe1_\xder_Mi_Fi_F\xf6_La").split("_"),
      longDateFormat: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY [kl.] H:mm",
        LLLL: "dddd, D. MMMM YYYY [kl.] H:mm"
      },
      calendar: {
        sameDay: "[\xed dag kl.] LT",
        nextDay: "[\xe1 morgun kl.] LT",
        nextWeek: "dddd [kl.] LT",
        lastDay: "[\xed g\xe6r kl.] LT",
        lastWeek: "[s\xed\xf0asta] dddd [kl.] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "eftir %s",
        past: "fyrir %s s\xed\xf0an",
        s: n,
        ss: n,
        m: n,
        mm: n,
        h: "klukkustund",
        hh: n,
        d: n,
        dd: n,
        M: n,
        MM: n,
        y: n,
        yy: n
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
