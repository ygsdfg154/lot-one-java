// webpack 模块 97  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o, s = require("@/.unpacked/nvue/1.js");
  (o = function (e) {
    "use strict";
    return e.defineLocale("ko", {
      months: ("1\uc6d4_2\uc6d4_3\uc6d4_4\uc6d4_5\uc6d4_6\uc6d4_7\uc6d4_8\uc6d4_9\uc6d4_10\uc6d4_11\uc6d4_12\uc6d4").split("_"),
      monthsShort: ("1\uc6d4_2\uc6d4_3\uc6d4_4\uc6d4_5\uc6d4_6\uc6d4_7\uc6d4_8\uc6d4_9\uc6d4_10\uc6d4_11\uc6d4_12\uc6d4").split("_"),
      weekdays: ("\uc77c\uc694\uc77c_\uc6d4\uc694\uc77c_\ud654\uc694\uc77c_\uc218\uc694\uc77c_\ubaa9\uc694\uc77c_\uae08\uc694\uc77c_\ud1a0\uc694\uc77c").split("_"),
      weekdaysShort: ("\uc77c_\uc6d4_\ud654_\uc218_\ubaa9_\uae08_\ud1a0").split("_"),
      weekdaysMin: ("\uc77c_\uc6d4_\ud654_\uc218_\ubaa9_\uae08_\ud1a0").split("_"),
      longDateFormat: {
        LT: "A h:mm",
        LTS: "A h:mm:ss",
        L: "YYYY.MM.DD.",
        LL: "YYYY\ub144 MMMM D\uc77c",
        LLL: "YYYY\ub144 MMMM D\uc77c A h:mm",
        LLLL: "YYYY\ub144 MMMM D\uc77c dddd A h:mm",
        l: "YYYY.MM.DD.",
        ll: "YYYY\ub144 MMMM D\uc77c",
        lll: "YYYY\ub144 MMMM D\uc77c A h:mm",
        llll: "YYYY\ub144 MMMM D\uc77c dddd A h:mm"
      },
      calendar: {
        sameDay: "\uc624\ub298 LT",
        nextDay: "\ub0b4\uc77c LT",
        nextWeek: "dddd LT",
        lastDay: "\uc5b4\uc81c LT",
        lastWeek: "\uc9c0\ub09c\uc8fc dddd LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "%s \ud6c4",
        past: "%s \uc804",
        s: "\uba87 \ucd08",
        ss: "%d\ucd08",
        m: "1\ubd84",
        mm: "%d\ubd84",
        h: "\ud55c \uc2dc\uac04",
        hh: "%d\uc2dc\uac04",
        d: "\ud558\ub8e8",
        dd: "%d\uc77c",
        M: "\ud55c \ub2ec",
        MM: "%d\ub2ec",
        y: "\uc77c \ub144",
        yy: "%d\ub144"
      },
      dayOfMonthOrdinalParse: /\d{1,2}(\uc77c|\uc6d4|\uc8fc)/,
      ordinal: function (e, t) {
        switch (t) {
          case "d":
          case "D":
          case "DDD":
            return e + "\uc77c";
          case "M":
            return e + "\uc6d4";
          case "w":
          case "W":
            return e + "\uc8fc";
          default:
            return e;
        }
      },
      meridiemParse: /\uc624\uc804|\uc624\ud6c4/,
      isPM: function (e) {
        return "\uc624\ud6c4" === e;
      },
      meridiem: function (e, t, n) {
        return e < 12 ? "\uc624\uc804" : "\uc624\ud6c4";
      }
    });
  }, "object" === s(t) && void 0 !== e ? o(require("moment")) : (r = [require("moment")], void 0 === (i = "function" == typeof (a = o) ? a.apply(t, r) : a) || (e.exports = i)));
})(module, exports, __r);
