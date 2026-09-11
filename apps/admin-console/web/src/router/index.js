import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/init',
    name: 'Init',
    component: () => import('@/view/init/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/view/login/index.vue')
  },
  {
    path: '/scanUpload',
    name: 'ScanUpload',
    meta: {
      title: '扫码上传',
      client: true
    },
    component: () => import('@/view/example/upload/scanUpload.vue')
  },
  {
    path: '/lot/message',
    name: 'LotMessage',
    meta: {
      title: '消息管理'
    },
    component: () => import('@/view/lot/lotMessage/lotMessage.vue')
  },
  {
    path: '/lot/appVersion',
    name: 'LotAppVersion',
    meta: {
      title: 'App版本管理'
    },
    component: () => import('@/view/lot/lotAppVersion/lotAppVersion.vue')
  },
  {
    path: '/lot/deviceCmdLog',
    name: 'LotDeviceCmdLog',
    meta: {
      title: '设备指令日志'
    },
    component: () => import('@/view/lot/lotDeviceCmdLog/lotDeviceCmdLog.vue')
  },
  {
    path: '/lot/audio',
    name: 'LotAudio',
    meta: {
      title: '安防管理'
    },
    component: () => import('@/view/lot/lotAudio/lotAudio.vue')
  },
  {
    path: '/lot/customerService',
    name: 'LotCustomerService',
    meta: {
      title: '客服管理'
    },
    component: () => import('@/view/lot/lotCustomerService/lotCustomerService.vue')
  },
  {
    path: '/lot/appMenu',
    name: 'LotAppMenu',
    meta: {
      title: 'App菜单管理'
    },
    component: () => import('@/view/lot/lotAppMenu/lotAppMenu.vue')
  },
  {
    path: '/lot/paymentPlatform',
    name: 'LotPaymentPlatform',
    meta: {
      title: '支付平台配置'
    },
    component: () => import('@/view/lot/lotPaymentPlatform/lotPaymentPlatform.vue')
  },
  {
    path: '/lot/order',
    name: 'LotOrder',
    meta: {
      title: '支付订单'
    },
    component: () => import('@/view/lot/lotOrder/lotOrder.vue')
  },
  {
    path: '/dispatchOrder',
    name: 'DispatchOrder',
    meta: {
      title: '打单发货'
    },
    component: () => import('@/view/lot/dispatchOrder/index.vue')
  },
  {
    path: '/salesOrder',
    name: 'SalesOrder',
    meta: {
      title: '销售订单管理'
    },
    component: () => import('@/view/lot/salesOrder/index.vue')
  },
  {
    path: '/afterSalesDevice',
    name: 'AfterSalesDevice',
    meta: {
      title: '设备售后列表'
    },
    component: () => import('@/view/lot/afterSales/deviceList.vue')
  },
  {
    path: '/:catchAll(.*)',
    meta: {
      closeTab: true
    },
    component: () => import('@/view/error/index.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
