// webpack 模块 e394  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    var t = {
      format: ("leden_\xfanor_b\u0159ezen_duben_kv\u011bten_\u010derven_\u010dervenec_srpen_z\xe1\u0159\xed_\u0159\xedjen_listopad_prosinec").split("_"),
      standalone: ("ledna_\xfanora_b\u0159ezna_dubna_kv\u011btna_\u010dervna_\u010dervence_srpna_z\xe1\u0159\xed_\u0159\xedjna_listopadu_prosince").split("_")
    }, n = ("led_\xfano_b\u0159e_dub_kv\u011b_\u010dvn_\u010dvc_srp_z\xe1\u0159_\u0159\xedj_lis_pro").split("_"), a = [/^led/i, /^\xfano/i, /^b\u0159e/i, /^dub/i, /^kv\u011b/i, /^(\u010dvn|\u010derven$|\u010dervna)/i, /^(\u010dvc|\u010dervenec|\u010dervence)/i, /^srp/i, /^z\xe1\u0159/i, /^\u0159\xedj/i, /^lis/i, /^pro/i], r = /^(leden|\xfanor|b\u0159ezen|duben|kv\u011bten|\u010dervenec|\u010dervence|\u010derven|\u010dervna|srpen|z\xe1\u0159\xed|\u0159\xedjen|listopad|prosinec|led|\xfano|b\u0159e|dub|kv\u011b|\u010dvn|\u010dvc|srp|z\xe1\u0159|\u0159\xedj|lis|pro)/i;
    function i(e) {
      return e > 1 && e < 5 && 1 !== ~~(e / 10);
    }
    function o(e, t, n, a) {
      var r = e + " ";
      switch (n) {
        case "s":
          return t || a ? "p\xe1r sekund" : "p\xe1r sekundami";
        case "ss":
          return t || a ? r + (i(e) ? "sekundy" : "sekund") : r + "sekundami";
        case "m":
          return t ? "minuta" : a ? "minutu" : "minutou";
        case "mm":
          return t || a ? r + (i(e) ? "minuty" : "minut") : r + "minutami";
        case "h":
          return t ? "hodina" : a ? "hodinu" : "hodinou";
        case "hh":
          return t || a ? r + (i(e) ? "hodiny" : "hodin") : r + "hodinami";
        case "d":
          return t || a ? "den" : "dnem";
        case "dd":
          return t || a ? r + (i(e) ? "dny" : "dn\xed") : r + "dny";
        case "M":
          return t || a ? "m\u011bs\xedc" : "m\u011bs\xedcem";
        case "MM":
          return t || a ? r + (i(e) ? "m\u011bs\xedce" : "m\u011bs\xedc\u016f") : r + "m\u011bs\xedci";
        case "y":
          return t || a ? "rok" : "rokem";
        case "yy":
          return t || a ? r + (i(e) ? "roky" : "let") : r + "lety";
      }
    }
    var s = e.defineLocale("cs", {
      months: t,
      monthsShort: n,
      monthsRegex: r,
      monthsShortRegex: r,
      monthsStrictRegex: /^(leden|ledna|\xfanora|\xfanor|b\u0159ezen|b\u0159ezna|duben|dubna|kv\u011bten|kv\u011btna|\u010dervenec|\u010dervence|\u010derven|\u010dervna|srpen|srpna|z\xe1\u0159\xed|\u0159\xedjen|\u0159\xedjna|listopadu|listopad|prosinec|prosince)/i,
      monthsShortStrictRegex: /^(led|\xfano|b\u0159e|dub|kv\u011b|\u010dvn|\u010dvc|srp|z\xe1\u0159|\u0159\xedj|lis|pro)/i,
      monthsParse: a,
      longMonthsParse: a,
      shortMonthsParse: a,
      weekdays: ("ned\u011ble_pond\u011bl\xed_\xfater\xfd_st\u0159eda_\u010dtvrtek_p\xe1tek_sobota").split("_"),
      weekdaysShort: ("ne_po_\xfat_st_\u010dt_p\xe1_so").split("_"),
      weekdaysMin: ("ne_po_\xfat_st_\u010dt_p\xe1_so").split("_"),
      longDateFormat: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd D. MMMM YYYY H:mm",
        l: "D. M. YYYY"
      },
      calendar: {
        sameDay: "[dnes v] LT",
        nextDay: "[z\xedtra v] LT",
        nextWeek: function () {
          switch (this.day()) {
            case 0:
              return "[v ned\u011bli v] LT";
            case 1:
            case 2:
              return "[v] dddd [v] LT";
            case 3:
              return "[ve st\u0159edu v] LT";
            case 4:
              return "[ve \u010dtvrtek v] LT";
            case 5:
              return "[v p\xe1tek v] LT";
            case 6:
              return "[v sobotu v] LT";
          }
        },
        lastDay: "[v\u010dera v] LT",
        lastWeek: function () {
          switch (this.day()) {
            case 0:
              return "[minulou ned\u011bli v] LT";
            case 1:
            case 2:
              return "[minul\xe9] dddd [v] LT";
            case 3:
              return "[minulou st\u0159edu v] LT";
            case 4:
            case 5:
              return "[minul\xfd] dddd [v] LT";
            case 6:
              return "[minulou sobotu v] LT";
          }
        },
        sameElse: "L"
      },
      relativeTime: {
        future: "za %s",
        past: "p\u0159ed %s",
        s: o,
        ss: o,
        m: o,
        mm: o,
        h: o,
        hh: o,
        d: o,
        dd: o,
        M: o,
        MM: o,
        y: o,
        yy: o
      },
      dayOfMonthOrdinalParse: /\d{1,2}\./,
      ordinal: "%d.",
      week: {
        dow: 1,
        doy: 4
      }
    });
    return s;
  });
})(module, exports, __r);
