<template>
  <div
    ref="cardDom"
    class="card relative mx-auto w-[90%] cursor-pointer bg-white shadow-howto device1:w-[calc((100%-24px*2)/3)]"
    :style="moveTopDistance"
    :class="{'!top-0':noTopDistance, 'invisible': invisible, 'animate__animated': !invisible, 'animate__fadeInUp': !invisible}"
    @click="redirectHandler"
  >
    <div class="flip-card-container">
      <div class="front border-y border-y-black px-5 pb-10 pt-5">
        <div
          class="mb-5 flex device1:h-[180px] sm:h-60"
          :class="item.bgColor"
        >
          <img
            :src="item.imageUrl"
            class="m-auto h-auto w-[90%]"
            :alt="item.title"
          />
        </div>
        <div class="border-t border-t-black pt-5">
          <p class="mb-2">{{ item.title }}</p>
          <p class="text-gray-3">{{ item.desc }}</p>
          <p
            v-if="showTip"
            class="mt-2 text-sm text-gray-5"
          >
            {{ item.tip }}
          </p>
        </div>
      </div>
      <div class="back hidden"></div>
    </div>
  </div>
</template>

<script setup>
import { useScreensWidth } from '@/composables/useScreensWidth.js'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  canAnimate: {
    type: Boolean,
    required: true
  },
  order: {
    type: Number,
    required: true
  }
})

const { screensWidth } = useScreensWidth()
const baseGutter = ref(40)
const invisible = ref(true)
const noTopDistance = ref(false)
const cardDom = ref(null)

const showTip = computed(() => props.item.tip !== '')

const moveTopDistance = computed(() => {
  const distance = baseGutter.value * props.item.order
  return { top: `${distance}px` }
})

const adjustTopDistance = () => {
  noTopDistance.value = window.innerWidth < screensWidth.value.sm
}

const redirectHandler = () => {
  window.open(props.item.linkUrl)
}

const runAnimate = () => {
  const time = window.innerWidth > screensWidth.value.sm ? (props.order * 200) : 0
  setTimeout(() => {
    invisible.value = false
  }, time)
}

const observeHandler = () => {
  if (window.innerWidth > screensWidth.value.sm) { return }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runAnimate()
        observer.unobserve(cardDom.value)
      }
    })
  }, {
    threshold: 0.2
  })
  observer.observe(cardDom.value)
}

onMounted(() => {
  window.addEventListener('resize', adjustTopDistance)
  window.dispatchEvent(new Event('resize'))
  observeHandler()
})

watch(() => props.canAnimate, (val) => {
  if (val) { runAnimate() }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', adjustTopDistance)
})

defineOptions({
  name: 'HowToItem'
})
</script>

<style scoped lang="scss">
.card {
  &.animate__animated.animate__fadeInUp {
    animation-timing-function: cubic-bezier(0.57, 0.4, 0.55, 1.17);
    animation-duration: 0.6s;
  }
}
</style>
