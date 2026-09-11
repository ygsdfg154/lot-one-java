// webpack 模块 111  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    return e.defineLocale("ms-my", {
      months: ("Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember").split("_"),
      monthsShort: ("Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis").split("_"),
      weekdays: ("Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu").split("_"),
      weekdaysShort: ("Ahd_Isn_Sel_Rab_Kha_Jum_Sab").split("_"),
      weekdaysMin: ("Ah_Is_Sl_Rb_Km_Jm_Sb").split("_"),
      longDateFormat: {
        LT: "HH.mm",
        LTS: "HH.mm.ss",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY [pukul] HH.mm",
        LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
      },
      meridiemParse: /pagi|tengahari|petang|malam/,
      meridiemHour: function (e, t) {
        return (12 === e && (e = 0), "pagi" === t ? e : "tengahari" === t ? e >= 11 ? e : e + 12 : "petang" === t || "malam" === t ? e + 12 : void 0);
      },
      meridiem: function (e, t, n) {
        return e < 11 ? "pagi" : e < 15 ? "tengahari" : e < 19 ? "petang" : "malam";
      },
      calendar: {
        sameDay: "[Hari ini pukul] LT",
        nextDay: "[Esok pukul] LT",
        nextWeek: "dddd [pukul] LT",
        lastDay: "[Kelmarin pukul] LT",
        lastWeek: "dddd [lepas pukul] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "dalam %s",
        past: "%s yang lepas",
        s: "beberapa saat",
        ss: "%d saat",
        m: "seminit",
        mm: "%d minit",
        h: "sejam",
        hh: "%d jam",
        d: "sehari",
        dd: "%d hari",
        M: "sebulan",
        MM: "%d bulan",
        y: "setahun",
        yy: "%d tahun"
      },
      week: {
        dow: 1,
        doy: 7
      }
    });
  }, "object" === s(t) && void 0 !== e ? o(require("moment")) : (r = [require("moment")], void 0 === (i = "function" == typeof (a = o) ? a.apply(t, r) : a) || (e.exports = i)));
})(module, exports, __r);
