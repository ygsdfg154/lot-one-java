/**
 * HTTP 请求层（手写重构，替换原反编译产物）。
 *
 * 原版是 webpack 还原出来的 regenerator 状态机，且带着两处老后端遗留：把
 * `http://h5.akbee.com` 强行改写成 http、以及只认原厂的 9006 业务码。现在按自有后端
 * 契约（doc/api/device-app-api.md）重写：
 *
 *   - 统一信封 `{code, msg, data}`，**HTTP 状态恒 200**，成败只看 code；
 *   - 必带 `X-Lang`，否则 msg 全是英文；
 *   - query 里的数组序列化成重复参数（见 qs.js，逗号分隔后端不认）；
 *   - 业务码分流：10002 掉线、21003 未绑手机号、10005 限流、20004 上游不可用；
 *   - 保留原有的 loading 计数与返回结构 `{origin, code, succeeded, msg, data}`，
 *     store 侧无需改动即可拿到修正后的行为。
 */
import config from './config.js';
import { LANG } from './env.js';
import { withQuery } from './qs.js';
import { qzwlToast } from './utils.js';

// 业务码（契约 0.7）。只列本层需要分流的，其余交给调用方。
export const CODE_OK = 0;
export const CODE_INVALID_ARGUMENT = 10001;
export const CODE_UNAUTHORIZED = 10002;
export const CODE_TOO_MANY_REQUESTS = 10005;
export const CODE_GATE_UNAVAILABLE = 20004;
export const CODE_PHONE_BIND_REQUIRED = 21003;
export const CODE_DEVICE_IDENTITY_FORBIDDEN = 21010;
export const CODE_DEVICE_NOT_OWNED = 21011;

// 指令下发结果码（契约 10.1 的 data.ret）：0 成功 / 10 设备离线 / 12 不支持。
// 注意 ret=10 时 code 仍是 0——"设备离线"不是错误，不能按失败提示。
export const RET_OK = 0;
export const RET_DEVICE_OFFLINE = 10;
export const RET_NOT_SUPPORTED = 12;

const DEFAULT_TIMEOUT = 20000;

// loading 计数：并发请求时只显示一个转圈，最后一个结束才关掉。
let pending = 0;
let loadingTimers = [];

/**
 * 与登录态的交互点。本层**不 import store**：store 的模块会 import api、api import 本层，
 * 直接引用 store 会形成 `store → api → request → store` 的循环依赖（打包时靠 ESM 提升
 * 侥幸能跑，单测里直接炸）。由 main.js 在启动时注入。
 */
const hooks = {
  /** @returns {string} 当前 token */
  token: () => '',
  /** 服务端下发新 token（滑动续期） */
  onTokenRefreshed: () => { },
  /** 10002：清登录态并回首页 */
  onUnauthorized: () => { },
  /** 21003：引导去绑定手机号 */
  onPhoneBindRequired: () => { },
};

/**
 * 注入登录态相关回调（main.js 启动时调用一次）。
 * @param {Partial<typeof hooks>} impl
 */
export function configureRequest(impl) {
  Object.assign(hooks, impl || {});
}

/**
 * 后端 base URL。开发者页面可以切环境（environmentStorage），没切就用编译期配置。
 * @returns {string}
 */
function serviceRoot() {
  const env = uni.getStorageSync('environmentStorage');
  return (env && env.value) || config.serviceRoot || '';
}

/**
 * 组装请求头。
 * @param {Object} extra 调用方附加头
 * @returns {Object}
 */
function buildHeaders(extra) {
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    // 契约 0.3：默认 en，必须显式声明才返回中文文案
    'X-Lang': LANG,
    ...(extra || {}),
  };
  const token = hooks.token();
  if (token) headers.Authorization = 'Bearer ' + token;
  return headers;
}

function showLoadingSoon(mask) {
  // 延迟 200ms 再转圈：快请求不闪 loading
  loadingTimers.push(
    setTimeout(function () {
      uni.showLoading({ title: '加载中', mask: mask !== false });
    }, 200)
  );
}

function clearLoading() {
  loadingTimers.forEach(clearTimeout);
  loadingTimers = [];
  uni.hideLoading();
}

/**
 * 掉线：清登录态并回首页。token 过期、被改密吊销都会走到这里。
 */
function handleUnauthorized(msg) {
  hooks.onUnauthorized();
  qzwlToast(msg || '登录已过期，请重新登录', 'none');
}

/**
 * 第三方登录建号后未绑手机号：除绑定接口外一律 21003，必须引导去绑定，
 * 否则用户会在每个页面看到同一个错误提示却不知道要做什么。
 */
function handlePhoneBindRequired(msg) {
  qzwlToast(msg || '请先绑定手机号', 'none');
  hooks.onPhoneBindRequired();
}

/**
 * 业务码分流。返回 true 表示本层已处理提示，调用方不必再 toast。
 * @param {number} code
 * @param {string} msg
 * @returns {boolean}
 */
function dispatchBizCode(code, msg) {
  switch (code) {
    case CODE_UNAUTHORIZED:
      handleUnauthorized(msg);
      return true;
    case CODE_PHONE_BIND_REQUIRED:
      handlePhoneBindRequired(msg);
      return true;
    case CODE_TOO_MANY_REQUESTS:
      qzwlToast(msg || '操作过于频繁，请稍后再试', 'none');
      return true;
    case CODE_GATE_UNAVAILABLE:
      // 上游（iot-runtime）不可用：这是"数据暂时取不到"，不是用户操作错误，
      // 提示要与参数错误区分开，否则用户会反复重试同一个动作。
      qzwlToast(msg || '设备数据暂时不可用，请稍后再试', 'none');
      return true;
    default:
      return false;
  }
}

/**
 * 发一个请求。
 *
 * @param {Object} options
 * @param {string} options.url        契约路径（如 `/devices/123/realtime`），相对 serviceRoot；
 *                                    传绝对地址（http(s)://）则原样使用，不拼 base、不带鉴权头
 * @param {string} [options.method]   默认 POST（沿用原有默认值，api 层都会显式传）
 * @param {Object} [options.data]     请求体（POST/PUT/PATCH）
 * @param {Object} [options.query]    query 参数；数组会展开成重复 key（契约要求）
 * @param {boolean} [options.loading] 是否显示转圈
 * @param {boolean} [options.mask]    转圈是否遮罩，默认 true
 * @param {number} [options.time]     超时毫秒，默认 20000
 * @param {boolean} [options.toastState] true = 调用方自己提示，本层不 toast 业务失败
 * @param {Object} [options.header]   附加请求头
 * @returns {Promise<{origin: Object, code: number, succeeded: boolean, msg: string, data: *}>}
 */
export function request(options) {
  const opts = options || {};
  const absolute = /^https?:\/\//.test(opts.url);
  const url = absolute
    ? withQuery(opts.url, opts.query)
    : serviceRoot() + withQuery(opts.url, opts.query);
  const headers = absolute ? { ...(opts.header || {}) } : buildHeaders(opts.header);

  if (opts.loading) {
    pending += 1;
    showLoadingSoon(opts.mask);
  }

  return new Promise(function (resolve) {
    uni.request({
      url: url,
      method: opts.method || 'POST',
      header: headers,
      timeout: opts.time || DEFAULT_TIMEOUT,
      data: opts.data,
      success: function (res) {
        // 服务端会在响应头里带新 token（滑动续期）时同步存下来
        if (res.header && res.header.Authorization) {
          hooks.onTokenRefreshed(res.header.Authorization);
        }
        if (res.statusCode !== 200) {
          // 契约 0.1：HTTP 状态恒 200。出现 4xx/5xx 说明请求没进业务层
          // （路由不存在/网关问题），按"服务不可用"处理并保留原始状态便于排查。
          qzwlToast('服务暂时不可用，请稍后再试', 'none');
          resolve({
            origin: res.data,
            code: -res.statusCode,
            succeeded: false,
            msg: 'HTTP ' + res.statusCode,
            data: null,
          });
          return;
        }
        const body = res.data || {};
        const code = body.code;
        const msg = body.msg || body.message || '';
        const handled = code !== CODE_OK && dispatchBizCode(code, msg);
        if (code !== CODE_OK && !handled && !opts.toastState && msg) {
          qzwlToast(msg, 'none');
        }
        resolve({
          origin: body,
          code: code,
          succeeded: code === CODE_OK,
          msg: msg || 'request:ok',
          data: body.data,
        });
      },
      fail: function (err) {
        const errMsg = (err && err.errMsg) || '';
        let msg = '网络异常，请稍后再试';
        if (errMsg.indexOf('timeout') >= 0) {
          msg = '请求超时，请稍后再试';
        } else if (errMsg.indexOf('abort') >= 0 || errMsg.indexOf('fail') >= 0) {
          msg = '网络连接失败，请检查网络';
        }
        qzwlToast(msg, 'none');
        resolve({ origin: null, code: -1, succeeded: false, msg: msg, data: null });
      },
      complete: function () {
        if (opts.loading) pending -= 1;
        if (pending <= 0) {
          pending = 0;
          clearLoading();
        }
      },
    });
  });
}

export default { request, configureRequest };
