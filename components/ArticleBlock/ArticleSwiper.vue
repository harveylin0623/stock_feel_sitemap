<template>
  <swiper
    class="relative"
    :modules="modules"
    :pagination="{ type: 'custom', renderCustom }"
    :breakpoints="breakpoints"
    slides-per-view="auto"
    :slides-per-group="1"
    :space-between="16"
  >
    <swiper-slide
      v-for="(article,index) in articleList"
      :key="index"
      class="w-3/4 cursor-pointer"
    >
      <ArticleSwiperContent :article="article" />
    </swiper-slide>
    <SwiperController ref="swiperController" />
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import { useScreensWidth } from '@/composables/useScreensWidth.js'
import ArticleSwiperContent from '@/components/ArticleBlock/ArticleSwiperContent.vue'
import SwiperController from '@/components/ArticleBlock/SwiperController.vue'

import massage from '@/assets/image/article/massage.jpg'
import lemonMall from '@/assets/image/article/lemon_mall.jpg'
import guide from '@/assets/image/article/guide.jpg'
import dyeHair from '@/assets/image/article/dye_hair.jpg'
import shortHair from '@/assets/image/article/short_hair.jpg'
import manicure from '@/assets/image/article/manicure.jpg'

const { t } = useI18n()
const swiperController = ref(null)
const modules = ref([Pagination])
const { screensWidth } = useScreensWidth()
const breakpoints = ref({
  [screensWidth.value.device2]: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 24
  },
  [screensWidth.value.device1]: {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 24
  },
  [screensWidth.value.sm]: {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 24
  }
})

const articleList = ref([
  {
    title: t('articleGroup.title1'),
    date: '2024/04/30',
    hyperlink: 'https://www.cashfeel.com.tw/article/%e6%8c%89%e6%91%a9-%e6%8c%89%e6%91%a9%e5%8a%9f%e6%95%88',
    imgUrl: massage,
    labels: []
  },
  {
    title: t('articleGroup.title2'),
    date: '2024/05/01',
    hyperlink: 'https://www.cashfeel.com.tw/article/%e6%aa%b8%e6%aa%ac%e5%b9%a3-%e9%bb%9e%e6%95%b8-%e6%94%bb%e7%95%a5-%e9%9b%86%e9%bb%9e-%e5%85%8c%e6%8f%9b',
    imgUrl: lemonMall,
    labels: []
  },
  {
    title: t('articleGroup.title3'),
    date: '2024/05/02',
    hyperlink: 'https://www.cashfeel.com.tw/article/%e6%9c%83%e5%93%a1%e6%8c%87%e5%8d%97',
    imgUrl: guide,
    labels: []
  },
  {
    title: t('articleGroup.title4'),
    date: '2024/05/03',
    hyperlink: 'https://www.cashfeel.com.tw/article/%e6%9f%93%e9%a0%ad-%e9%ab%ae%e8%89%b2-%e9%a2%a8%e6%a0%bc-%e9%81%a9%e5%90%88%e8%86%9a%e8%89%b2',
    imgUrl: dyeHair,
    labels: []
  },
  {
    title: t('articleGroup.title5'),
    date: '2024/05/04',
    hyperlink: 'https://www.cashfeel.com.tw/article/%e9%80%a0%e5%9e%8b-%e9%ab%ae%e5%9e%8b-%e7%9f%ad%e9%ab%ae-%e4%b8%ad%e9%95%b7%e9%ab%ae-%e9%95%b7%e9%ab%ae',
    imgUrl: shortHair,
    labels: []
  },
  {
    title: t('articleGroup.title6'),
    date: '2024/05/05',
    hyperlink: 'https://www.cashfeel.com.tw/article/%e7%be%8e%e7%94%b2-%e6%90%ad%e9%85%8d-%e9%a2%a8%e6%a0%bc',
    imgUrl: manicure,
    labels: []
  }
])

const emit = defineEmits(['setPagInfo'])

const renderCustom = (swiper, current, total) => {
  emit('setPagInfo', {
    current,
    total,
    isEnd: swiper.isEnd
  })
  return ''
}

const slideNext = () => {
  swiperController.value.slideNext()
}

const slidePrev = () => {
  swiperController.value.slidePrev()
}

defineExpose({
  slideNext,
  slidePrev
})

defineOptions({
  name: 'ArticleSwiper'
})
</script>
