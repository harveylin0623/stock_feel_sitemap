import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', () => {
  const isLoading = ref(false)
  const showCoverMask = ref(false)
  const showCouponUsage = ref(false)
  const showRedeemPanel = ref(false)
  const showSocialPanel = ref(false)
  const showReLoginModal = ref(false)
  const isFixedCartShow = ref(false)

  const setLoading = (value) => {
    isLoading.value = value
  }

  const toggleCouponUsage = (value) => {
    showCoverMask.value = value
    showCouponUsage.value = value
  }

  const toggleRedeemPanel = (value) => {
    showCoverMask.value = value
    showRedeemPanel.value = value
  }

  const toggleSocialPanel = (value) => {
    showCoverMask.value = value
    showSocialPanel.value = value
  }

  const toggleReLoginModal = (value) => {
    showReLoginModal.value = value
  }

  const toggleFixedCart = (value) => {
    isFixedCartShow.value = value
  }

  return { isLoading, showCoverMask, showCouponUsage, showRedeemPanel, showSocialPanel, showReLoginModal, isFixedCartShow, setLoading, toggleCouponUsage, toggleRedeemPanel, toggleSocialPanel, toggleReLoginModal, toggleFixedCart }
})
