<!-- 该组件没有模板（原包中 render 即为 undefined），刻意不生成 <template> -->

<script>
/*
 * 组件: d169
 * 反编译自 webpack 模块 ae8d（svc 编译空间）
 * 已剥离 webpack 的 global 注入包装（保留了 1 个注入参数的绑定）
 * 变量 r 在内层被重新声明，保留短名以维持遮蔽语义
 * 变量 o 在内层被重新声明，保留短名以维持遮蔽语义
 * 内层仍在调用 a()，已就地重建 interopRequireDefault
 */
import r from '@/.unpacked/svc/7ca3.js'
import * as o from 'vuex'
import mod918f from '@/.unpacked/svc/918f.js'
import 'moment'

function a(m) { return m && m.__esModule ? m : { default: m }; }

"use strict";
var e = require("@/.unpacked/svc/f3b9.js")["default"];
var i = (a(require("vue")), a(require("./common/config.js")));
var c = {
  globalData: {
    $i18n: {},
    $t: {},
    $sleep: null,
    $isNull: null,
    $msg: null,
    $remote: null
  },
  data: function () {
    return {
      isLaunched: false
    };
  },
  computed: {
    ...o.mapGetters(["isAuthenticated", "sysInfo", "autoCheckUpdate", "isAuditMode", "userType", "setLocaleState"]),
    ...o.mapState("timingRefresh", ["msgTimer", "remoteListTimer"])
  },
  onLaunch: function () {
    var t = this;
    (e("log", "App Launch", this.sysInfo, " at App.vue:34"), this.setFuncDeviceId(""), this.isLaunched = true, this.globalData.$i18n = this.$i18n, this.globalData.$t = function (e) {
      return t.$t(e);
    }, this.globalData.$sleep = function (e) {
      return new Promise(function (t) {
        setTimeout(t, e);
      });
    }, this.globalData.$isNull = function (e) {
      return !(!e && 0 != e);
    }, this.globalData.$msg = function (n) {
      (clearTimeout(t.msgTimer), t.setMsgTimer(setTimeout(function () {
        (e("log", "setTimeoutmsg", " at App.vue:57"), t.setMsgRefresh(true));
      }, n)));
    }, this.globalData.$remote = function (n) {
      (clearTimeout(t.remoteListTimer), t.setRemoteListTimer(setTimeout(function () {
        (e("log", "setTimeoutremote", " at App.vue:67"), t.setRemoteListRefresh(true));
      }, n)));
    }, this.GetApplicationConfiguration("onLaunch"));
    var n = uni.getLaunchOptionsSync();
    if ((uni.setStorageSync("currentPage", n), !this.isAuthenticated)) {
      var a = i.default.ingoreAuthFiles.filter(function (e) {
        return -1 != n.path.indexOf(e);
      });
      !a.length && this.setLocaleState && uni.reLaunch({
        url: "/pages/home/home"
      });
    }
    (this.GetAdvertising(), "ios" != this.sysInfo.platform && this.requestPermissionListener());
    var r, o = uni.getStorageSync("environmentStorage");
    (r = o && o.value || i.default.serviceRoot, this.autoCheckUpdate && ("http://h5.akbee.com/v1" === r || "http://h5.akbee.com/v1" === r) && ("ios" == this.sysInfo.platform ? this.CheckAppAuditModeIos().then(function (e) {
      t.isAuditMode || mod918f();
    }).catch(function (e) {
      t.isAuditMode || mod918f();
    }) : (this.CheckAppAuditModeAndroid(), "honor" != this.sysInfo.brand && mod918f())), uni.onNetworkStatusChange(function (e) {
      e.isConnected && t.GetApplicationConfiguration("onLaunch");
    }), e("log", "App onLaunch", " at App.vue:149"));
  },
  onShow: function () {
    (this.isLaunched || ("ios" == this.sysInfo.platform ? this.CheckAppAuditModeIos() : this.CheckAppAuditModeAndroid(), this.GetApplicationConfiguration()), clearTimeout(this.msgTimer), this.setMsgRefresh(true), clearTimeout(this.remoteListTimer), this.setRemoteListRefresh(true), e("log", "App onShow", " at App.vue:172"));
  },
  onHide: function () {
    (this.isLaunched = false, e("log", "App onHide", " at App.vue:181"));
  },
  onExit: function () {
    e("log", "App onExit", " at App.vue:184");
  },
  onError: function (t) {
    e("log", "App onError", t, " at App.vue:187");
  },
  methods: {
    ...o.mapMutations("app", ["setFirstUrl"]),
    ...o.mapMutations("wechat", ["setWechatUserInfo"]),
    ...o.mapMutations("device", ["setFuncDeviceId"]),
    ...o.mapMutations("sys", ["setRequestPermission"]),
    ...o.mapActions("app", ["GetApplicationConfiguration", "GetAdvertising"]),
    ...o.mapActions("sys", ["CheckAppAuditModeIos", "CheckAppAuditModeAndroid"]),
    ...o.mapMutations("timingRefresh", ["setMsgRefresh", "setMsgTimer", "setRemoteListRefresh", "setRemoteListTimer"]),
    requestPermissionListener: function () {
      if (typeof uni.createRequestPermissionListener !== "function") return;   // [还原补丁] 原为 #ifdef APP-PLUS
      if (typeof uni.createRequestPermissionListener !== "function") return;   // [还原补丁] 原为 #ifdef APP-PLUS
      var t = this, n = uni.createRequestPermissionListener();
      (n.onConfirm(function (n) {
        (e("log", "\u5443\u5443\u5443e", n, " at App.vue:208"), t.setRequestPermission({
          permission: n[0],
          permissionAlertShow: true
        }));
      }), n.onComplete(function (e) {
        t.setRequestPermission({
          permissionAlertShow: false
        });
      }));
    }
  }
};
export default c;

</script>

<style>
body{background:transparent;background-color:#7f7f7f}.flex-center{
display:flex;
justify-content:center;align-items:center;height:100vh}.mask{position:fixed;left:0;top:0;right:0;bottom:0}.botton-radius{border-radius:48rpx}.content{position:relative;top:0;width:600rpx;background-color:#fff;box-sizing:border-box;padding:0 50rpx;font-family:Source Han Sans CN}.text{
display:block;
line-height:200px;text-align:center;color:#fff}.content-bg{position:absolute;top:0rpx;left:0;width:600rpx;height:130rpx;background-image:linear-gradient(180deg,#fdf2d0,#fffffe);border-radius:48rpx}.content-top{position:absolute;top:-160rpx;left:0;width:600rpx;height:270rpx}.content-top-text{font-size:45rpx;font-weight:700;color:#f8f8fa;position:absolute;top:120rpx;left:50rpx;z-index:1}.content-header{height:120rpx}.title{font-size:40rpx;font-weight:700;line-height:38px;text-align:center;color:#333}.footer{height:250rpx;display:flex;align-items:center;justify-content:space-around}.box-des-scroll{box-sizing:border-box;padding:0 40rpx;height:200rpx;text-align:left}.box-des{font-size:26rpx;color:#000;line-height:50rpx}.progress-box{width:100%}.progress{width:90%;height:40rpx;border-radius:35px}.close-img{width:70rpx;height:70rpx;z-index:1000;position:absolute;bottom:-120rpx;left:calc(50% - 70rpx / 2)}.content-button{text-align:center;flex:1;font-size:30rpx;font-weight:400;color:#fff;border-radius:40rpx;margin:0 18rpx;height:80rpx;line-height:80rpx}.flex-column{display:flex;flex-direction:column;align-items:center}
body{background-color:#f6f6f6}
@charset "UTF-8";body{background-color:#f6f6f6}
@charset "UTF-8";.u-line-1{


display:-webkit-box!important;overflow:hidden;text-overflow:ellipsis;word-break:break-all;-webkit-line-clamp:1;-webkit-box-orient:vertical!important
}.u-line-2{


display:-webkit-box!important;overflow:hidden;text-overflow:ellipsis;word-break:break-all;-webkit-line-clamp:2;-webkit-box-orient:vertical!important
}.u-line-3{


display:-webkit-box!important;overflow:hidden;text-overflow:ellipsis;word-break:break-all;-webkit-line-clamp:3;-webkit-box-orient:vertical!important
}.u-line-4{


display:-webkit-box!important;overflow:hidden;text-overflow:ellipsis;word-break:break-all;-webkit-line-clamp:4;-webkit-box-orient:vertical!important
}.u-line-5{


display:-webkit-box!important;overflow:hidden;text-overflow:ellipsis;word-break:break-all;-webkit-line-clamp:5;-webkit-box-orient:vertical!important
}.u-border{border-width:.5px!important;border-color:#dadbde!important;border-style:solid}.u-border-top{border-top-width:.5px!important;border-color:#dadbde!important;border-top-style:solid}.u-border-left{border-left-width:.5px!important;border-color:#dadbde!important;border-left-style:solid}.u-border-right{border-right-width:.5px!important;border-color:#dadbde!important;border-right-style:solid}.u-border-bottom{border-bottom-width:.5px!important;border-color:#dadbde!important;border-bottom-style:solid}.u-border-top-bottom{border-top-width:.5px!important;border-bottom-width:.5px!important;border-color:#dadbde!important;border-top-style:solid;border-bottom-style:solid}.u-reset-button{padding:0;background-color:initial;
}
.u-reset-button::after{border:none}
.u-hover-class{opacity:.7}.u-primary-light{color:#ecf5ff}.u-warning-light{color:#fdf6ec}.u-success-light{color:#f5fff0}.u-error-light{color:#fef0f0}.u-info-light{color:#f4f4f5}.u-primary-light-bg{background-color:#ecf5ff}.u-warning-light-bg{background-color:#fdf6ec}.u-success-light-bg{background-color:#f5fff0}.u-error-light-bg{background-color:#fef0f0}.u-info-light-bg{background-color:#f4f4f5}.u-primary-dark{color:#398ade}.u-warning-dark{color:#f1a532}.u-success-dark{color:#53c21d}.u-error-dark{color:#e45656}.u-info-dark{color:#767a82}.u-primary-dark-bg{background-color:#398ade}.u-warning-dark-bg{background-color:#f1a532}.u-success-dark-bg{background-color:#53c21d}.u-error-dark-bg{background-color:#e45656}.u-info-dark-bg{background-color:#767a82}.u-primary-disabled{color:#9acafc}.u-warning-disabled{color:#f9d39b}.u-success-disabled{color:#a9e08f}.u-error-disabled{color:#f7b2b2}.u-info-disabled{color:#c4c6c9}.u-primary{color:#6081c7}.u-warning{color:#f9ae3d}.u-success{color:#5ac725}.u-error{color:#f56c6c}.u-info{color:#909399}.u-primary-bg{background-color:#6081c7}.u-warning-bg{background-color:#f9ae3d}.u-success-bg{background-color:#5ac725}.u-error-bg{background-color:#f56c6c}.u-info-bg{background-color:#909399}.u-main-color{color:#303133}.u-content-color{color:#606266}.u-tips-color{color:#909193}.u-light-color{color:#c0c4cc}.u-safe-area-inset-top{padding-top:0;padding-top:constant(safe-area-inset-top);padding-top:env(safe-area-inset-top)}.u-safe-area-inset-right{padding-right:0;padding-right:constant(safe-area-inset-right);padding-right:env(safe-area-inset-right)}.u-safe-area-inset-bottom{padding-bottom:0;padding-bottom:constant(safe-area-inset-bottom);padding-bottom:env(safe-area-inset-bottom)}.u-safe-area-inset-left{padding-left:0;padding-left:constant(safe-area-inset-left);padding-left:env(safe-area-inset-left)}
::-webkit-scrollbar{display:none;width:0!important;height:0!important;-webkit-appearance:none;background:transparent}uni-view, uni-image, uni-text{box-sizing:border-box;flex-shrink:0}.h100{height:100vh}.w100{width:100vw}.p{padding:16rpx}.p-v{padding-top:16rpx;padding-bottom:16rpx}.p-h{padding-left:16rpx;padding-right:16rpx}.p-l{padding-left:16rpx}.p-r{padding-right:16rpx}.p-t{padding-top:16rpx}.p-b{padding-bottom:16rpx}.p-mini{padding:8px}.p-sm{padding:12rpx}.p-md{padding:20rpx}.p-lg{padding:24rpx}.p-xl{padding:32rpx}.p-v-mini{padding-top:8rpx;padding-bottom:8rpx}.p-v-sm{padding-top:12rpx;padding-bottom:12rpx}.p-v-md{padding-top:20rpx;padding-bottom:20rpx}.p-v-lg{padding-top:24rpx;padding-bottom:24rpx}.p-v-xl{padding-top:32rpx;padding-bottom:32rpx}.p-h-mini{padding-left:8rpx;padding-right:8rpx}.p-h-sm{padding-left:12rpx;padding-right:12rpx}.p-h-md{padding-left:20rpx;padding-right:20rpx}.p-h-lg{padding-left:24rpx;padding-right:24rpx}.p-h-xl{padding-left:32rpx;padding-right:32rpx}.p-h-xll{padding-left:48rpx;padding-right:48rpx}.p-l-mini{padding-left:8rpx}.p-l-sm{padding-left:12rpx}.p-l-md{padding-left:20rpx}.p-l-lg{padding-left:24rpx}.p-l-xl{padding-left:32rpx}.p-r-mini{padding-right:8rpx}.p-r-sm{padding-right:12rpx}.p-r-md{padding-right:20rpx}.p-r-lg{padding-right:24rpx}.p-r-xl{padding-right:32rpx}.p-t-mini{padding-top:8rpx}.p-t-sm{padding-top:12rpx}.p-t-md{padding-top:20rpx}.p-t-lg{padding-top:24rpx}.p-t-xl{padding-top:32rpx}.p-b-mini{padding-bottom:8rpx}.p-b-sm{padding-bottom:12rpx}.p-b-md{padding-bottom:20rpx}.p-b-lg{padding-bottom:24rpx}.p-b-xl{padding-bottom:32rpx}.m{margin:16rpx}.m-v{margin-top:16rpx;margin-bottom:16rpx}.m-h{margin-left:16rpx;margin-right:16rpx}.m-l{margin-left:16rpx}.m-r{margin-right:16rpx}.m-t{margin-top:16rpx}.m-b{margin-bottom:16rpx}.m-mini{margin:8px}.m-sm{margin:12rpx}.m-md{margin:20rpx}.m-lg{margin:24rpx}.m-xl{margin:32rpx}.m-v-mini{margin-top:8rpx;margin-bottom:8rpx}.m-v-sm{margin-top:12rpx;margin-bottom:12rpx}.m-v-md{margin-top:20rpx;margin-bottom:20rpx}.m-v-lg{margin-top:24rpx;margin-bottom:24rpx}.m-v-xl{margin-top:32rpx;margin-bottom:32rpx}.m-h-mini{margin-left:8rpx;margin-right:8rpx}.m-h-sm{margin-left:12rpx;margin-right:12rpx}.m-h-md{margin-left:20rpx;margin-right:20rpx}.m-h-lg{margin-left:24rpx;margin-right:24rpx}.m-h-xg{margin-left:28rpx;margin-right:28rpx}.m-h-xl{margin-left:32rpx;margin-right:32rpx}.m-l-mini{margin-left:8rpx}.m-l-sm{margin-left:12rpx}.m-l-md{margin-left:20rpx}.m-l-lg{margin-left:24rpx}.m-l-xl{margin-left:32rpx}.m-r-mini{margin-right:8rpx}.m-r-sm{margin-right:12rpx}.m-r-md{margin-right:20rpx}.m-r-lg{margin-right:24rpx}.m-r-xl{margin-right:32rpx}.m-t-mini{margin-top:8rpx}.m-t-minix{margin-top:6rpx}.m-t-sm{margin-top:12rpx}.m-t-md{margin-top:20rpx}.m-t-lg{margin-top:24rpx}.m-t-xl{margin-top:32rpx}.m-b-mini{margin-bottom:8rpx}.m-b-sm{margin-bottom:12rpx}.m-b-md{margin-bottom:20rpx}.m-b-lg{margin-bottom:24rpx}.m-b-xl{margin-bottom:32rpx}.ta-c{text-align:center}.ta-l{text-align:left}.ta-r{text-align:right}.text-m{font-size:26rpx}.text{font-size:28rpx}.text-lg{font-size:48rpx}.text-lx{font-size:36rpx}.text-md{font-size:32rpx}.text-sm{font-size:24rpx}.text-ssm{font-size:21rpx}.text-mini{font-size:20rpx}.text-link{color:#6081c7}.text-bold{font-weight:700}.text-bold-sm{font-weight:500}.text-primary{color:#6081c7}.text-white{color:#fff}.text-icon{color:#b3b3b3}.text-grey{color:#999}.text-gray{color:#666}.text-darker{color:#333}.b-list-primary{border:2rpx solid #6081c7}.b-primary{border:1rpx solid #6081c7}.b-white{border:1rpx solid #fff}.b-grey{border:1rpx solid #999}.b-gray{border:1rpx solid #666}.b-darker{border:1rpx solid #333}.b-bottom{border-bottom:1px solid #e6e6e6}.b-top{border-top:1rpx solid #e6e6e6}.b-right{border-right:1rpx solid #ececec}.br{border-radius:12rpx}.br-mini{border-radius:4rpx}.br-sm{border-radius:8rpx}.br-md{border-radius:16rpx}.br-lg{border-radius:20rpx}.br-xl{border-radius:24rpx}.br-xxl{border-radius:36rpx}.text-primary{color:#6081c7}.text-success{color:#00ff18}.text-info{color:#00e2ff}.text-warning{color:#ffd200}.text-danger{color:#ff0009}.text-red{color:#f75964}.text-title{color:#333}.text-desc{color:#999}.bg-primary{background-color:#6081c7}.bg-white{background-color:#fff}.bg-grey{background-color:#999}.bg-gray{background-color:#666}.bg-page{background-color:#f6f6f6}.bg-trans{background-color:initial}.mask{position:fixed;top:0;right:0;bottom:0;left:0;background-color:#000;opacity:.5;z-index:999}.flex-row{display:flex;flex-direction:row!important}.flex-col{display:flex;flex-direction:column!important}.flex-wrap{flex-wrap:wrap!important}.justify-start{display:flex;justify-content:flex-start!important}.justify-center{display:flex;justify-content:center!important}.justify-end{display:flex;justify-content:flex-end!important}.justify-evenly{display:flex;justify-content:space-around!important}.justify-around{display:flex;justify-content:space-around!important}.justify-between{display:flex;justify-content:space-between!important}.items-start{display:flex;align-items:flex-start!important}.items-center{display:flex;align-items:center!important}.items-end{display:flex;align-items:flex-end!important}.flex-1{display:flex;flex:1!important}.flex-0{display:flex;flex:0}.u-cell-icon{width:36rpx;height:36rpx;margin-right:8rpx}.u-page{padding:15px 15px 40px 15px}.bottom-bar{background-color:#fff;padding:32rpx 32rpx 64rpx}.bottom-bar-popup{background-color:#fff;padding:44rpx 32rpx 32rpx}.list-item{background-color:#fff;padding:24rpx;border-radius:16rpx;margin-top:16rpx;flex-direction:row!important;align-items:flex-start!important}.list-item-icon{width:48rpx;height:48rpx}.list-item-content{margin-left:16rpx;align-items:stretch!important;flex:1!important}.list-item-header{flex-direction:row!important;justify-content:space-between!important;align-items:center!important}.list-item-title{font-size:32rpx;font-weight:700;line-height:48rpx;color:#333}.list-item-desc{margin-top:12rpx}
body{background-color:#f6f6f6}

/* 全局原生与 UI 库 Toast / Loading / Modal 置顶样式：
   将 UniApp H5 原生 uni-toast, uni-loading, uni-mask 和 uView u-toast, u-loading-page 的 z-index 设为 999999，
   确保网络请求提示、报错信息及 Toast 永远显示在任意 PopUp 弹窗与 Modal 之上。 */
uni-toast,
.uni-toast,
uni-loading,
.uni-loading,
uni-modal,
.uni-modal,
.u-toast,
.u-loading-page {
  z-index: 999999 !important;
}

/* 修复 uni-actionsheet 弹出菜单被 uni-mask 遮罩层盖住及灰块背景的 Bug */
uni-actionsheet,
.uni-actionsheet {
  z-index: 1000000 !important;
  background-color: transparent !important;
}

.uni-actionsheet .uni-mask,
uni-actionsheet uni-mask {
  z-index: 999998 !important;
}

.uni-actionsheet__menu,
.uni-actionsheet__action {
  z-index: 1000000 !important;
  position: relative !important;
  border-radius: 24rpx 24rpx 0 0 !important;
  overflow: hidden !important;
  background-color: #ffffff !important;
}

/* 修复 H5 模式下 u-icon 图片与浮动卡片高度被 flex 容器异常拔高的 Bug */
uni-image.u-icon__img,
.u-icon__img {
  max-width: 100% !important;
  max-height: 100% !important;
}

/* 确保 UniApp H5 地图组件 uni-map 全屏铺满 */
uni-map,
.uni-map {
  width: 100% !important;
  height: 100% !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: 0 !important;
}

/* 强制重置 terminalInfo 与 locusPanel 及其子元素在 H5 下的高宽与 Flex 行为 */
terminal-info,
uni-terminal-info,
.info,
.infoMain,
.infobox {
  height: auto !important;
  max-height: 80vh !important;
  flex: 0 0 auto !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
}

locus-panel,
uni-locus-panel,
.map-panel {
  height: auto !important;
  max-height: 50vh !important;
  flex: 0 0 auto !important;
  display: block !important;
}
</style>
