function (e, t, n) {
  if (("undefined" === typeof Promise || Promise.prototype.finally || (Promise.prototype.finally = function (e) {
    var t = this.constructor;
    return this.then(function (n) {
      return t.resolve(e()).then(function () {
        return n;
      });
    }, function (n) {
      return t.resolve(e()).then(function () {
        throw n;
      });
    });
  }), "undefined" !== typeof uni && uni && uni.requireGlobal)) {
    var a = uni.requireGlobal();
    (ArrayBuffer = a.ArrayBuffer, Int8Array = a.Int8Array, Uint8Array = a.Uint8Array, Uint8ClampedArray = a.Uint8ClampedArray, Int16Array = a.Int16Array, Uint16Array = a.Uint16Array, Int32Array = a.Int32Array, Uint32Array = a.Uint32Array, Float32Array = a.Float32Array, Float64Array = a.Float64Array, BigInt64Array = a.BigInt64Array, BigUint64Array = a.BigUint64Array);
  }
  (uni.restoreGlobal && uni.restoreGlobal(weex, plus, setTimeout, clearTimeout, setInterval, clearInterval), __definePage("pages/app-updateVersions/pages/upgrade-popup", function () {
    return Vue.extend(n("3f9b").default);
  }), __definePage("pagesMore/my/setups/as", function () {
    return Vue.extend(n("5aac").default);
  }), __definePage("pagesPay/paySuccess/index", function () {
    return Vue.extend(n("1a91").default);
  }), __definePage("pagesPay/appreciation/index", function () {
    return Vue.extend(n("1807").default);
  }), __definePage("pagesFunc/terminal/audio/index", function () {
    return Vue.extend(n("b00b").default);
  }), __definePage("pagesFunc/terminal/trip-report/list", function () {
    return Vue.extend(n("f870").default);
  }), __definePage("pagesCore/webframe", function () {
    return Vue.extend(n("b20e").default);
  }));
}