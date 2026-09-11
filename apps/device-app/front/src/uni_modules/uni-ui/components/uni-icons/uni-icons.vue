<template>
<text
  class="uni-icons"
  :class="['uniui-' + type, customPrefix, customPrefix ? type : '']"
  :style="{ color: color, 'font-size': iconSize }"
  @click="_onClick"
></text>
</template>

<script>
/*
 * 组件: uniIcons
 * 反编译自 webpack 模块 e89b（svc 编译空间）
 */
import mod0748 from '@/.unpacked/svc/0748.js'

"use strict";
var i = {
  name: "UniIcons",
  emits: ["click"],
  props: {
    type: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#333333"
    },
    size: {
      type: [Number, String],
      default: 16
    },
    customPrefix: {
      type: String,
      default: ""
    }
  },
  data: function () {
    return {
      icons: mod0748.glyphs
    };
  },
  computed: {
    unicode: function () {
      var e = this, t = this.icons.find(function (t) {
        return t.font_class === e.type;
      });
      return t ? unescape(("%u").concat(t.unicode)) : "";
    },
    iconSize: function () {
      return (function (e) {
        return "number" === typeof e || (/^[0-9]*$/g).test(e) ? e + "px" : e;
      })(this.size);
    }
  },
  methods: {
    _onClick: function () {
      this.$emit("click");
    }
  }
};
export default i;

</script>
