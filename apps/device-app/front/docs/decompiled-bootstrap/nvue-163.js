function (e, t) {
  if (("undefined" == typeof Promise || Promise.prototype.finally || (Promise.prototype.finally = function (e) {
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
  }), "undefined" != typeof uni && uni && uni.requireGlobal)) {
    var n = uni.requireGlobal();
    (ArrayBuffer = n.ArrayBuffer, Int8Array = n.Int8Array, Uint8Array = n.Uint8Array, Uint8ClampedArray = n.Uint8ClampedArray, Int16Array = n.Int16Array, Uint16Array = n.Uint16Array, Int32Array = n.Int32Array, Uint32Array = n.Uint32Array, Float32Array = n.Float32Array, Float64Array = n.Float64Array, BigInt64Array = n.BigInt64Array, BigUint64Array = n.BigUint64Array);
  }
}