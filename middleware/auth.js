import { useCommonStore } from '@/stores/common.js'
import { useAuthStore } from '@/stores/auth.js'
export default defineNuxtRouteMiddleware((to, from) => {
  const commonStore = useCommonStore()
  const authStore = useAuthStore()
  if (!authStore.isLogin) {
    commonStore.toggleReLoginModal(true)
    return navigateTo('/')
  }
})
