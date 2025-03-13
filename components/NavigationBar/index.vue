<template>
  <div class="fixed bottom-0 left-0 z-[8] flex h-[60px] w-full items-center justify-center space-x-2 border-t border-t-gray-7 bg-white sm:hidden">
    <BarItem
      v-for="(bar,index) in navList"
      :key="index"
      :bar="bar"
    />
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { useScreensWidth } from '@/composables/useScreensWidth.js'
import homeIcon from '@/assets/image/home.png'
import ticketIcon from '@/assets/image/ticket.png'
import taskIcon from '@/assets/image/task.png'
import userIcon from '@/assets/image/user.png'
import BarItem from '@/components/NavigationBar/BarItem.vue'

const { t } = useI18n()
const authStore = useAuthStore()
const { screensWidth } = useScreensWidth()
const navList = ref([
  {
    title: t('seo.pageTitle.home'),
    image: homeIcon,
    pageUrl: process.env.MMRM_EC_STOCKFEEL,
    external: true,
    routeName: ['home']
  },
  {
    title: t('seo.pageTitle.ticketCenter'),
    image: ticketIcon,
    pageUrl: '/',
    external: false,
    routeName: []
  },
  {
    title: t('missionCenter'),
    image: taskIcon,
    pageUrl: process.env.MISSION_CENTER,
    external: true,
    routeName: []
  },
  {
    title: t('seo.pageTitle.memberCenter'),
    image: userIcon,
    pageUrl: '/memberCenter/myCoupon',
    external: false,
    routeName: ['myCoupon', 'redeemHistory', 'redeemHistoryDetail']
  }
])

const setBodyPaddingBottom = (value = '') => {
  document.body.style.paddingBottom = value
}

const setPaddingForNav = () => {
  if (window.innerWidth >= screensWidth.value.sm) {
    setBodyPaddingBottom()
  } else {
    const html = document.documentElement
    const height = window.getComputedStyle(html).getPropertyValue('--nav-height')
    setBodyPaddingBottom(height)
  }
}

const resizeHandler = () => {
  if (authStore.isLogin) {
    setPaddingForNav()
  } else {
    setBodyPaddingBottom()
  }
}

onMounted(() => {
  window.addEventListener('resize', resizeHandler)
  window.dispatchEvent(new Event('resize'))
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
  setBodyPaddingBottom()
})

defineOptions({
  name: 'NavigationBar'
})
</script>
