/**
 * 应用配置与内容位（契约 5.1/5.2/5.3 与 14.x）。
 *
 * 这几个接口都是**公开**的：App 冷启动就要检查更新、弹公告、画轮播，不该等登录之后。
 */
import { request } from '../common/request.js';
import { currentPlatform } from '../common/env.js';

/** 5.1 检测更新。platform 1安卓 2iOS 3小程序；无版本记录时 hasUpdate=false，不报错。 */
export function checkVersion({ version, platform } = {}) {
  return request({
    url: '/app/version',
    method: 'GET',
    query: { platform: platform === undefined ? currentPlatform() : platform, version },
  });
}

/** 5.2 关于我们（含隐私政策/服务协议地址，内容维护在外部页面）。 */
export function about() {
  return request({ url: '/app/about', method: 'GET' });
}

/** 5.3 微信 JS-SDK 签名（H5 端 wx.config；url 必须是当前页完整地址，含 query 不含 hash）。 */
export function jsSign({ url }) {
  return request({ url: '/wx/js-sign', method: 'POST', data: { url } });
}

/** 14.1 公告列表（分页）。 */
export function notices({ page = 1, pageSize = 10 } = {}) {
  return request({
    url: '/notices',
    method: 'GET',
    loading: true,
    query: { page, pageSize, platform: currentPlatform() },
  });
}

/** 14.1 最新一条公告（首页弹窗）。`hasNotice=false` 表示没有公告，**不是错误**。 */
export function latestNotice() {
  return request({ url: '/notices/latest', method: 'GET', query: { platform: currentPlatform() } });
}

/**
 * 14.1 公告详情。走 `/notices/detail?id=` 而不是 `/notices/{id}`——同层有 `latest`
 * 字面量路由，通配段会把它吞掉（契约 0.2 路由形状约定）。
 */
export function noticeDetail(id) {
  return request({ url: '/notices/detail', method: 'GET', query: { id } });
}

/** 14.2 首页广告位（生效中，已按 sort 降序）。 */
export function ads() {
  return request({ url: '/app-ads', method: 'GET', query: { platform: currentPlatform() } });
}

/** 14.2 广告点击埋点（未登录也可上报；广告已下架返回 10004）。 */
export function clickAd(id) {
  return request({
    url: `/app-ads/${encodeURIComponent(id)}/click`,
    method: 'POST',
    data: {},
    // 埋点失败不该打断用户的跳转，自己吞掉提示
    toastState: true,
  });
}
