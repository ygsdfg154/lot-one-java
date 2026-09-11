// webpack 模块 124  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    function t(e, t, n) {
      var a = " ";
      return ((e % 100 >= 20 || e >= 100 && e % 100 == 0) && (a = " de "), e + a + ({
        ss: "secunde",
        mm: "minute",
        hh: "ore",
        dd: "zile",
        ww: "s\u0103pt\u0103m\xe2ni",
        MM: "luni",
        yy: "ani"
      })[n]);
    }
    return e.defineLocale("ro", {
      months: ("ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie").split("_"),
      monthsShort: ("ian._feb._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.").split("_"),
      monthsParseExact: !0,
      weekdays: ("duminic\u0103_luni_mar\u021bi_miercuri_joi_vineri_s\xe2mb\u0103t\u0103").split("_"),
      weekdaysShort: ("Dum_Lun_Mar_Mie_Joi_Vin_S\xe2m").split("_"),
      weekdaysMin: ("Du_Lu_Ma_Mi_Jo_Vi_S\xe2").split("_"),
      longDateFormat: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY H:mm",
        LLLL: "dddd, D MMMM YYYY H:mm"
      },
      calendar: {
        sameDay: "[azi la] LT",
        nextDay: "[m\xe2ine la] LT",
        nextWeek: "dddd [la] LT",
        lastDay: "[ieri la] LT",
        lastWeek: "[fosta] dddd [la] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "peste %s",
        past: "%s \xeen urm\u0103",
        s: "c\xe2teva secunde",
        ss: t,
        m: "un minut",
        mm: t,
        h: "o or\u0103",
        hh: t,
        d: "o zi",
        dd: t,
        w: "o s\u0103pt\u0103m\xe2n\u0103",
        ww: t,
        M: "o lun\u0103",
        MM: t,
        y: "un an",
        yy: t
      },
      week: {
        dow: 1,
        doy: 7
      }
    });
  }, "object" === s(t) && void 0 !== e ? o(require("moment")) : (r = [require("moment")], void 0 === (i = "function" == typeof (a = o) ? a.apply(t, r) : a) || (e.exports = i)));
})(module, exports, __r);
