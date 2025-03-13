<template>
  <div
    v-show="isOpen"
    ref="dom"
    class="absolute bottom-[calc(100%+16px)] left-1/2 z-[3] min-h-[150px] w-[320px] -translate-x-1/2 space-y-6 rounded bg-white p-6 shadow-[0px_0px_16px_0px_#AEAEC099] after:absolute after:bottom-[-5px] after:left-1/2 after:size-[18px] after:-translate-x-1/2 after:rotate-45 after:bg-white"
  >
    <div class="flex justify-between">
      <p class="size-6"></p>
      <p class="font-bold">{{ $t('sharePage') }}</p>
      <XMarkIcon
        class="size-6 cursor-pointer"
        @click="toggle(false)"
      />
    </div>
    <div class="flex">
      <div
        class="w-1/2 cursor-pointer border-r border-r-gray-7"
        @click="shareHandler('fb')"
      >
        <img
          src="@/assets/image/facebook.png"
          class="mx-auto mb-1 size-7"
          alt="facebook"
        />
        <p class="text-center">Facebook</p>
      </div>
      <div
        class="w-1/2 cursor-pointer"
        @click="shareHandler('line')"
      >
        <img
          src="@/assets/image/line.png"
          class="mx-auto mb-1 size-7"
          alt="line"
        />
        <p class="text-center">LINE</p>
      </div>
    </div>
    <BaseButton
      v-clipboard="getCurrentUrl"
      v-clipboard:success="clipboardSuccessHandler"
      class="btn-outline-gray-2 sm"
      :text="$t('copyPageLink')"
      :left-icon-url="buttonIcon.like"
      :hover-left-icon-url="buttonIcon.like2"
    />
  </div>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { useButtonIcon } from '@/composables/useButtonIcon.js'

const props = defineProps({
  autoClose: {
    type: Boolean,
    default: false
  }
})

const { buttonIcon } = useButtonIcon()
const dom = ref(null)
const timer = ref(null)
const isOpen = ref(false)

const emit = defineEmits(['successCopy'])

const toggle = (val) => {
  isOpen.value = val
}

const getCurrentUrl = () => {
  return location.href
}

const clipboardSuccessHandler = () => {
  emit('successCopy')
}

const shareHandler = (type) => {
  const mapping = {
    fb: 'https://www.facebook.com/sharer/sharer.php?u=',
    line: 'https://social-plugins.line.me/lineit/share?url='
  }
  const sharelink = `${mapping[type]}${encodeURIComponent(getCurrentUrl())}`
  window.open(sharelink)
}

const detectAutoClose = () => {
  const { top } = dom.value.getBoundingClientRect()
  if (top < 105) {
    isOpen.value = false
  }
  timer.value = window.requestAnimationFrame(detectAutoClose)
}

onMounted(() => {
  if (props.autoClose) {
    timer.value = window.requestAnimationFrame(detectAutoClose)
  }
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(timer.value)
})

defineExpose({
  toggle
})

defineOptions({
  name: 'SharePanel'
})
</script>
