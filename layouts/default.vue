<template>
  <div
    id="default-layout"
    class="pt-[93px] sm:pt-[145px]"
  >
    <MyHeader />
    <section class="min-h-[500px]">
      <slot></slot>
    </section>
    <MyFooter />
    <CoverMask />
    <ReLoginModal />
    <Loading />
    <NavigationBar v-if="showNavigationBar" />
    <BackToTop />
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { useHeaderStore } from '@/stores/header.js'
import { useMmrmResponseCode } from '@/composables/useMmrmResponseCode.js'
import { useHasNavigationPage } from '@/composables/useHasNavigationPage.js'
import { useTotalPoint } from '@/composables/useTotalPoint.js'
import { cmsApi } from '@/api/cms.js'
import { memberApi } from '@/api/member.js'
import ReLoginModal from '@/components/Modal/ReLoginModal.vue'
import NavigationBar from '@/components/NavigationBar/index.vue'
import BackToTop from '@/components/BackToTop/index.vue'

const route = useRoute()
const authStore = useAuthStore()
const headerStore = useHeaderStore()
const { mmrmResponseCode } = useMmrmResponseCode()
const { navigationPageList } = useHasNavigationPage()
const { getTotalPoint } = useTotalPoint()

const createHeaderMenuList = (lists) => {
  return lists.reduce((prev, current) => {
    prev.push({ ...current, isOpen: false })
    return prev
  }, [])
}

const getMemberData = (summaryRes, profileRes) => {
  const { code: successCode } = mmrmResponseCode.value.C01
  const summaryIsOk = summaryRes.value.rcrm.RC === successCode
  const profileIsOk = profileRes.value.rcrm.RC === successCode
  if (summaryIsOk && profileIsOk) {
    const { point_summary, coupon_summary } = summaryRes.value.results
    const totalPoint = getTotalPoint(point_summary)
    const totalTicket = coupon_summary.valid_coupon_amount
    const { photo, name, mobile, email, member_no: memberNumber } = profileRes.value.results.member_profile
    const avatar = photo !== undefined ? photo.url : ''
    authStore.setUserInfo({ avatar, name, mobile, email, memberNumber, totalPoint, totalTicket })
  } else {
    authStore.logout()
  }
}

await useAsyncData('layoutData', async () => {
  const [menuRes, summaryRes, profileRes] = await Promise.allSettled([
    cmsApi.headerMenu(),
    memberApi.summary(),
    memberApi.profile()
  ])
  const menuList = createHeaderMenuList(menuRes.value.results)
  headerStore.setMenuList(menuList)
  getMemberData(summaryRes, profileRes)
  return {}
})

const showNavigationBar = computed(() => {
  const isInclude = navigationPageList.value.includes(route.meta.name)
  return isInclude && authStore.isLogin
})

</script>
