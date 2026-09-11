// webpack 模块 275  [nvue]
// 出现于: pages/my/my.js, pagesCore/login/bind-tel-more.js, pagesCore/login/bind-tel.js, pagesCore/login/find-pas.js, pagesCore/login/register.js, pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return r;
  }), n.d(t, "c", function () {
    return i;
  }), n.d(t, "a", function () {
    return a;
  }));
  var a = {
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default,
    uLink: require("uview-ui/components/u-link/u-link.vue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return e.show ? n("view", {
      staticClass: ["u-text"],
      class: [],
      style: {
        margin: e.margin,
        justifyContent: "left" === e.align ? "flex-start" : "center" === e.align ? "center" : "flex-end"
      },
      on: {
        click: e.clickHandler
      }
    }, ["price" === e.mode ? n("u-text", {
      class: ["u-text__price", e.type && "u-text__value--" + e.type],
      style: [e.valueStyle],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\uffe5")]) : e._e(), e.prefixIcon ? n("view", {
      staticClass: ["u-text__prefix-icon"]
    }, [n("u-icon", {
      attrs: {
        name: e.prefixIcon,
        customStyle: e.$u.addStyle(e.iconStyle)
      }
    })], 1) : e._e(), "link" === e.mode ? n("u-link", {
      attrs: {
        text: e.value,
        href: e.href,
        underLine: !0
      }
    }) : e.openType && e.isMp ? [n("button", {
      staticClass: ["u-reset-button", "u-text__value"],
      style: [e.valueStyle],
      attrs: {
        dataIndex: e.index,
        openType: e.openType,
        lang: e.lang,
        sessionFrom: e.sessionFrom,
        sendMessageTitle: e.sendMessageTitle,
        sendMessagePath: e.sendMessagePath,
        sendMessageImg: e.sendMessageImg,
        showMessageCard: e.showMessageCard,
        appParameter: e.appParameter
      },
      on: {
        getuserinfo: e.onGetUserInfo,
        contact: e.onContact,
        getphonenumber: e.onGetPhoneNumber,
        error: e.onError,
        launchapp: e.onLaunchApp,
        opensetting: e.onOpenSetting
      }
    }, [e._v(e._s(e.value))])] : n("u-text", {
      staticClass: ["u-text__value"],
      class: [e.type && "u-text__value--" + e.type, e.lines && "u-line-" + e.lines],
      style: [e.valueStyle],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.value))]), e.suffixIcon ? n("view", {
      staticClass: ["u-text__suffix-icon"]
    }, [n("u-icon", {
      attrs: {
        name: e.suffixIcon,
        customStyle: e.$u.addStyle(e.iconStyle)
      }
    })], 1) : e._e()], 2) : e._e();
  }, i = [];
})(module, exports, __r);
