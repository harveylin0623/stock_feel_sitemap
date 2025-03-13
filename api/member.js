import { baseAxios } from './baseAxios.js'
export const memberApi = {
  summary (payload = {}) {
    return baseAxios({
      url: '/member/member_summary',
      method: 'post',
      ...payload
    })
  },
  profile (payload = {}) {
    return baseAxios({
      url: '/member/get_member_profile',
      method: 'post',
      ...payload
    })
  },
  oauthExternalLogin (payload = {}) {
    return baseAxios({
      url: '/member/oauth_external_login',
      method: 'post',
      ...payload
    })
  },
  oauthExternalLoginWithToken (payload = {}) {
    return baseAxios({
      url: '/member/oauth_external_login_with_token',
      method: 'post',
      ...payload
    })
  },
  logout (payload = {}) {
    return baseAxios({
      url: '/member/logout',
      method: 'post',
      ...payload
    })
  },
  getOauthUrl (payload = {}) {
    return baseAxios({
      url: '/member/login/oauth',
      method: 'post',
      ...payload
    })
  }
}
