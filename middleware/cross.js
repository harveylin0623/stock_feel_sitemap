import { useAuthStore } from '@/stores/auth.js'
import { useMmrmResponseCode } from '@/composables/useMmrmResponseCode.js'
import { memberApi } from '@/api/member'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const { mmrmResponseCode } = useMmrmResponseCode()
  const authToken = authStore.getAuthCookie()
  const sfToken = authStore.getSfTokenCookie()
  const sessionIdToken = authStore.getSessionIdCookie()

  if (authToken !== undefined) {
    return
  }

  if (sfToken !== undefined && sessionIdToken !== undefined) {
    const response = await memberApi.oauthExternalLoginWithToken({
      data: {
        access_token: sfToken,
        session_id: sessionIdToken
      }
    })

    if (response.rcrm.RC === mmrmResponseCode.value.C01.code) {
      authStore.setAuthCookie(response.results.member_access_token)
    }
  }
})
