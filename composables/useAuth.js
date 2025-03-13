import { useCommonStore } from '@/stores/common.js'
import { useAuthStore } from '@/stores/auth.js'
import { useMmrmResponseCode } from '@/composables/useMmrmResponseCode.js'
import { useElMessage } from '@/composables/useElMessage.js'
import { memberApi } from '@/api/member.js'

export const useAuth = () => {
  const { t } = useI18n()
  const router = useRouter()
  const route = useRoute()
  const commonStore = useCommonStore()
  const authStore = useAuthStore()
  const { mmrmResponseCode } = useMmrmResponseCode()
  const { messageType, showElMessage } = useElMessage()

  const showMessageWhenGetOauthFail = () => {
    showElMessage({
      type: messageType.value.error,
      message: t('getOauthUrlFail')
    })
    commonStore.setLoading(false)
  }

  const goToLogin = async () => {
    commonStore.setLoading(true)
    try {
      const response = await memberApi.getOauthUrl()
      if (response.rcrm.RC === mmrmResponseCode.value.C01.code) {
        location.href = response.results.url
        return
      } else {
        showMessageWhenGetOauthFail()
      }
    } catch (err) {
      showMessageWhenGetOauthFail()
    }
  }

  const goToLogout = async () => {
    commonStore.setLoading(true)
    try {
      await memberApi.logout()
    } catch (err) {
      console.log(err)
    }
    authStore.logout()
    if (route.meta.isAuth) {
      await router.replace('/')
    }
    commonStore.setLoading(false)
  }

  return { goToLogin, goToLogout }
}
