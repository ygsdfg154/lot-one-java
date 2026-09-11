// webpack 模块 616  [nvue]
// 出现于: pagesPay/list/specifics.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/5.js")), o = a(require("@/.unpacked/nvue/23.js")), s = require("vuex"), d = require("../../common/utils.nvue.js"), u = a(require("../../components/refundOrder/refundOrder.nvue"));
  a(require("../../common/config.nvue.js"));
  function l(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(e);
      (t && (a = a.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, a));
    }
    return n;
  }
  function _(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? l(Object(n), !0).forEach(function (t) {
        (0, i.default)(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : l(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  var c = getApp().globalData, m = {
    components: {
      refundOrder: u.default
    },
    data: function () {
      return {
        showQuestion: !1,
        showRefund: !1,
        showRefundList: !1,
        actions: [],
        infoListObj: {
          orderNo: {
            id: 1,
            type: 2,
            name: "orderNo",
            title: "\u5e73\u53f0\u8ba2\u5355\u53f7",
            text: ""
          },
          totalFee: {
            id: 2,
            type: 3,
            name: "totalFee",
            title: "\u8ba2\u5355\u603b\u91d1\u989d",
            text: ""
          },
          provider: {
            id: 3,
            type: 3,
            name: "provider",
            title: "\u652f\u4ed8\u65b9\u5f0f",
            text: ""
          },
          status: {
            id: 4,
            type: 5,
            name: "status",
            title: "\u8ba2\u5355\u72b6\u6001",
            text: ""
          },
          description: {
            id: 5,
            type: 5,
            name: "description",
            title: "\u652f\u4ed8\u63cf\u8ff0",
            text: ""
          },
          createTime: {
            id: 6,
            type: 3,
            name: "createTime",
            title: "\u521b\u5efa\u65f6\u95f4",
            text: ""
          }
        },
        userRefundRequest: {},
        refundListObj: {
          requestFee: {
            id: 9,
            type: 3,
            name: "requestFee",
            title: "\u7533\u8bf7\u9000\u6b3e\u91d1\u989d",
            text: ""
          },
          contactName: {
            id: 11,
            type: 3,
            name: "contactName",
            title: "\u8054\u7cfb\u4eba",
            text: ""
          },
          contactTel: {
            id: 12,
            type: 3,
            name: "contactTel",
            title: "\u8054\u7cfb\u4eba\u7535\u8bdd",
            text: ""
          },
          allowCall: {
            id: 13,
            type: 3,
            name: "allowCall",
            title: "\u5141\u8bb8\u7535\u8bdd\u8054\u7cfb"
          },
          status: {
            id: 14,
            type: 3,
            name: "status",
            title: "\u5ba1\u6838\u72b6\u6001"
          },
          approvalOpinion: {
            id: 15,
            type: 3,
            name: "approvalOpinion",
            title: "\u9000\u6b3e\u5ba1\u6279\u610f\u89c1"
          },
          requestTime: {
            id: 8,
            type: 3,
            name: "requestTime",
            title: "\u9000\u6b3e\u7533\u8bf7\u65f6\u95f4",
            text: ""
          },
          outRefundNo: {
            id: 7,
            type: 3,
            name: "outRefundNo",
            title: "\u9000\u6b3e\u5355\u53f7",
            text: ""
          }
        },
        hasRefundListObj: !1,
        orderID: null,
        totalFee: 0,
        orderNo: ""
      };
    },
    onLoad: function (e) {
      var t = this;
      return (async function () {
        await t.getData(e.id);
      })();
    },
    onPullDownRefresh: function () {
      var e = this;
      return (async function () {
        await e.getData(e.orderID);
        uni.stopPullDownRefresh();
      })();
    },
    methods: _(_({}, (0, s.mapActions)("order", ["GetTopupById"])), {}, {
      l: function (e) {
        return c.$t(e);
      },
      getData: function (e) {
        var t = this;
        return (async function () {
          var a, i, o;
          (a = await t.GetTopupById({
            id: e
          })).succeeded && (i = a.data, t.orderID = i.id, t.totalFee = i.totalFee, t.orderNo = i.orderNo, t.infoListObj.orderNo.text = i.orderNo, t.infoListObj.totalFee.text = (.01 * i.totalFee).toFixed(2) + "\u5143", t.infoListObj.provider.text = t.getPayment(i.provider), t.infoListObj.status.text = t.getOrderStatus(i.status), t.infoListObj.description.text = i.description, t.infoListObj.createTime.text = i.createTime, i.userRefundRequests && i.userRefundRequests.length > 0 && (o = i.userRefundRequests[i.userRefundRequests.length - 1], t.userRefundRequest = o, t.refundListObj.requestFee.text = (.01 * o.requestFee).toFixed(2) + "\u5143", t.refundListObj.contactName.text = o.contactName, t.refundListObj.contactTel.text = o.contactTel, t.refundListObj.allowCall.text = o.allowCall ? "\u5141\u8bb8" : "\u4e0d\u5141\u8bb8", t.refundListObj.status.text = t.getRefundStatus(o.status), t.refundListObj.approvalOpinion.text = o.approvalOpinion, t.refundListObj.requestTime.text = o.requestTime, t.refundListObj.outRefundNo.text = o.outRefundNo, t.refundStatus = o.status, t.hasRefundListObj = !0), t.hasRefundListObj || 1 !== i.status ? t.actions = [] : t.actions = [{
            name: "\u8054\u7cfb\u5ba2\u670d",
            key: 1
          }, {
            name: "\u7533\u8bf7\u9000\u6b3e",
            color: "#fc2b23",
            key: 2
          }]);
        })();
      },
      refundOrder: function (e) {
        (this.showRefund = e.dialog, e.hasRequest && this.getData(this.orderID));
      },
      getPayment: function (e) {
        return "wxpay" === e ? "\u5fae\u4fe1\u652f\u4ed8" : "ali" === e.slice(0, 3) ? "\u963f\u91cc\u652f\u4ed8" : void 0;
      },
      getOrderStatus: function (e) {
        return -1 === e ? "\u5df2\u53d6\u6d88" : 0 === e ? "\u672a\u652f\u4ed8" : 1 === e ? "\u5df2\u652f\u4ed8" : 2 === e ? "\u5df2\u90e8\u4efd\u9000\u6b3e" : 3 === e ? "\u5df2\u5168\u989d\u9000\u6b3e" : void 0;
      },
      getRefundStatus: function (e) {
        return 0 === e ? "\u7b49\u5f85\u5ba1\u6838" : 1 === e ? "\u5ba1\u6838\u901a\u8fc7" : 2 === e ? "\u5ba1\u6838\u4e0d\u901a\u8fc7" : void 0;
      },
      onCopyValue: function (e) {
        uni.setClipboardData({
          data: e,
          showToast: !1,
          success: function () {
            (0, d.qzwlToast)("\u5185\u5bb9\u5df2\u590d\u5236");
          }
        });
      },
      question: function () {
        this.showQuestion = !0;
      },
      getPackageType: function () {},
      questionSelect: function (e) {
        var t = this;
        return (0, o.default)(r.default.mark(function n() {
          var a;
          return r.default.wrap(function (n) {
            for (; ; ) switch (n.prev = n.next) {
              case 0:
                if ((e.name, a = e.key, t.showQuestion = !1, 1 !== a)) {
                  n.next = 7;
                  break;
                }
                if (plus.runtime.isApplicationExist({
                  pname: "com.tencent.mm",
                  action: "weixin://"
                })) {
                  n.next = 6;
                  break;
                }
                return ((0, d.qzwlToast)("\u8bf7\u5148\u5b89\u88c5\u5fae\u4fe1"), n.abrupt("return"));
              case 6:
                uni.navigateTo({
                  url: "/pagesMore/my/support"
                });
              case 7:
                2 === a && (t.showRefund = !0);
              case 8:
              case "end":
                return n.stop();
            }
          }, n);
        }))();
      }
    })
  };
  t.default = m;
})(module, exports, __r);
