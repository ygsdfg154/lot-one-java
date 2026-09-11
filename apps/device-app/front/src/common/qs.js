/**
 * query string 序列化。
 *
 * 为什么不能直接把对象丢给 `uni.request` 的 `data`：契约里有几个**重复参数**
 * （`deviceIds=a&deviceIds=b`、`alarmCodes=SOS&alarmCodes=SHAKE`），而 uni 只会把对象
 * 的同一个 key 序列化一次。实测把它们写成逗号分隔（`deviceIds=a,b`）**不生效**——后端会
 * 把整串当成一个设备号，结果是 21011（见契约 12.1 请求参数表的注记）。
 */

/**
 * 单个值序列化：数组展开成重复 key，null/undefined 整项丢弃（不发 `k=`，那会被后端当成空串）。
 * @param {string} key
 * @param {*} value
 * @returns {string[]} 形如 ["k=v"] 的片段
 */
function pairs(key, value) {
  if (value === null || value === undefined || value === '') return [];
  if (Array.isArray(value)) {
    // 逐个展开；数组里的空值同样丢弃，避免拼出 deviceIds=
    return value.reduce((acc, v) => acc.concat(pairs(key, v)), []);
  }
  if (typeof value === 'boolean') {
    return [`${encodeURIComponent(key)}=${value ? 'true' : 'false'}`];
  }
  return [`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`];
}

/**
 * 对象 → query string（不含前导 ?）。key 顺序按传入顺序，便于测试断言与日志比对。
 * @param {Object} [params]
 * @returns {string}
 */
export function stringify(params) {
  if (!params) return '';
  return Object.keys(params)
    .reduce((acc, key) => acc.concat(pairs(key, params[key])), [])
    .join('&');
}

/**
 * 把 query 挂到 path 上（已有 ? 时用 &）。
 * @param {string} path
 * @param {Object} [params]
 * @returns {string}
 */
export function withQuery(path, params) {
  const qs = stringify(params);
  if (!qs) return path;
  return path + (path.indexOf('?') >= 0 ? '&' : '?') + qs;
}
