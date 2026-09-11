import service from '@/utils/request'

export const getLotPaymentPackageList = (params) => {
  return service({
    url: '/lotPaymentPackage/getLotPaymentPackageList',
    method: 'get',
    params
  })
}
