// webpack 模块 5143  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t) {
  var n = {
    utf8: {
      stringToBytes: function (e) {
        return n.bin.stringToBytes(unescape(encodeURIComponent(e)));
      },
      bytesToString: function (e) {
        return decodeURIComponent(escape(n.bin.bytesToString(e)));
      }
    },
    bin: {
      stringToBytes: function (e) {
        for (var t = [], n = 0; n < e.length; n++) t.push(255 & e.charCodeAt(n));
        return t;
      },
      bytesToString: function (e) {
        for (var t = [], n = 0; n < e.length; n++) t.push(String.fromCharCode(e[n]));
        return t.join("");
      }
    }
  };
  e.exports = n;
})(module, exports, __r);
