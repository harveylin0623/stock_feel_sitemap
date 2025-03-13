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
      v-for="item in recommendList"
      :key="item.coupon_activity_id"
      class="w-3/4"
    >
      <SwiperContent :activity-info="item" />
    </swiper-slide>
    <SwiperController ref="swiperController" />
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import SwiperContent from './SwiperContent.vue'
import SwiperController from './SwiperController.vue'

defineProps({
  recommendList: {
    type: Array,
    default () {
      return []
    }
  }
})

const swiperController = ref(null)
const modules = ref([Pagination])
const breakpoints = ref({
  576: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 24
  },
  768: {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 24
  },
  932: {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 24
  }
})

const emit = defineEmits(['setPagInfo'])

const renderCustom = (swiper, current, total) => {
  emit('setPagInfo', {
    current,
    total,
    isBeginning: swiper.isBeginning,
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
  name: 'CouponRecommendSwiper'
})
</script>
