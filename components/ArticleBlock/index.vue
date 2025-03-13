<template>
  <div class="relative">
    <ArticleSwiper
      ref="couponRecommendBlock"
      @set-pag-info="setPagInfo"
    />
    <SwiperPrevButton
      v-if="swiperPagInfo.isEnd"
      @click="slidePrev"
    />
    <SwiperNextButton
      v-else
      @click="slideNext"
    />
  </div>
</template>

<script setup>
import { useRecommendSwiperPag } from '@/composables/useRecommendSwiperPag.js'
import ArticleSwiper from '@/components/ArticleBlock/ArticleSwiper.vue'
import SwiperNextButton from '@/components/SwiperNextButton/index.vue'
import SwiperPrevButton from '@/components/SwiperPrevButton/index.vue'

const modelValue = defineModel({
  type: String,
  required: true
})

const { pagText, couponRecommendBlock, swiperPagInfo, setPagInfo, slideNext, slidePrev } = useRecommendSwiperPag()

watch(pagText, (val) => {
  modelValue.value = val
})

defineOptions({
  name: 'ArticleBlock'
})
</script>
