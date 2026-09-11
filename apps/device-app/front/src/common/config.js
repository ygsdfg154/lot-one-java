/*
 * 模块: common/config.js
 * 反编译自 webpack 模块 e113（svc 编译空间）
 */
import mod7ca3 from '@/.unpacked/svc/7ca3.js'
import mod6093 from '@/.unpacked/svc/6093.js'
import localEnv from './env.js'

"use strict";
var u = {
  cdn: "/static/app-plus",
  storeHome: "https://shop.zhitugps.com/mobile/pages/login/auto-login?account=17093433338",
  defaultScale: 16,
  secondsToRefresh: 20,
  ingoreAuthFiles: ["/public/locate", "/public/qzwl-authorize", "/app-updateVersions/pages/upgrade-popup"],
  primaryColor: "#6081C7",
  erorColor: "#F56C6C",
  titleColor: "#FFFFFF",
  wiredDevice: ["ZH-168a", "ZH-168", "ZH-1", "ZH-2", "ZH-3", "ZH-5", "ZH-168", "ZH-169", "ZH-188", "ZH-145", "X1", "X2", "X3", "X5", "X7", "X2x", "ZH-5_BL", "ZH-3_BL", "ZH-2_BL", "ZH-1_BL", "ZH-188_BL", "ZH-169_BL", "ZH-168_BL", "ZH-145_BL"],
  wirelessDevice: ["Z8y", "Z2y", "Z1y", "P5R", "P6", "P7", "Z2", "Z1x", "Z8x", "Z8", "Z1", "Z5"],
  tm200: ["ZH-1", "ZH-2", "ZH-3", "ZH-5", "ZH-1w"],
  primevalMpId: "gh_ef4771184692"
}, d = {
  ...u,
  ...mod6093,
  // localEnv 放最后：serviceRoot 等环境相关项以手工维护的 common/env.js 为准。
  // 6093 是打包产物还原出来的模块（写死了原厂后端地址），重跑 tools/restore.js
  // 会被覆盖，所以不在那里改。
  ...localEnv
};
export default d;

