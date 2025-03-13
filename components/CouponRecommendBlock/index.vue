<template>
  <div class="relative hidden sm:block">
    <CouponRecommendSwiper
      ref="couponRecommendBlock"
      :recommend-list="recommendList"
      @set-pag-info="setPagInfo"
    />
    <SwiperPrevButton
      v-if="showPrevButton"
      @click="slidePrev"
    />
    <SwiperNextButton
      v-if="!swiperPagInfo.isEnd"
      @click="slideNext"
    />
  </div>
</template>

<script setup>
import { useRecommendSwiperPag } from '@/composables/useRecommendSwiperPag.js'
import CouponRecommendSwiper from '@/components/CouponRecommendBlock/CouponRecommendSwiper.vue'
import SwiperNextButton from '@/components/SwiperNextButton/index.vue'
import SwiperPrevButton from '@/components/SwiperPrevButton/index.vue'

defineProps({
  recommendList: {
    type: Array,
    default () {
      return []
    }
  }
})

const modelValue = defineModel({
  type: String,
  required: true
})

const { pagText, couponRecommendBlock, swiperPagInfo, setPagInfo, slideNext, slidePrev } = useRecommendSwiperPag()

const showPrevButton = computed(() => {
  const { total, isBeginning } = swiperPagInfo.value
  return total > 1 && isBeginning === false
})

watch(pagText, (val) => {
  modelValue.value = val
})

defineOptions({
  name: 'CouponRecommendBlock'
})
</script>
