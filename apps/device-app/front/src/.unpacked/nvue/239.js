// webpack 模块 239  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pagesFunc/terminal/corral/info.js, pagesFunc/terminal/locate-mode/index.js, pagesFunc/terminal/locus/index.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), o = a(require("@/.unpacked/nvue/312.js")), s = {
    name: "u-picker",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, o.default],
    data: function () {
      return {
        lastIndex: [],
        innerIndex: [],
        innerColumns: [],
        columnIndex: 0
      };
    },
    watch: {
      defaultIndex: {
        immediate: !0,
        handler: function (e) {
          this.setIndexs(e, !0);
        }
      },
      columns: {
        immediate: !0,
        handler: function (e) {
          this.setColumns(e);
        }
      }
    },
    methods: {
      getItemText: function (e) {
        return uni.$u.test.object(e) ? e[this.keyName] : e;
      },
      closeHandler: function () {
        this.closeOnClickOverlay && this.$emit("close");
      },
      cancel: function () {
        this.$emit("cancel");
      },
      confirm: function () {
        var e = this;
        this.$emit("confirm", {
          indexs: this.innerIndex,
          value: this.innerColumns.map(function (t, n) {
            return t[e.innerIndex[n]];
          }),
          values: this.innerColumns
        });
      },
      changeHandler: function (e) {
        for (var t = e.detail.value, n = 0, a = 0, r = 0; r < t.length; r++) {
          var i = t[r];
          if (i !== (this.lastIndex[r] || 0)) {
            (a = r, n = i);
            break;
          }
        }
        this.columnIndex = a;
        var o = this.innerColumns;
        (this.setLastIndex(t), this.setIndexs(t), this.$emit("change", {
          picker: this,
          value: this.innerColumns.map(function (e, n) {
            return e[t[n]];
          }),
          index: n,
          indexs: t,
          values: o,
          columnIndex: a
        }));
      },
      setIndexs: function (e, t) {
        (this.innerIndex = uni.$u.deepClone(e), t && this.setLastIndex(e));
      },
      setLastIndex: function (e) {
        this.lastIndex = uni.$u.deepClone(e);
      },
      setColumnValues: function (e, t) {
        this.innerColumns.splice(e, 1, t);
        for (var n = uni.$u.deepClone(this.innerIndex), a = 0; a < this.innerColumns.length; a++) a > this.columnIndex && (n[a] = 0);
        this.setIndexs(n);
      },
      getColumnValues: function (e) {
        return ((async function () {
          await uni.$u.sleep();
        })(), this.innerColumns[e]);
      },
      setColumns: function (e) {
        (this.innerColumns = uni.$u.deepClone(e), 0 === this.innerIndex.length && (this.innerIndex = new Array(e.length).fill(0)));
      },
      getIndexs: function () {
        return this.innerIndex;
      },
      getValues: function () {
        var e = this;
        return ((async function () {
          await uni.$u.sleep();
        })(), this.innerColumns.map(function (t, n) {
          return t[e.innerIndex[n]];
        }));
      }
    }
  };
  t.default = s;
})(module, exports, __r);
