<template>
  <div
    class="fixed bottom-0 left-0 z-[4] flex w-full items-center border-t border-t-gray-7 bg-white p-4 transition-transform duration-200"
    :class="moveStatus"
  >
    <BaseButton
      :text="redeemButtonText"
      class="btn-primary-1 mr-4 shrink grow"
      :class="redeemButtonClass"
      :left-icon-url="buttonIcon.shopCart"
      @click="redeemHandler"
    />
    <BaseButton
      :text="$t('share')"
      class="btn-outline-gray-2 w-[110px]"
      :left-icon-url="buttonIcon.share"
      :hover-left-icon-url="buttonIcon.shareHover"
      @click="shareTicket(true)"
    />
    <SharePanel
      ref="sharePanel"
      @success-copy="$emit('success-copy')"
    />
  </div>
</template>

<script setup>
import { useCommonStore } from '@/stores/common.js'
import { useButtonIcon } from '@/composables/useButtonIcon.js'
import { useScreensWidth } from '@/composables/useScreensWidth.js'
import SharePanel from '@/components/SharePanel/index.vue'

const props = defineProps({
  isUnopened: {
    type: Boolean,
    required: true
  },
  redeemButtonText: {
    type: String,
    required: true
  },
  redeemButtonClass: {
    type: String,
    required: true
  }
})

const commonStore = useCommonStore()
const { buttonIcon } = useButtonIcon()
const { screensWidth } = useScreensWidth()
const sharePanel = ref(null)
const isDisplay = ref(false)

const moveStatus = computed(() => isDisplay.value ? '' : 'translate-y-full')

const emit = defineEmits(['redeem'])

const setBottomGutter = (val) => {
  document.querySelector('#default-layout').style.paddingBottom = val
}

const shareTicket = (val) => {
  sharePanel.value.toggle(val)
}

const detectDeviceWidth = () => {
  if (window.innerWidth >= screensWidth.value.sm) {
    commonStore.isFixedCartShow = false
    isDisplay.value = false
    shareTicket(false)
    setBottomGutter('')
    return false
  } else {
    const fixedCartHeight = window.getComputedStyle(document.documentElement).getPropertyValue('--fixedCart-height')
    setBottomGutter(fixedCartHeight)
    return true
  }
}

const scrollHandler = () => {
  if (!detectDeviceWidth()) { return }
  const basePoint = '.basePoint'
  const scrollY = window.scrollY
  const offsetTop = document.querySelector(basePoint).offsetTop
  const offsetHeight = document.querySelector(basePoint).offsetHeight
  if (scrollY > (offsetTop + offsetHeight)) {
    commonStore.toggleFixedCart(true)
    isDisplay.value = true
  } else {
    commonStore.toggleFixedCart(false)
    isDisplay.value = false
    shareTicket(false)
  }
}

const redeemHandler = () => {
  if (props.isUnopened) { return }
  emit('redeem')
}

onMounted(() => {
  window.addEventListener('scroll', scrollHandler)
  window.addEventListener('resize', detectDeviceWidth)
  window.dispatchEvent(new Event('resize'))
})

onBeforeUnmount(() => {
  setBottomGutter('')
  window.removeEventListener('scroll', scrollHandler)
  window.removeEventListener('resize', detectDeviceWidth)
  commonStore.isFixedCartShow = false
})

defineOptions({
  name: 'FixedCartButton'
})
</script>
