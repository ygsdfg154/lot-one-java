// webpack 模块 119  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    return e.defineLocale("oc-lnc", {
      months: {
        standalone: ("geni\xe8r_febri\xe8r_mar\xe7_abril_mai_junh_julhet_agost_setembre_oct\xf2bre_novembre_decembre").split("_"),
        format: ("de geni\xe8r_de febri\xe8r_de mar\xe7_d'abril_de mai_de junh_de julhet_d'agost_de setembre_d'oct\xf2bre_de novembre_de decembre").split("_"),
        isFormat: /D[oD]?(\s)+MMMM/
      },
      monthsShort: ("gen._febr._mar\xe7_abr._mai_junh_julh._ago._set._oct._nov._dec.").split("_"),
      monthsParseExact: !0,
      weekdays: ("dimenge_diluns_dimars_dim\xe8cres_dij\xf2us_divendres_dissabte").split("_"),
      weekdaysShort: ("dg._dl._dm._dc._dj._dv._ds.").split("_"),
      weekdaysMin: ("dg_dl_dm_dc_dj_dv_ds").split("_"),
      weekdaysParseExact: !0,
      longDateFormat: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM [de] YYYY",
        ll: "D MMM YYYY",
        LLL: "D MMMM [de] YYYY [a] H:mm",
        lll: "D MMM YYYY, H:mm",
        LLLL: "dddd D MMMM [de] YYYY [a] H:mm",
        llll: "ddd D MMM YYYY, H:mm"
      },
      calendar: {
        sameDay: "[u\xe8i a] LT",
        nextDay: "[deman a] LT",
        nextWeek: "dddd [a] LT",
        lastDay: "[i\xe8r a] LT",
        lastWeek: "dddd [passat a] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "d'aqu\xed %s",
        past: "fa %s",
        s: "unas segondas",
        ss: "%d segondas",
        m: "una minuta",
        mm: "%d minutas",
        h: "una ora",
        hh: "%d oras",
        d: "un jorn",
        dd: "%d jorns",
        M: "un mes",
        MM: "%d meses",
        y: "un an",
        yy: "%d ans"
      },
      dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|\xe8|a)/,
      ordinal: function (e, t) {
        var n = 1 === e ? "r" : 2 === e ? "n" : 3 === e ? "r" : 4 === e ? "t" : "\xe8";
        return ("w" !== t && "W" !== t || (n = "a"), e + n);
      },
      week: {
        dow: 1,
        doy: 4
      }
    });
  }, "object" === s(t) && void 0 !== e ? o(require("moment")) : (r = [require("moment")], void 0 === (i = "function" == typeof (a = o) ? a.apply(t, r) : a) || (e.exports = i)));
})(module, exports, __r);
