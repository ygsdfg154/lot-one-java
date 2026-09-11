// webpack 模块 0278  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    function t(e, t, n) {
      return e + " " + (function (e, t) {
        if (2 === t) return (function (e) {
          var t = {
            m: "v",
            b: "v",
            d: "z"
          };
          if (void 0 === t[e.charAt(0)]) return e;
          return t[e.charAt(0)] + e.substring(1);
        })(e);
        return e;
      })(({
        mm: "munutenn",
        MM: "miz",
        dd: "devezh"
      })[n], e);
    }
    var n = [/^gen/i, /^c[\u02bc\']hwe/i, /^meu/i, /^ebr/i, /^mae/i, /^(mez|eve)/i, /^gou/i, /^eos/i, /^gwe/i, /^her/i, /^du/i, /^ker/i], a = /^(genver|c[\u02bc\']hwevrer|meurzh|ebrel|mae|mezheven|gouere|eost|gwengolo|here|du|kerzu|gen|c[\u02bc\']hwe|meu|ebr|mae|eve|gou|eos|gwe|her|du|ker)/i, r = [/^Su/i, /^Lu/i, /^Me([^r]|$)/i, /^Mer/i, /^Ya/i, /^Gw/i, /^Sa/i], i = e.defineLocale("br", {
      months: ("Genver_C\u02bchwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu").split("_"),
      monthsShort: ("Gen_C\u02bchwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker").split("_"),
      weekdays: ("Sul_Lun_Meurzh_Merc\u02bcher_Yaou_Gwener_Sadorn").split("_"),
      weekdaysShort: ("Sul_Lun_Meu_Mer_Yao_Gwe_Sad").split("_"),
      weekdaysMin: ("Su_Lu_Me_Mer_Ya_Gw_Sa").split("_"),
      weekdaysParse: r,
      fullWeekdaysParse: [/^sul/i, /^lun/i, /^meurzh/i, /^merc[\u02bc\']her/i, /^yaou/i, /^gwener/i, /^sadorn/i],
      shortWeekdaysParse: [/^Sul/i, /^Lun/i, /^Meu/i, /^Mer/i, /^Yao/i, /^Gwe/i, /^Sad/i],
      minWeekdaysParse: r,
      monthsRegex: a,
      monthsShortRegex: a,
      monthsStrictRegex: /^(genver|c[\u02bc\']hwevrer|meurzh|ebrel|mae|mezheven|gouere|eost|gwengolo|here|du|kerzu)/i,
      monthsShortStrictRegex: /^(gen|c[\u02bc\']hwe|meu|ebr|mae|eve|gou|eos|gwe|her|du|ker)/i,
      monthsParse: n,
      longMonthsParse: n,
      shortMonthsParse: n,
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D [a viz] MMMM YYYY",
        LLL: "D [a viz] MMMM YYYY HH:mm",
        LLLL: "dddd, D [a viz] MMMM YYYY HH:mm"
      },
      calendar: {
        sameDay: "[Hiziv da] LT",
        nextDay: "[Warc\u02bchoazh da] LT",
        nextWeek: "dddd [da] LT",
        lastDay: "[Dec\u02bch da] LT",
        lastWeek: "dddd [paset da] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "a-benn %s",
        past: "%s \u02bczo",
        s: "un nebeud segondenno\xf9",
        ss: "%d eilenn",
        m: "ur vunutenn",
        mm: t,
        h: "un eur",
        hh: "%d eur",
        d: "un devezh",
        dd: t,
        M: "ur miz",
        MM: t,
        y: "ur bloaz",
        yy: function (e) {
          switch ((function e(t) {
                if (t > 9) return e(t % 10);
                return t;
              })(e)) {
            case 1:
            case 3:
            case 4:
            case 5:
            case 9:
              return e + " bloaz";
            default:
              return e + " vloaz";
          }
        }
      },
      dayOfMonthOrdinalParse: /\d{1,2}(a\xf1|vet)/,
      ordinal: function (e) {
        var t = 1 === e ? "a\xf1" : "vet";
        return e + t;
      },
      week: {
        dow: 1,
        doy: 4
      },
      meridiemParse: /a.m.|g.m./,
      isPM: function (e) {
        return "g.m." === e;
      },
      meridiem: function (e, t, n) {
        return e < 12 ? "a.m." : "g.m.";
      }
    });
    return i;
  });
})(module, exports, __r);
