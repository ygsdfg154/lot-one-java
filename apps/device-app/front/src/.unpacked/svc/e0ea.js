// webpack 模块 e0ea  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r, i = a(require("@/.unpacked/svc/7ca3.js")), o = (r = {
    appConfig: function (e) {
      return e.app.appConfig;
    },
    agreeSigninAgreement: function (e) {
      return e.app.agreeSigninAgreement;
    },
    sysInfo: function (e) {
      return e.app.sysInfo;
    },
    pushClientId: function (e) {
      return e.app.pushClientId;
    },
    autoCheckUpdate: function (e) {
      return e.app.autoCheckUpdate;
    },
    isAuditMode: function (e) {
      return e.sys.isAuditMode;
    },
    agreeAudio: function (e) {
      return e.app.agreeAudio;
    },
    advertisingState: function (e) {
      return e.app.advertisingState;
    },
    advertisingContent: function (e) {
      return e.app.advertisingContent;
    },
    setLocaleState: function (e) {
      return e.app.setLocaleState;
    },
    noticeData: function (e) {
      return e.app.noticeData;
    },
    isAuthenticated: function (e) {
      return e.account.isAuthenticated;
    },
    lastUsername: function (e) {
      return e.account.lastUsername;
    },
    lastPassword: function (e) {
      return e.account.lastPassword;
    },
    access_token: function (e) {
      return e.account.access_token;
    },
    enterpriseInfo: function (e) {
      return e.account.enterpriseInfo;
    },
    enterpriseId: function (e) {
      return e.account.enterpriseId;
    },
    refreshTerminalPage: function (e) {
      return e.account.refreshTerminalPage;
    },
    remPassword: function (e) {
      return e.account.remPassword;
    },
    userId: function (e) {
      return e.user.wxUser;
    },
    nickname: function (e) {
      return e.user.nickname;
    },
    username: function (e) {
      return e.user.username;
    },
    userType: function (e) {
      return e.user.userType;
    },
    terminalNo: function (e) {
      return e.user.terminalNo;
    },
    selectedTerminal: function (e) {
      return e.device.selectedTerminal;
    }
  }, (0, i.default)(r, "selectedTerminal", function (e) {
    return e.device.selectedTerminal;
  }), (0, i.default)(r, "terminalFuncs", function (e) {
    return e.device.terminalFuncs;
  }), (0, i.default)(r, "activationState", function (e) {
    return e.device.activationState;
  }), (0, i.default)(r, "valueAddedConfig", function (e) {
    return e.device.valueAddedConfig;
  }), (0, i.default)(r, "unBindMarkerId", function (e) {
    return e.device.unBindMarkerId;
  }), (0, i.default)(r, "isDevMode", function (e) {
    return e.dev.isDevMode;
  }), (0, i.default)(r, "terminals", function (e) {
    return e.terminal.terminals;
  }), (0, i.default)(r, "providerList", function (e) {
    return e.order.providerList;
  }), (0, i.default)(r, "appMpShow", function (e) {
    return e.sys.appMpShow;
  }), (0, i.default)(r, "permissionDeclare", function (e) {
    return e.sys.permissionDeclare;
  }), (0, i.default)(r, "isPermissionAlertShow", function (e) {
    return e.sys.isPermissionAlertShow;
  }), (0, i.default)(r, "isAuditModeAndroid", function (e) {
    return e.sys.isAuditModeAndroid;
  }), r), s = o;
  t.default = s;
})(module, exports, __r);
