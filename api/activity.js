import { baseAxios } from './baseAxios.js'
export const activityApi = {
  category (payload = {}) {
    return baseAxios({
      url: '/activity/category',
      method: 'post',
      ...payload
    })
  },
  activityInfo (payload = {}) {
    return baseAxios({
      url: '/activity/coupon_activity_information',
      method: 'post',
      ...payload
    })
  },
  getActivityByCode (payload = {}) {
    return baseAxios({
      url: '/activity',
      method: 'post',
      ...payload
    })
  },
  hotActivity (payload = {}) {
    return baseAxios({
      url: '/activity/hot_activity',
      method: 'post',
      ...payload
    })
  },
  redeemCoupon (payload = {}) {
    return baseAxios({
      url: '/coupon/redeem_coupon_activity',
      method: 'post',
      ...payload
    })
  }
}
