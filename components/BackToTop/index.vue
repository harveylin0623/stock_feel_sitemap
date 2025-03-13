<template>
  <div
    class="fixed right-2 z-[9] flex size-10 cursor-pointer rounded-full bg-footer sm:size-12"
    :class="[baseGutter]"
    @click="backToTop"
  >
    <img
      src="@/assets/image/back_to_top.png"
      class="m-auto size-6 sm:size-8"
      alt=""
    />
  </div>
</template>

<script setup>
import { useCommonStore } from '@/stores/common.js'
import { useAuthStore } from '@/stores/auth.js'
import { useScreensWidth } from '@/composables/useScreensWidth.js'
import { useHasNavigationPage } from '@/composables/useHasNavigationPage.js'

const route = useRoute()
const commonStore = useCommonStore()
const authStore = useAuthStore()
const { screensWidth } = useScreensWidth()
const { navigationPageList } = useHasNavigationPage()
const bottom5 = 'bottom-5'
const hasNavBottom = 'bottom-[calc(var(--nav-height)+4px)]'
const hasFxiedCart = 'bottom-[calc(var(--fixedCart-height)+4px)]'
const baseGutter = ref('')

const backToTop = () => {
  window.scrollTo(0, 0)
}

const setBottomToScreen = () => {
  if (window.innerWidth >= screensWidth.value.sm) {
    baseGutter.value = bottom5
    return
  }

  if (route.meta.name === 'activityDetail') {
    if (commonStore.isFixedCartShow) {
      baseGutter.value = hasFxiedCart
    } else {
      baseGutter.value = bottom5
    }
    return
  }

  if (authStore.isLogin) {
    const isIncludePage = navigationPageList.value.includes(route.meta.name)
    if (isIncludePage) {
      baseGutter.value = hasNavBottom
    } else {
      baseGutter.value = bottom5
    }
  } else {
    baseGutter.value = bottom5
  }
}

onMounted(() => {
  setBottomToScreen()
})

watch(() => route.meta.name, () => { // 頁面切換時更新
  setBottomToScreen()
})

watch(() => commonStore.isFixedCartShow, () => { // 活動詳情頁的兌換按鈕顯示隱藏更新
  setBottomToScreen()
})

defineOptions({
  name: 'BackToTop'
})
</script>
