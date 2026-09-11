// webpack 模块 142  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    var t = {
      1: "'inji",
      5: "'inji",
      8: "'inji",
      70: "'inji",
      80: "'inji",
      2: "'nji",
      7: "'nji",
      20: "'nji",
      50: "'nji",
      3: "'\xfcnji",
      4: "'\xfcnji",
      100: "'\xfcnji",
      6: "'njy",
      9: "'unjy",
      10: "'unjy",
      30: "'unjy",
      60: "'ynjy",
      90: "'ynjy"
    };
    return e.defineLocale("tk", {
      months: ("\xddanwar_Fewral_Mart_Aprel_Ma\xfd_I\xfdun_I\xfdul_Awgust_Sent\xfdabr_Okt\xfdabr_No\xfdabr_Dekabr").split("_"),
      monthsShort: ("\xddan_Few_Mar_Apr_Ma\xfd_I\xfdn_I\xfdl_Awg_Sen_Okt_No\xfd_Dek").split("_"),
      weekdays: ("\xddek\u015fenbe_Du\u015fenbe_Si\u015fenbe_\xc7ar\u015fenbe_Pen\u015fenbe_Anna_\u015eenbe").split("_"),
      weekdaysShort: ("\xddek_Du\u015f_Si\u015f_\xc7ar_Pen_Ann_\u015een").split("_"),
      weekdaysMin: ("\xddk_D\u015f_S\u015f_\xc7r_Pn_An_\u015en").split("_"),
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      },
      calendar: {
        sameDay: "[bug\xfcn sagat] LT",
        nextDay: "[ertir sagat] LT",
        nextWeek: "[indiki] dddd [sagat] LT",
        lastDay: "[d\xfc\xfdn] LT",
        lastWeek: "[ge\xe7en] dddd [sagat] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "%s so\u0148",
        past: "%s \xf6\u0148",
        s: "birn\xe4\xe7e sekunt",
        m: "bir minut",
        mm: "%d minut",
        h: "bir sagat",
        hh: "%d sagat",
        d: "bir g\xfcn",
        dd: "%d g\xfcn",
        M: "bir a\xfd",
        MM: "%d a\xfd",
        y: "bir \xfdyl",
        yy: "%d \xfdyl"
      },
      ordinal: function (e, n) {
        switch (n) {
          case "d":
          case "D":
          case "Do":
          case "DD":
            return e;
          default:
            if (0 === e) return e + "'unjy";
            var a = e % 10;
            return e + (t[a] || t[e % 100 - a] || t[e >= 100 ? 100 : null]);
        }
      },
      week: {
        dow: 1,
        doy: 7
      }
    });
  }, "object" === s(t) && void 0 !== e ? o(require("moment")) : (r = [require("moment")], void 0 === (i = "function" == typeof (a = o) ? a.apply(t, r) : a) || (e.exports = i)));
})(module, exports, __r);
