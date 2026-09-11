// webpack 模块 359  [nvue]
// 出现于: pages/my/my.js, pagesCore/login/bind-tel-more.js, pagesCore/login/bind-tel.js, pagesCore/login/find-pas.js, pagesCore/login/register.js, pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = {
    computed: {
      value: function () {
        var e = this.text, t = this.mode, n = this.format, a = this.href;
        return "price" === t ? ((/^\d+(\.\d+)?$/).test(e) || uni.$u.error("\u91d1\u989d\u6a21\u5f0f\u4e0b\uff0ctext\u53c2\u6570\u9700\u8981\u4e3a\u91d1\u989d\u683c\u5f0f"), uni.$u.test.func(n) ? n(e) : uni.$u.priceFormat(e, 2)) : "date" === t ? (!uni.$u.test.date(e) && uni.$u.error("\u65e5\u671f\u6a21\u5f0f\u4e0b\uff0ctext\u53c2\u6570\u9700\u8981\u4e3a\u65e5\u671f\u6216\u65f6\u95f4\u6233\u683c\u5f0f"), uni.$u.test.func(n) ? n(e) : n ? uni.$u.timeFormat(e, n) : uni.$u.timeFormat(e, "yyyy-mm-dd")) : "phone" === t ? uni.$u.test.func(n) ? n(e) : "encrypt" === n ? ("").concat(e.substr(0, 3), "****").concat(e.substr(7)) : e : "name" === t ? ("string" != typeof e && uni.$u.error("\u59d3\u540d\u6a21\u5f0f\u4e0b\uff0ctext\u53c2\u6570\u9700\u8981\u4e3a\u5b57\u7b26\u4e32\u683c\u5f0f"), uni.$u.test.func(n) ? n(e) : "encrypt" === n ? this.formatName(e) : e) : "link" === t ? (!uni.$u.test.url(a) && uni.$u.error("\u8d85\u94fe\u63a5\u6a21\u5f0f\u4e0b\uff0chref\u53c2\u6570\u9700\u8981\u4e3aURL\u683c\u5f0f"), e) : e;
      }
    },
    methods: {
      formatName: function (e) {
        var t = "";
        if (2 === e.length) t = e.substr(0, 1) + "*"; else if (e.length > 2) {
          for (var n = "", a = 0, r = e.length - 2; a < r; a++) n += "*";
          t = e.substr(0, 1) + n + e.substr(-1, 1);
        } else t = e;
        return t;
      }
    }
  };
  t.default = a;
})(module, exports, __r);
