/*
 * 模块: store/modules/sys.js
 * 反编译自 webpack 模块 e73b（svc 编译空间）
 * async/await 还原: 0 个已转换, 2 个含条件跳转/try-catch 保持状态机原样
 * 内层仍在调用 a()，已就地重建 interopRequireDefault
 */
import mod127e from '@/.unpacked/svc/127e.js'
import ee10 from '@/.unpacked/svc/ee10.js'
import e92d from 'semver'

function a(m) { return m && m.__esModule ? m : { default: m }; }

"use strict";
var o = (a(require("vue")), a(require("../../common/config.js"))), s = (require("../../common/request.js"), a(require("../index.js")), a(require("@/.unpacked/svc/bd05.js"))), d = {
  namespaced: true,
  state: {
    isAuditMode: false,
    isAuditModeAndroid: false,
    appVersion: "",
    version: "",
    appMpShow: false,
    isPermissionAlertShow: false,
    permissionDeclare: {}
  },
  mutations: {
    setRequestPermission: function (e, t) {
      (t.permission && (e.permissionDeclare = [{
        name: "android.permission.ACCESS_COARSE_LOCATION",
        title: "\u8bfb\u53d6\u4f4d\u7f6e\u6743\u9650\u7533\u8bf7\u8bf4\u660e",
        details: "\u8c26\u8bda\u4f4d\u8054\u9700\u8981\u8bfb\u53d6\u4f4d\u7f6e\u6743\u9650\uff0c\u7528\u4e8e\u5728\u9996\u9875\u5730\u56fe\u5c55\u793a\u7528\u6237\u5f53\u524d\u4f4d\u7f6e\u4ee5\u53ca\u5c55\u793a\u5468\u8fb9\u8bbe\u65bd\u548c\u8bbe\u5907\u4f4d\u7f6e\u548c\u6d4b\u91cf\u7528\u6237\u4e0e\u8bbe\u5907\u7684\u8ddd\u79bb"
      }, {
        name: "android.permission.CAMERA",
        title: "\u8bfb\u53d6\u76f8\u673a\u6743\u9650\u7533\u8bf7\u8bf4\u660e",
        details: "\u8c26\u8bda\u4f4d\u8054\u9700\u8981\u8bfb\u53d6\u76f8\u673a\u6743\u9650\uff0c\u7528\u4e8e\u626b\u63cf\u548c\u8bc6\u522b\u8bbe\u5907\u4e8c\u7ef4\u7801\uff0c\u53ef\u4ee5\u5feb\u901f\u83b7\u53d6\u8bbe\u5907\u7f16\u53f7\u8fdb\u884c\u7ed1\u5b9a\u8bbe\u5907\u64cd\u4f5c"
      }, {
        name: "android.permission.READ_MEDIA_IMAGES",
        title: "\u8bfb\u53d6\u76f8\u518c\u6743\u9650\u7533\u8bf7\u8bf4\u660e",
        details: "\u8c26\u8bda\u4f4d\u8054\u9700\u8981\u8bfb\u53d6\u76f8\u518c\u6743\u9650\uff0c\u7528\u4e8e\u626b\u63cf\u548c\u8bc6\u522b\u8bbe\u5907\u4e8c\u7ef4\u7801\uff0c\u53ef\u4ee5\u5feb\u901f\u83b7\u53d6\u8bbe\u5907\u7f16\u53f7\u8fdb\u884c\u7ed1\u5b9a\u8bbe\u5907\u64cd\u4f5c"
      }].find(function (e) {
        return e.name == t.permission;
      })), e.isPermissionAlertShow = t.permissionAlertShow);
    },
    setIsAuditMode: function (e, t) {
      e.isAuditMode = t;
    },
    setIsAuditModeAndroid: function (e, t) {
      e.isAuditModeAndroid = t;
    },
    setAppVersion: function (e, t) {
      e.appVersion = t;
    },
    setVersion: function (e, t) {
      e.version = t;
    },
    setAppMpShow: function (e, t) {
      e.appMpShow = t;
    }
  },
  actions: {
    CheckAppAuditModeIos: function (e) {
      return ee10(mod127e.mark(function t() {
        var n;
        return mod127e.wrap(function (t) {
          while (1) switch (t.prev = t.next) {
            case 0:
              if ((n = e.commit, o.default.auditMode.enable)) {
                t.next = 4;
                break;
              }
              return (n("setIsAuditMode", false), t.abrupt("return"));
            case 4:
              s.default().then(function (e) {
                var t = uni.getSystemInfoSync();
                (n("setAppVersion", t.appVersion), e && e.data && e.data.version ? (n("setVersion", e.data.version), e92d.gt(t.appVersion, e.data.version) ? n("setIsAuditMode", true) : n("setIsAuditMode", false)) : n("setIsAuditMode", true));
              }).catch(function (e) {
                n("setIsAuditMode", true);
              });
            case 5:
            case "end":
              return t.stop();
          }
        }, t);
      }))();
    },
    CheckAppAuditModeAndroid: function (e) {
      return ee10(mod127e.mark(function t() {
        var n;
        return mod127e.wrap(function (t) {
          while (1) switch (t.prev = t.next) {
            case 0:
              if ((n = e.commit, o.default.auditMode.enable)) {
                t.next = 4;
                break;
              }
              return (n("setIsAuditModeAndroid", false), t.abrupt("return"));
            case 4:
              s.default().then(function (e) {
                var t = uni.getSystemInfoSync();
                (n("setAppVersion", t.appVersion), e && e.data && e.data.version ? (n("setVersion", e.data.version), e92d.gt(t.appVersion, e.data.version) ? n("setIsAuditModeAndroid", true) : n("setIsAuditModeAndroid", false)) : n("setIsAuditModeAndroid", true));
              }).catch(function (e) {
                n("setIsAuditModeAndroid", true);
              });
            case 5:
            case "end":
              return t.stop();
          }
        }, t);
      }))();
    }
  }
}, c = d;
export default c;

