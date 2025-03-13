import { baseAxios } from './baseAxios.js'
export const couponApi = {
  info (payload = {}) {
    return baseAxios({
      url: '/coupon/coupon_information',
      method: 'post',
      ...payload
    })
  },
  redeemRecord (payload = {}) {
    return baseAxios({
      url: '/coupon/redeem_record',
      method: 'post',
      ...payload
    })
  },
  redeemRecordList (payload = {}) {
    return baseAxios({
      url: '/coupon/redeem_record_list',
      method: 'post',
      ...payload
    })
  },
  myCouponList (payload = {}) {
    return baseAxios({
      url: '/coupon/my_coupon_list',
      method: 'post',
      ...payload
    })
  },
  myCouponDetail (payload = {}) {
    return baseAxios({
      url: '/coupon/my_coupon_detail',
      method: 'post',
      ...payload
    })
  },
  serverSideCouponRedeem (payload = {}) {
    return baseAxios({
      url: '/external/coupon/redeem',
      method: 'post',
      ...payload
    })
  }
}
