<template>
<button
  class="u-button u-reset-button"
  :class="bemClass"
  :style="[baseColor, $u.addStyle(customStyle)]"
  :hover-start-time="Number(hoverStartTime)"
  :hover-stay-time="Number(hoverStayTime)"
  :form-type="formType"
  :open-type="openType"
  :app-parameter="appParameter"
  :hover-stop-propagation="hoverStopPropagation"
  :send-message-title="sendMessageTitle"
  :send-message-path="sendMessagePath"
  :lang="lang"
  :data-name="dataName"
  :session-from="sessionFrom"
  :send-message-img="sendMessageImg"
  :show-message-card="showMessageCard"
  :hover-class="disabled || loading ? '' : 'u-button--active'"
  @getphonenumber="getphonenumber"
  @getuserinfo="getuserinfo"
  @error="error"
  @opensetting="opensetting"
  @launchapp="launchapp"
  @click="clickHandler"
>
  <u-loading-icon v-if="loading" :mode="loadingMode" :size="1.15 * loadingSize" :color="loadingColor"></u-loading-icon>
  <text class="u-button__loading-text" :style="[{ fontSize: textSize + 'px' }]">
    {{ loadingText || text }}
  </text>
  <u-icon
    v-if="icon"
    v-else
    :name="icon"
    :color="iconColorCom"
    :size="1.35 * textSize"
    :customStyle="{ marginRight: '2px' }"
  ></u-icon>
  <slot>
    <text class="u-button__text" :style="[{ fontSize: textSize + 'px' }]">
      {{ text }}
    </text>
  </slot>
</button>
</template>

<script>
/*
 * 组件: uButton
 * 反编译自 webpack 模块 477a（svc 编译空间）
 */
import '@/.unpacked/svc/fbcb.js'
import '@/.unpacked/svc/cb47.js'
import ead4 from '@/.unpacked/svc/ead4.js'

"use strict";
var i = {
  name: "u-button",
  mixins: [uni.$u.mpMixin, uni.$u.mixin, ead4],
  data: function () {
    return {};
  },
  computed: {
    bemClass: function () {
      return this.color ? this.bem("button", ["shape", "size"], ["disabled", "plain", "hairline"]) : this.bem("button", ["type", "shape", "size"], ["disabled", "plain", "hairline"]);
    },
    loadingColor: function () {
      return this.plain ? this.color ? this.color : uni.$u.config.color[("u-").concat(this.type)] : "info" === this.type ? "#c9c9c9" : "rgb(200, 200, 200)";
    },
    iconColorCom: function () {
      return this.iconColor ? this.iconColor : this.plain ? this.color ? this.color : this.type : "info" === this.type ? "#000000" : "#ffffff";
    },
    baseColor: function () {
      var e = {};
      return (this.color && (e.color = this.plain ? this.color : "white", this.plain || (e["background-color"] = this.color), -1 !== this.color.indexOf("gradient") ? (e.borderTopWidth = 0, e.borderRightWidth = 0, e.borderBottomWidth = 0, e.borderLeftWidth = 0, this.plain || (e.backgroundImage = this.color)) : (e.borderColor = this.color, e.borderWidth = "1px", e.borderStyle = "solid")), e);
    },
    nvueTextStyle: function () {
      var e = {};
      return ("info" === this.type && (e.color = "#323233"), this.color && (e.color = this.plain ? this.color : "white"), e.fontSize = this.textSize + "px", e);
    },
    textSize: function () {
      var e = 14, t = this.size;
      return ("large" === t && (e = 16), "normal" === t && (e = 14), "small" === t && (e = 12), "mini" === t && (e = 10), e);
    }
  },
  methods: {
    clickHandler: function () {
      var e = this;
      this.disabled || this.loading || uni.$u.throttle(function () {
        e.$emit("click");
      }, this.throttleTime);
    },
    getphonenumber: function (e) {
      this.$emit("getphonenumber", e);
    },
    getuserinfo: function (e) {
      this.$emit("getuserinfo", e);
    },
    error: function (e) {
      this.$emit("error", e);
    },
    opensetting: function (e) {
      this.$emit("opensetting", e);
    },
    launchapp: function (e) {
      this.$emit("launchapp", e);
    }
  }
};
export default i;

</script>
