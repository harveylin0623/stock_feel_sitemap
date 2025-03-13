import { defineStore } from 'pinia'
import { memberApi } from '@/api/member.js'
import { useMmrmResponseCode } from '@/composables/useMmrmResponseCode.js'
import { useTotalPoint } from '@/composables/useTotalPoint.js'
import defaultAvatar from '@/assets/image/default-avatar.png'

export const useAuthStore = defineStore('auth', () => {
  const { mmrmResponseCode } = useMmrmResponseCode()
  const { getTotalPoint } = useTotalPoint()
  const maxAge = 30 * 24 * 60 * 60

  const authCookie = useCookie('_stockfeel_ticket_token', {
    maxAge
  })

  const sfTokenCookie = useCookie('_stockfeel_mmrm_token', {
    maxAge,
    domain: process.env.STOCKFEEL_SUB_DOMAIN
  })

  const sessionIdCookie = useCookie('_stockfeel_session_id', {
    maxAge,
    domain: process.env.STOCKFEEL_SUB_DOMAIN
  })

  const timers = ref([])
  const closureStatus = ref([])
  const userInfo = ref({
    avatar: '',
    name: '',
    mobile: '',
    email: '',
    memberNumber: '',
    totalPoint: '0',
    totalTicket: 0
  })

  const isLogin = computed(() => authCookie.value !== undefined)

  const avatarUrl = computed(() => {
    return userInfo.value.avatar !== '' ? userInfo.value.avatar : defaultAvatar
  })

  const getAuthCookie = () => {
    return authCookie.value
  }

  const setAuthCookie = (value) => {
    authCookie.value = value
  }

  const getSfTokenCookie = () => {
    return sfTokenCookie.value
  }

  const setSfTokenCookie = (value) => {
    sfTokenCookie.value = value
  }

  const getSessionIdCookie = () => {
    return sessionIdCookie.value
  }

  const setSessionIdCookie = (value) => {
    sessionIdCookie.value = value
  }

  const setUserInfo = (payload, keyName = '') => {
    if (keyName === '') {
      userInfo.value = payload
    } else {
      userInfo.value[keyName] = payload
    }
  }

  const resetUserInfo = () => {
    userInfo.value = {
      avatar: '',
      name: '',
      mobile: '',
      email: '',
      totalPoint: '0',
      totalTicket: 0
    }
  }

  const logout = () => {
    setAuthCookie(undefined)
    setSfTokenCookie(undefined)
    setSessionIdCookie(undefined)
    resetUserInfo()
  }

  const pollingMemberSummary = () => {
    let count = 8
    let timer = null
    const currentStatus = { value: true }
    const callMe = async () => {
      const summaryRes = await memberApi.summary()
      if (summaryRes.rcrm.RC !== mmrmResponseCode.value.C01.code) { return }
      const { point_summary, coupon_summary } = summaryRes.results
      const totalPoint = getTotalPoint(point_summary)
      const totalTicket = coupon_summary.valid_coupon_amount
      const totalPointIsDifferent = userInfo.value.totalPoint !== totalPoint
      const totalTicketIsDifferent = userInfo.value.totalTicket !== totalTicket
      if (totalPointIsDifferent && totalTicketIsDifferent && currentStatus.value) {
        setUserInfo(totalPoint, 'totalPoint')
        setUserInfo(totalTicket, 'totalTicket')
        currentStatus.value = false
      } else if (count > 0 && currentStatus.value) {
        count = count - 1
        timer = setTimeout(() => {
          callMe()
        }, 1500)
        timers.value.push(timer)
      }
    }
    closureStatus.value.push(currentStatus)
    return callMe
  }

  const updatePointAndCouponAmount = () => {
    timers.value.forEach((timer) => {
      clearTimeout(timer)
    })
    closureStatus.value.forEach((closure) => {
      closure.value = false
    })
    timers.value = []
    closureStatus.value = []
    pollingMemberSummary()()
  }

  return { timers, closureStatus, userInfo, isLogin, avatarUrl, getAuthCookie, setAuthCookie, setUserInfo, getSfTokenCookie, setSfTokenCookie, getSessionIdCookie, setSessionIdCookie, logout, updatePointAndCouponAmount }
})
