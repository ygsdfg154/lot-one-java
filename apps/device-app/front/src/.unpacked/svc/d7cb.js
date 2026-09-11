// webpack 模块 d7cb  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = {
    upload: {
      accept: "image",
      capture: function () {
        return ["album", "camera"];
      },
      compressed: !0,
      camera: "back",
      maxDuration: 60,
      uploadIcon: "camera-fill",
      uploadIconColor: "#D3D4D6",
      useBeforeRead: !1,
      previewFullImage: !0,
      maxCount: 52,
      disabled: !1,
      imageMode: "aspectFill",
      name: "",
      sizeType: function () {
        return ["original", "compressed"];
      },
      multiple: !1,
      deletable: !0,
      maxSize: Number.MAX_VALUE,
      fileList: function () {
        return [];
      },
      uploadText: "",
      width: 80,
      height: 80,
      previewImage: !0
    }
  };
  t.default = a;
})(module, exports, __r);
