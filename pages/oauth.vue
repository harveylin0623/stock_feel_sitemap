<template>
  <div>授權驗證中...</div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { usePageMeta } from '@/composables/usePageMeta.js'
import { useMmrmResponseCode } from '@/composables/useMmrmResponseCode.js'
import { memberApi } from '@/api/member.js'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { oauthMeta } = usePageMeta()
const { mmrmResponseCode } = useMmrmResponseCode()

const doOauth = async () => {
  const oauthCode = route.query.code
  if (oauthCode === undefined) {
    router.replace('/')
    return
  }
  const response = await memberApi.oauthExternalLogin({
    data: {
      code: oauthCode
    }
  })
  if (response.rcrm.RC === mmrmResponseCode.value.C01.code) {
    const { member_access_token, sf_token, session_id } = response.results
    authStore.setAuthCookie(member_access_token)
    authStore.setSfTokenCookie(sf_token)
    authStore.setSessionIdCookie(session_id)
  }
  router.replace('/')
}

onMounted(() => {
  doOauth()
})

definePageMeta({
  layout: false
})

defineOptions({
  name: 'Oauth'
})

useHead(oauthMeta)
</script>
