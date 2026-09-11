// webpack 模块 144  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    var t = ("pagh_wa\u2019_cha\u2019_wej_loS_vagh_jav_Soch_chorgh_Hut").split("_");
    function n(e, n, a, r) {
      var i = (function (e) {
        var n = Math.floor(e % 1e3 / 100), a = Math.floor(e % 100 / 10), r = e % 10, i = "";
        return (n > 0 && (i += t[n] + "vatlh"), a > 0 && (i += ("" !== i ? " " : "") + t[a] + "maH"), r > 0 && (i += ("" !== i ? " " : "") + t[r]), "" === i ? "pagh" : i);
      })(e);
      switch (a) {
        case "ss":
          return i + " lup";
        case "mm":
          return i + " tup";
        case "hh":
          return i + " rep";
        case "dd":
          return i + " jaj";
        case "MM":
          return i + " jar";
        case "yy":
          return i + " DIS";
      }
    }
    return e.defineLocale("tlh", {
      months: ("tera\u2019 jar wa\u2019_tera\u2019 jar cha\u2019_tera\u2019 jar wej_tera\u2019 jar loS_tera\u2019 jar vagh_tera\u2019 jar jav_tera\u2019 jar Soch_tera\u2019 jar chorgh_tera\u2019 jar Hut_tera\u2019 jar wa\u2019maH_tera\u2019 jar wa\u2019maH wa\u2019_tera\u2019 jar wa\u2019maH cha\u2019").split("_"),
      monthsShort: ("jar wa\u2019_jar cha\u2019_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa\u2019maH_jar wa\u2019maH wa\u2019_jar wa\u2019maH cha\u2019").split("_"),
      monthsParseExact: !0,
      weekdays: ("lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj").split("_"),
      weekdaysShort: ("lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj").split("_"),
      weekdaysMin: ("lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj").split("_"),
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      calendar: {
        sameDay: "[DaHjaj] LT",
        nextDay: "[wa\u2019leS] LT",
        nextWeek: "LLL",
        lastDay: "[wa\u2019Hu\u2019] LT",
        lastWeek: "LLL",
        sameElse: "L"
      },
      relativeTime: {
        future: function (e) {
          var t = e;
          return t = -1 !== e.indexOf("jaj") ? t.slice(0, -3) + "leS" : -1 !== e.indexOf("jar") ? t.slice(0, -3) + "waQ" : -1 !== e.indexOf("DIS") ? t.slice(0, -3) + "nem" : t + " pIq";
        },
        past: function (e) {
          var t = e;
          return t = -1 !== e.indexOf("jaj") ? t.slice(0, -3) + "Hu\u2019" : -1 !== e.indexOf("jar") ? t.slice(0, -3) + "wen" : -1 !== e.indexOf("DIS") ? t.slice(0, -3) + "ben" : t + " ret";
        },
        s: "puS lup",
        ss: n,
        m: "wa\u2019 tup",
        mm: n,
        h: "wa\u2019 rep",
        hh: n,
        d: "wa\u2019 jaj",
        dd: n,
        M: "wa\u2019 jar",
        MM: n,
        y: "wa\u2019 DIS",
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
