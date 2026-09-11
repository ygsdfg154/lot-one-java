// uni-app 的全局 `uni` 在 node 环境下不存在，而反编译产物里有模块在**导入时**就调用
// uni.getSystemInfoSync()（如 store/modules/app.js 的 state 初始化）。这里给一个最小
// 桩，保证被测模块能加载；各用例会按需覆盖 uni.request 等方法。
global.uni = {
  getSystemInfoSync: () => ({ platform: 'devtools', uniPlatform: 'web' }),
  getStorageSync: () => '',
  setStorageSync: () => {},
  removeStorageSync: () => {},
  showLoading: () => {},
  hideLoading: () => {},
  showToast: () => {},
  showModal: () => {},
  reLaunch: () => {},
  navigateTo: () => {},
  request: () => {},
};
