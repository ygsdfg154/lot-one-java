// webpack 模块 129  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    var t = ("janu\xe1r_febru\xe1r_marec_apr\xedl_m\xe1j_j\xfan_j\xfal_august_september_okt\xf3ber_november_december").split("_"), n = ("jan_feb_mar_apr_m\xe1j_j\xfan_j\xfal_aug_sep_okt_nov_dec").split("_");
    function a(e) {
      return e > 1 && e < 5;
    }
    function r(e, t, n, r) {
      var i = e + " ";
      switch (n) {
        case "s":
          return t || r ? "p\xe1r sek\xfand" : "p\xe1r sekundami";
        case "ss":
          return t || r ? i + (a(e) ? "sekundy" : "sek\xfand") : i + "sekundami";
        case "m":
          return t ? "min\xfata" : r ? "min\xfatu" : "min\xfatou";
        case "mm":
          return t || r ? i + (a(e) ? "min\xfaty" : "min\xfat") : i + "min\xfatami";
        case "h":
          return t ? "hodina" : r ? "hodinu" : "hodinou";
        case "hh":
          return t || r ? i + (a(e) ? "hodiny" : "hod\xedn") : i + "hodinami";
        case "d":
          return t || r ? "de\u0148" : "d\u0148om";
        case "dd":
          return t || r ? i + (a(e) ? "dni" : "dn\xed") : i + "d\u0148ami";
        case "M":
          return t || r ? "mesiac" : "mesiacom";
        case "MM":
          return t || r ? i + (a(e) ? "mesiace" : "mesiacov") : i + "mesiacmi";
        case "y":
          return t || r ? "rok" : "rokom";
        case "yy":
          return t || r ? i + (a(e) ? "roky" : "rokov") : i + "rokmi";
      }
    }
    return e.defineLocale("sk", {
      months: t,
      monthsShort: n,
      weekdays: ("nede\u013ea_pondelok_utorok_streda_\u0161tvrtok_piatok_sobota").split("_"),
      weekdaysShort: ("ne_po_ut_st_\u0161t_pi_so").split("_"),
      weekdaysMin: ("ne_po_ut_st_\u0161t_pi_so").split("_"),
      longDateFormat: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd D. MMMM YYYY H:mm"
      },
      calendar: {
        sameDay: "[dnes o] LT",
        nextDay: "[zajtra o] LT",
        nextWeek: function () {
          switch (this.day()) {
            case 0:
              return "[v nede\u013eu o] LT";
            case 1:
            case 2:
              return "[v] dddd [o] LT";
            case 3:
              return "[v stredu o] LT";
            case 4:
              return "[vo \u0161tvrtok o] LT";
            case 5:
              return "[v piatok o] LT";
            case 6:
              return "[v sobotu o] LT";
          }
        },
        lastDay: "[v\u010dera o] LT",
        lastWeek: function () {
          switch (this.day()) {
            case 0:
              return "[minul\xfa nede\u013eu o] LT";
            case 1:
            case 2:
              return "[minul\xfd] dddd [o] LT";
            case 3:
              return "[minul\xfa stredu o] LT";
            case 4:
            case 5:
              return "[minul\xfd] dddd [o] LT";
            case 6:
              return "[minul\xfa sobotu o] LT";
          }
        },
        sameElse: "L"
      },
      relativeTime: {
        future: "za %s",
        past: "pred %s",
        s: r,
        ss: r,
        m: r,
        mm: r,
        h: r,
        hh: r,
        d: r,
        dd: r,
        M: r,
        MM: r,
        y: r,
        yy: r
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
