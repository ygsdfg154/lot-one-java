// webpack 模块 85  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    var t = ("vas\xe1rnap h\xe9tf\u0151n kedden szerd\xe1n cs\xfct\xf6rt\xf6k\xf6n p\xe9nteken szombaton").split(" ");
    function n(e, t, n, a) {
      var r = e;
      switch (n) {
        case "s":
          return a || t ? "n\xe9h\xe1ny m\xe1sodperc" : "n\xe9h\xe1ny m\xe1sodperce";
        case "ss":
          return r + (a || t) ? " m\xe1sodperc" : " m\xe1sodperce";
        case "m":
          return "egy" + (a || t ? " perc" : " perce");
        case "mm":
          return r + (a || t ? " perc" : " perce");
        case "h":
          return "egy" + (a || t ? " \xf3ra" : " \xf3r\xe1ja");
        case "hh":
          return r + (a || t ? " \xf3ra" : " \xf3r\xe1ja");
        case "d":
          return "egy" + (a || t ? " nap" : " napja");
        case "dd":
          return r + (a || t ? " nap" : " napja");
        case "M":
          return "egy" + (a || t ? " h\xf3nap" : " h\xf3napja");
        case "MM":
          return r + (a || t ? " h\xf3nap" : " h\xf3napja");
        case "y":
          return "egy" + (a || t ? " \xe9v" : " \xe9ve");
        case "yy":
          return r + (a || t ? " \xe9v" : " \xe9ve");
      }
      return "";
    }
    function a(e) {
      return (e ? "" : "[m\xfalt] ") + "[" + t[this.day()] + "] LT[-kor]";
    }
    return e.defineLocale("hu", {
      months: ("janu\xe1r_febru\xe1r_m\xe1rcius_\xe1prilis_m\xe1jus_j\xfanius_j\xfalius_augusztus_szeptember_okt\xf3ber_november_december").split("_"),
      monthsShort: ("jan._feb._m\xe1rc._\xe1pr._m\xe1j._j\xfan._j\xfal._aug._szept._okt._nov._dec.").split("_"),
      monthsParseExact: !0,
      weekdays: ("vas\xe1rnap_h\xe9tf\u0151_kedd_szerda_cs\xfct\xf6rt\xf6k_p\xe9ntek_szombat").split("_"),
      weekdaysShort: ("vas_h\xe9t_kedd_sze_cs\xfct_p\xe9n_szo").split("_"),
      weekdaysMin: ("v_h_k_sze_cs_p_szo").split("_"),
      longDateFormat: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "YYYY.MM.DD.",
        LL: "YYYY. MMMM D.",
        LLL: "YYYY. MMMM D. H:mm",
        LLLL: "YYYY. MMMM D., dddd H:mm"
      },
      meridiemParse: /de|du/i,
      isPM: function (e) {
        return "u" === e.charAt(1).toLowerCase();
      },
      meridiem: function (e, t, n) {
        return e < 12 ? !0 === n ? "de" : "DE" : !0 === n ? "du" : "DU";
      },
      calendar: {
        sameDay: "[ma] LT[-kor]",
        nextDay: "[holnap] LT[-kor]",
        nextWeek: function () {
          return a.call(this, !0);
        },
        lastDay: "[tegnap] LT[-kor]",
        lastWeek: function () {
          return a.call(this, !1);
        },
        sameElse: "L"
      },
      relativeTime: {
        future: "%s m\xfalva",
        past: "%s",
        s: n,
        ss: n,
        m: n,
        mm: n,
        h: n,
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
  }, "object" === s(t) && void 0 !== e ? o(require("moment")) : (r = [require("moment")], void 0 === (i = "function" == typeof (a = o) ? a.apply(t, r) : a) || (e.exports = i)));
})(module, exports, __r);
