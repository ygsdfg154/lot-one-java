// webpack 模块 90d5  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a, r, i, o = require("@/.unpacked/svc/3b2d.js");
  (function (s, u) {
    "object" === o(t) && "undefined" !== typeof e ? u(require("moment")) : (r = [require("moment")], a = u, i = "function" === typeof a ? a.apply(t, r) : a, void 0 === i || (e.exports = i));
  })(0, function (e) {
    "use strict";
    var t = e.defineLocale("se", {
      months: ("o\u0111\u0111ajagem\xe1nnu_guovvam\xe1nnu_njuk\u010dam\xe1nnu_cuo\u014bom\xe1nnu_miessem\xe1nnu_geassem\xe1nnu_suoidnem\xe1nnu_borgem\xe1nnu_\u010dak\u010dam\xe1nnu_golggotm\xe1nnu_sk\xe1bmam\xe1nnu_juovlam\xe1nnu").split("_"),
      monthsShort: ("o\u0111\u0111j_guov_njuk_cuo_mies_geas_suoi_borg_\u010dak\u010d_golg_sk\xe1b_juov").split("_"),
      weekdays: ("sotnabeaivi_vuoss\xe1rga_ma\u014b\u014beb\xe1rga_gaskavahkku_duorastat_bearjadat_l\xe1vvardat").split("_"),
      weekdaysShort: ("sotn_vuos_ma\u014b_gask_duor_bear_l\xe1v").split("_"),
      weekdaysMin: ("s_v_m_g_d_b_L").split("_"),
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "MMMM D. [b.] YYYY",
        LLL: "MMMM D. [b.] YYYY [ti.] HH:mm",
        LLLL: "dddd, MMMM D. [b.] YYYY [ti.] HH:mm"
      },
      calendar: {
        sameDay: "[otne ti] LT",
        nextDay: "[ihttin ti] LT",
        nextWeek: "dddd [ti] LT",
        lastDay: "[ikte ti] LT",
        lastWeek: "[ovddit] dddd [ti] LT",
        sameElse: "L"
      },
      relativeTime: {
        future: "%s gea\u017ees",
        past: "ma\u014bit %s",
        s: "moadde sekunddat",
        ss: "%d sekunddat",
        m: "okta minuhta",
        mm: "%d minuhtat",
        h: "okta diimmu",
        hh: "%d diimmut",
        d: "okta beaivi",
        dd: "%d beaivvit",
        M: "okta m\xe1nnu",
        MM: "%d m\xe1nut",
        y: "okta jahki",
        yy: "%d jagit"
      },
      dayOfMonthOrdinalParse: /\d{1,2}\./,
      ordinal: "%d.",
      week: {
        dow: 1,
        doy: 4
      }
    });
    return t;
  });
})(module, exports, __r);
