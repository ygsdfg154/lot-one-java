// Node 22+ 移除了 util.isXxx 系列旧 API，而 uni-app v2 的工具链（webpack4 era）还在用。
// 这里补回来，纯兼容垫片，不影响业务代码。
const util = require('util');
const defs = {
  isArray: (v) => Array.isArray(v),
  isBoolean: (v) => typeof v === 'boolean',
  isNull: (v) => v === null,
  isNullOrUndefined: (v) => v == null,
  isNumber: (v) => typeof v === 'number',
  isString: (v) => typeof v === 'string',
  isSymbol: (v) => typeof v === 'symbol',
  isUndefined: (v) => v === undefined,
  isRegExp: (v) => Object.prototype.toString.call(v) === '[object RegExp]',
  isObject: (v) => v !== null && typeof v === 'object',
  isDate: (v) => Object.prototype.toString.call(v) === '[object Date]',
  isError: (v) => Object.prototype.toString.call(v) === '[object Error]' || v instanceof Error,
  isFunction: (v) => typeof v === 'function',
  isPrimitive: (v) => v === null || (typeof v !== 'object' && typeof v !== 'function'),
  isBuffer: (v) => Buffer.isBuffer(v),
};
for (const [k, fn] of Object.entries(defs)) if (typeof util[k] !== 'function') util[k] = fn;

// sass >= 1.80 的 legacy API 会刷屏弃用警告：legacy-js-api 与 @import。
// uni-app v2 工具链（自带 sass-loader / component-compiler-utils）走的是 sass.render(renderSync)，
// 没法在 vue.config.js 里把 silenceDeprecations 传进去；uview-ui 2.x 也全是 @import，不可能逐个改。
// 这里在预加载阶段统一把两个警告静默掉。调用方显式传了 silenceDeprecations 时以调用方为准。
const SILENCED_SASS_DEPRECATIONS = ['import', 'legacy-js-api'];
try {
  const sass = require('sass');
  for (const name of ['render', 'renderSync']) {
    const original = sass[name];
    sass[name] = function (options, ...rest) {
      if (options && typeof options === 'object' && !options.silenceDeprecations) {
        options = Object.assign({}, options, { silenceDeprecations: SILENCED_SASS_DEPRECATIONS });
      }
      return original.call(this, options, ...rest);
    };
  }
} catch (e) {
  // sass 没装时（比如只跑 jest 的场景）跳过，不影响其他脚本
}
