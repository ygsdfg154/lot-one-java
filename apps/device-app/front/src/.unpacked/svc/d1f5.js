// webpack 模块 d1f5  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    var t = e.defineLocale("ss", {
      months: ("Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni").split("_"),
      monthsShort: ("Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo").split("_"),
      weekdays: ("Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo").split("_"),
      weekdaysShort: ("Lis_Umb_Lsb_Les_Lsi_Lsh_Umg").split("_"),
      weekdaysMin: ("Li_Us_Lb_Lt_Ls_Lh_Ug").split("_"),
      weekdaysParseExact: !0,
      longDateFormat: {
        LT: "h:mm A",
        LTS: "h:mm:ss A",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY h:mm A",
        LLLL: "dddd, D MMMM YYYY h:mm A"
      },
      calendar: {
        sameDay: "[Namuhla nga] LT",
        nextDay: "[Kusasa nga] LT",
        nextWeek: "dddd [nga] LT",
        lastDay: "[Itolo nga] LT",
        lastWeek: "dddd [leliphelile] [nga] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "nga %s",
        past: "wenteka nga %s",
        s: "emizuzwana lomcane",
        ss: "%d mzuzwana",
        m: "umzuzu",
        mm: "%d emizuzu",
        h: "lihora",
        hh: "%d emahora",
        d: "lilanga",
        dd: "%d emalanga",
        M: "inyanga",
        MM: "%d tinyanga",
        y: "umnyaka",
        yy: "%d iminyaka"
      },
      meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
      meridiem: function (e, t, n) {
        return e < 11 ? "ekuseni" : e < 15 ? "emini" : e < 19 ? "entsambama" : "ebusuku";
      },
      meridiemHour: function (e, t) {
        return (12 === e && (e = 0), "ekuseni" === t ? e : "emini" === t ? e >= 11 ? e : e + 12 : "entsambama" === t || "ebusuku" === t ? 0 === e ? 0 : e + 12 : void 0);
      },
      dayOfMonthOrdinalParse: /\d{1,2}/,
      ordinal: "%d",
      week: {
        dow: 1,
        doy: 4
      }
    });
    return t;
  });
})(module, exports, __r);
