/**
 * 环境配置（手工维护，不是反编译产物）。
 *
 * 反编译出来的 `.unpacked/svc/6093.js` 里写死了原厂后端地址（h5.akbee.com），那个文件
 * 是打包产物的还原，不该手改——一旦重跑 tools/restore.js 就会被覆盖。所以环境相关的
 * 配置集中放在这里，由 common/config.js 叠加在它之上（本文件的值优先）。
 */

// serviceRoot 后端 base URL，**必须带 /v1**（契约路径都是 /v1/xxx，见 doc/api）。
const H5_SERVICE_ROOT = '/v1';
// 已迁移到 Java Spring Cloud 网关（开发环境），上线时改为线上网关地址
const APP_SERVICE_ROOT = 'http://localhost:8080/device/v1';

// platform 端型编码，与契约 5.1 检测更新 / 2.5 推送注册同一套：1 安卓 2 iOS 3 微信小程序。
// 0 = 未知（不影响功能，只影响"按端下发"的公告/广告/版本过滤）。
export const PLATFORM_UNKNOWN = 0;
export const PLATFORM_ANDROID = 1;
export const PLATFORM_IOS = 2;
export const PLATFORM_MP = 3;

/**
 * 当前端型。uni 的 platform 是 'android' | 'ios' | 'devtools' 等，这里归一成契约的数字。
 * @returns {number}
 */
export function currentPlatform() {
  const info = typeof uni !== 'undefined' && uni.getSystemInfoSync ? uni.getSystemInfoSync() : {};
  // uniPlatform 在小程序里是 'mp-weixin'，H5 里是 'web'
  if (String(info.uniPlatform || '').startsWith('mp-')) return PLATFORM_MP;
  switch (String(info.platform || '').toLowerCase()) {
    case 'android':
      return PLATFORM_ANDROID;
    case 'ios':
      return PLATFORM_IOS;
    default:
      return PLATFORM_UNKNOWN;
  }
}

/**
 * 默认后端地址。H5 用相对路径走代理，其余端用绝对地址。
 * @returns {string}
 */
function defaultServiceRoot() {
  // process.env.UNI_PLATFORM 由 uni-app 构建注入；jest 里没有，按 h5 处理。
  const platform = typeof process !== 'undefined' && process.env ? process.env.UNI_PLATFORM : 'h5';
  return platform === 'h5' || !platform ? H5_SERVICE_ROOT : APP_SERVICE_ROOT;
}

// 语言：契约默认 en，必须显式带 X-Lang 才是中文（否则 msg 全英文）。
export const LANG = 'zh';

export default {
  serviceRoot: defaultServiceRoot(),
  // 分享落地页与下载页仍指向原厂域名时是无效链接，联调期先留空，由页面按空值降级。
  sharePositionUrl: '',
  downloadApp: '',
};
