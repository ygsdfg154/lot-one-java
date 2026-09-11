/**
 * 前端单测配置。
 *
 * 只测**纯逻辑层**：adapters（契约 DTO → 视图模型）、api（路径与参数序列化）、
 * common/qs 等。页面与 uni-app 运行时不在这里测——nvue/uni API 需要真机或
 * puppeteer，那部分由 tools/smoke.js 与真机点检覆盖。
 */
module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/tests/setup.js'],
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  // 反编译产物用 @ 指向 src（与 vue.config.js 的 alias 一致）
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
  transform: { '^.+\\.js$': ['babel-jest', { configFile: './babel.config.test.js' }] },
  collectCoverageFrom: ['src/adapters/**/*.js', 'src/api/**/*.js', 'src/common/qs.js'],
};
