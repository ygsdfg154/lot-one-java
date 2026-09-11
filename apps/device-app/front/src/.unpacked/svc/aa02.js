// webpack 模块 aa02  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.recordTime = t.exactDate = void 0);
  t.exactDate = function (e) {
    var t = e.slice(e.length - 8, e.length);
    return t;
  };
  t.recordTime = function (e) {
    return 0 === e ? 30 : 1 === e ? 60 : 2 === e ? 120 : void 0;
  };
})(module, exports, __r);
