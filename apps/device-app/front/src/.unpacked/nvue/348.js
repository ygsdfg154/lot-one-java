// webpack 模块 348  [nvue]
// 出现于: pagesFunc/deviceInfo/index.js, pagesFunc/terminal/alerts-set/messages.js, pagesFunc/terminal/alerts-set/phone.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return a;
  }), n.d(t, "c", function () {
    return i;
  }), n.d(t, "a", function () {
    return r;
  }));
  var r = {
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default,
    uLine: require("uview-ui/components/u-line/u-line.vue").default
  }, a = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: ["u-form-item"]
    }, [n("view", {
      staticClass: ["u-form-item__body"],
      style: [e.$u.addStyle(e.customStyle), {
        flexDirection: "left" === (e.labelPosition || e.parentData.labelPosition) ? "row" : "column"
      }],
      on: {
        click: e.clickHandler
      }
    }, [e._t("label", [e.required || e.leftIcon || e.label ? n("view", {
      staticClass: ["u-form-item__body__left"],
      style: {
        width: e.$u.addUnit(e.labelWidth || e.parentData.labelWidth),
        marginBottom: "left" === e.parentData.labelPosition ? 0 : "5px"
      }
    }, [n("view", {
      staticClass: ["u-form-item__body__left__content"]
    }, [e.required ? n("u-text", {
      staticClass: ["u-form-item__body__left__content__required"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("*")]) : e._e(), e.leftIcon ? n("view", {
      staticClass: ["u-form-item__body__left__content__icon"]
    }, [n("u-icon", {
      attrs: {
        name: e.leftIcon,
        customStyle: e.leftIconStyle
      }
    })], 1) : e._e(), n("u-text", {
      staticClass: ["u-form-item__body__left__content__label"],
      style: [e.parentData.labelStyle, {
        justifyContent: "left" === e.parentData.labelAlign ? "flex-start" : "center" === e.parentData.labelAlign ? "center" : "flex-end"
      }],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.label))])])]) : e._e()]), n("view", {
      staticClass: ["u-form-item__body__right"]
    }, [n("view", {
      staticClass: ["u-form-item__body__right__content"]
    }, [n("view", {
      staticClass: ["u-form-item__body__right__content__slot"]
    }, [e._t("default")], 2), e.$slots.right ? n("view", {
      staticClass: ["item__body__right__content__icon"]
    }, [e._t("right")], 2) : e._e()])])], 2), e._t("error", [e.message && "message" === e.parentData.errorType ? n("u-text", {
      staticClass: ["u-form-item__body__right__message"],
      style: {
        marginLeft: e.$u.addUnit("top" === e.parentData.labelPosition ? 0 : e.labelWidth || e.parentData.labelWidth)
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.message))]) : e._e()]), e.borderBottom ? n("u-line", {
      attrs: {
        color: e.message && "border-bottom" === e.parentData.errorType ? e.$u.color.error : e.propsLine.color,
        customStyle: "margin-top: " + (e.message && "message" === e.parentData.errorType ? "5px" : 0)
      }
    }) : e._e()], 2);
  }, i = [];
})(module, exports, __r);
