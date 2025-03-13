<template>
  <div class="mb-[60px] h-auto bg-mobile-howto bg-[length:100%_100%] device1:h-[630px] sm:mb-[120px]">
    <div class="container relative device1:h-full">
      <FeatureDesc
        :desc1="$t('howToUse')"
        desc2="How to Use"
        :desc3="$t('sectionTitle.shopOnlineEarnLemonCoins')"
      />
      <VivusPath2 v-if="hasSvgAnimate" />
      <div
        ref="howtoBox"
        class="space-y-8 device1:flex device1:items-start device1:gap-x-[24px] device1:space-y-0"
      >
        <HowToItem
          v-for="(item,index) in howToList"
          :key="index"
          :item="item"
          :can-animate="canAnimate"
          :order="index"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import HowToItem from './HowToItem.vue'
import { useScreensWidth } from '@/composables/useScreensWidth.js'
import image1 from '@/assets/image/howto/get_points.png'
import image2 from '@/assets/image/howto/redeem_tickets.png'
import image3 from '@/assets/image/howto/use_tickets.png'
import VivusPath2 from '@/components/VivusPath2/index.vue'

const props = defineProps({
  sortType: {
    type: String,
    default: 'asc'
  },
  hasSvgAnimate: {
    type: Boolean,
    default: true
  }
})

const { t } = useI18n()
const { screensWidth } = useScreensWidth()
const howtoBox = ref(null)
const canAnimate = ref(false)
const sourceData = ref([
  {
    title: t('howToUseCard.one.title'),
    imageUrl: image1,
    desc: t('howToUseCard.one.content'),
    tip: '',
    bgColor: 'bg-[#1599ce33]',
    linkUrl: process.env.MISSION_CENTER
  },
  {
    title: t('howToUseCard.two.title'),
    imageUrl: image2,
    desc: t('howToUseCard.two.content'),
    tip: '',
    bgColor: 'bg-[#00b48b33]',
    linkUrl: process.env.REDEEM_CENTER
  },
  {
    title: t('howToUseCard.three.title'),
    imageUrl: image3,
    desc: t('howToUseCard.three.content'),
    tip: t('howToUseCard.three.tip'),
    bgColor: 'bg-[#ffdd4433]',
    linkUrl: 'https://www.cashfeel.com.tw/article/?p=1154'
  }
])

const howToList = computed(() => {
  const total = sourceData.value.length
  const list = sourceData.value.reduce((prev, current, index) => {
    let order = 0
    if (props.sortType === 'asc') {
      order = total - (index + 1)
    } else if (props.sortType === 'desc') {
      order = index % total
    }
    prev.push({ ...current, order })
    return prev
  }, [])
  return list
})

const observeHandler = () => {
  if (window.innerWidth <= screensWidth.value.sm) { return }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        canAnimate.value = true
        observer.unobserve(howtoBox.value)
      }
    })
  }, {
    threshold: 0.2
  })
  observer.observe(howtoBox.value)
}

onMounted(() => {
  observeHandler()
})

defineOptions({
  name: 'HowToBlock'
})
</script>
