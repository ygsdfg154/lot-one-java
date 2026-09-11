/**
 * 应用级状态：系统信息、推送标识、公告、首页广告位、应用配置。
 *
 * 重写自反编译产物。原版在**冷启动**就打两个老后端接口，实测浏览器控制台两条 404：
 *   - `/application-configuration` → 契约拆成 5.2 关于我们 + 前端本地常量；
 *   - `/app-ad/publish/{applicationId}` → 契约 14.2 `/app-ads`（不带 applicationId，
 *     按端型过滤）。
 * 公告也从 `/notice/latest`、`/notice/{id}` 换到 14.1（详情走 `/notices/detail?id=`，
 * 因为 `/notices/` 下有 `latest` 字面量路由，通配段会把它吞掉）。
 */
import * as contentApi from '../../api/content.js';
import * as authApi from '../../api/auth.js';
import { currentPlatform } from '../../common/env.js';

const state = {
  agreeSigninAgreement: false,
  agreeAudio: true,
  sysInfo: uni.getSystemInfoSync(),
  pushClientId: '',
  firstUrl: '',
  // appConfig 现在只放"关于我们"那几项（appName/version/copyright/website/email/
  // privacyPolicyUrl/agreementUrl）。原厂那些开关（pushAlarm/wechatAlarm/telAlarm/
  // activation）是 vendor 的运营配置，本平台按设备能力（6.1 capabilities）与通知渠道
  // （8.6.2b）决定，不再由一个全局开关控制。
  appConfig: {},
  autoCheckUpdate: true,
  versionInfo: null,
  devRecord: '2022-1-7',
  devDate: '2022-1-7',
  devMaxDate: '2022-1-7',
  noticeData: null,
  advertisingState: false,
  advertisingContent: [],
  setLocaleState: true,
};

const mutations = {
  setSetLocaleState(s, v) {
    s.setLocaleState = v;
  },
  setAgreeAudio(s, v) {
    s.agreeAudio = v;
  },
  setRecordDate(s, v) {
    s.devRecord = v.record;
    s.devDate = v.date;
    s.devMaxDate = v.maxDate;
  },
  setAgreeSigninAgreement(s, v) {
    s.agreeSigninAgreement = v;
  },
  setSysInfo(s, v) {
    s.sysInfo = v;
  },
  setFirstUrl(s, v) {
    s.firstUrl = v;
  },
  setPushClientId(s, v) {
    s.pushClientId = v;
  },
  setAppConfig(s, v) {
    s.appConfig = v || {};
  },
  setAutoCheckUpdate(s, v) {
    s.autoCheckUpdate = v;
  },
  setVersionInfo(s, v) {
    s.versionInfo = v;
  },
  setNoticeData(s, v) {
    s.noticeData = v;
  },
  setAdvertising(s, list) {
    if (list && list.length) {
      s.advertisingContent = list;
      s.advertisingState = true;
      return;
    }
    s.advertisingContent = [];
    s.advertisingState = false;
  },
  setAdvertisingState(s, v) {
    s.advertisingState = v;
  },
};

const actions = {
  /**
   * 5.2 应用配置（关于我们）。冷启动调一次；`onLaunch` 时顺带拉公告与广告位。
   * 原来这里还会去拉支付渠道，那属于下单页的事，挪到用到的地方按需拉。
   */
  async GetApplicationConfiguration({ commit, dispatch }, stage) {
    const res = await contentApi.about();
    if (res.succeeded) {
      commit('setAppConfig', res.data || {});
      if (stage === 'onLaunch') {
        dispatch('GetNoticeLatest');
        dispatch('GetAdvertising');
      }
    }
    return res;
  },

  /** 5.1 检测更新。无版本记录时 hasUpdate=false，不是错误。 */
  async CheckVersion({ state: s, commit }) {
    const res = await contentApi.checkVersion({
      version: (s.sysInfo && s.sysInfo.appVersion) || '',
      platform: currentPlatform(),
    });
    if (res.succeeded) commit('setVersionInfo', res.data || null);
    return res;
  },

  /** 14.1 最新公告（首页弹窗）。没有公告时 hasNotice=false，noticeData 置空即可。 */
  async GetNoticeLatest({ commit }) {
    const res = await contentApi.latestNotice();
    if (res.succeeded) {
      commit('setNoticeData', res.data && res.data.hasNotice ? res.data.notice : null);
    }
    return res;
  },

  /** 14.1 公告详情。 */
  GetNoticeDetails(_ctx, payload) {
    const id = payload && (payload.id !== undefined ? payload.id : payload);
    return contentApi.noticeDetail(id);
  },

  /** 14.1 公告列表。 */
  GetNoticeList(_ctx, payload = {}) {
    return contentApi.notices({ page: payload.page || 1, pageSize: payload.pageSize || 10 });
  },

  /** 14.2 首页广告位。 */
  async GetAdvertising({ commit }) {
    const res = await contentApi.ads();
    if (res.succeeded) commit('setAdvertising', (res.data && res.data.items) || []);
    return res;
  },

  /** 14.2 广告点击埋点。埋点失败不阻塞跳转（api 层已关掉 toast）。 */
  ClickAd(_ctx, payload) {
    return contentApi.clickAd(payload && (payload.id !== undefined ? payload.id : payload));
  },

  /**
   * 2.5 注册厂商推送标识。原厂是把 pushClientId 塞进 set-push-alarm 的开关请求里，
   * 契约把"推到哪"（本接口）与"要不要推"（8.6.2b 的 appPush 开关）拆成了两件事。
   */
  async RegisterPushToken({ state: s, commit }, payload) {
    const pushToken = (payload && payload.pushToken) || s.pushClientId;
    if (!pushToken) return null;
    commit('setPushClientId', pushToken);
    return authApi.registerPushToken({ pushToken, platform: currentPlatform() });
  },

  /** 2.5 注销推送标识（退出登录时调用，幂等）。 */
  UnregisterPushToken({ state: s }, payload) {
    const pushToken = (payload && payload.pushToken) || s.pushClientId;
    if (!pushToken) return null;
    return authApi.unregisterPushToken({ pushToken });
  },
};

const getters = {
  // 微信 JS-SDK 在 iOS 上要用进入页面时的首个 URL 签名（微信的已知行为）
  getWxConfigUrl(s) {
    if (typeof navigator === 'undefined') return s.firstUrl;
    const ua = navigator.userAgent;
    return ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? s.firstUrl : document.URL;
  },
};

export default { namespaced: true, state, mutations, actions, getters };
