// webpack 模块 fec2  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    var t = {
      1: "'inci",
      5: "'inci",
      8: "'inci",
      70: "'inci",
      80: "'inci",
      2: "'nci",
      7: "'nci",
      20: "'nci",
      50: "'nci",
      3: "'\xfcnc\xfc",
      4: "'\xfcnc\xfc",
      100: "'\xfcnc\xfc",
      6: "'nc\u0131",
      9: "'uncu",
      10: "'uncu",
      30: "'uncu",
      60: "'\u0131nc\u0131",
      90: "'\u0131nc\u0131"
    }, n = e.defineLocale("tr", {
      months: ("Ocak_\u015eubat_Mart_Nisan_May\u0131s_Haziran_Temmuz_A\u011fustos_Eyl\xfcl_Ekim_Kas\u0131m_Aral\u0131k").split("_"),
      monthsShort: ("Oca_\u015eub_Mar_Nis_May_Haz_Tem_A\u011fu_Eyl_Eki_Kas_Ara").split("_"),
      weekdays: ("Pazar_Pazartesi_Sal\u0131_\xc7ar\u015famba_Per\u015fembe_Cuma_Cumartesi").split("_"),
      weekdaysShort: ("Paz_Pzt_Sal_\xc7ar_Per_Cum_Cmt").split("_"),
      weekdaysMin: ("Pz_Pt_Sa_\xc7a_Pe_Cu_Ct").split("_"),
      meridiem: function (e, t, n) {
        return e < 12 ? n ? "\xf6\xf6" : "\xd6\xd6" : n ? "\xf6s" : "\xd6S";
      },
      meridiemParse: /\xf6\xf6|\xd6\xd6|\xf6s|\xd6S/,
      isPM: function (e) {
        return "\xf6s" === e || "\xd6S" === e;
      },
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      calendar: {
        sameDay: "[bug\xfcn saat] LT",
        nextDay: "[yar\u0131n saat] LT",
        nextWeek: "[gelecek] dddd [saat] LT",
        lastDay: "[d\xfcn] LT",
        lastWeek: "[ge\xe7en] dddd [saat] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "%s sonra",
        past: "%s \xf6nce",
        s: "birka\xe7 saniye",
        ss: "%d saniye",
        m: "bir dakika",
        mm: "%d dakika",
        h: "bir saat",
        hh: "%d saat",
        d: "bir g\xfcn",
        dd: "%d g\xfcn",
        w: "bir hafta",
        ww: "%d hafta",
        M: "bir ay",
        MM: "%d ay",
        y: "bir y\u0131l",
        yy: "%d y\u0131l"
      },
      ordinal: function (e, n) {
        switch (n) {
          case "d":
          case "D":
          case "Do":
          case "DD":
            return e;
          default:
            if (0 === e) return e + "'\u0131nc\u0131";
            var a = e % 10, r = e % 100 - a, i = e >= 100 ? 100 : null;
            return e + (t[a] || t[r] || t[i]);
        }
      },
      week: {
        dow: 1,
        doy: 7
      }
    });
    return n;
  });
})(module, exports, __r);
