function (t, e, a) {
  if (("undefined" === typeof Promise || Promise.prototype.finally || (Promise.prototype.finally = function (t) {
    var e = this.constructor;
    return this.then(function (a) {
      return e.resolve(t()).then(function () {
        return a;
      });
    }, function (a) {
      return e.resolve(t()).then(function () {
        throw a;
      });
    });
  }), "undefined" !== typeof uni && uni && uni.requireGlobal)) {
    var n = uni.requireGlobal();
    (ArrayBuffer = n.ArrayBuffer, Int8Array = n.Int8Array, Uint8Array = n.Uint8Array, Uint8ClampedArray = n.Uint8ClampedArray, Int16Array = n.Int16Array, Uint16Array = n.Uint16Array, Int32Array = n.Int32Array, Uint32Array = n.Uint32Array, Float32Array = n.Float32Array, Float64Array = n.Float64Array, BigInt64Array = n.BigInt64Array, BigUint64Array = n.BigUint64Array);
  }
  (window.__uniConfig = {
    window: {
      navigationBarTextStyle: "black",
      navigationBarBackgroundColor: "#FFFFFF",
      backgroundColor: "#F6F6F6",
      backgroundColorTop: "#F6F6F6",
      backgroundColorBottom: "#F6F6F6",
      softinputmode: "adjustPan"
    },
    darkmode: !1
  }, uni.restoreGlobal && uni.restoreGlobal(weex, plus, setTimeout, clearTimeout, setInterval, clearInterval), __definePage("pages/app-updateVersions/pages/upgrade-popup", function () {
    return Vue.extend(a("3f9b").default);
  }), __definePage("pagesMore/my/setups/as", function () {
    return Vue.extend(a("5aac").default);
  }), __definePage("pagesPay/paySuccess/index", function () {
    return Vue.extend(a("1a91").default);
  }), __definePage("pagesPay/appreciation/index", function () {
    return Vue.extend(a("1807").default);
  }), __definePage("pagesFunc/terminal/audio/index", function () {
    return Vue.extend(a("b00b").default);
  }), __definePage("pagesFunc/terminal/trip-report/list", function () {
    return Vue.extend(a("f870").default);
  }), __definePage("pagesCore/webframe", function () {
    return Vue.extend(a("b20e").default);
  }));
}