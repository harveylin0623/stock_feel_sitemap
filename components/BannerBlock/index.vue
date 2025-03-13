<template>
  <swiper
    :modules="modules"
    :loop="true"
    :autoplay="autoplay"
    :pagination="{ clickable: true }"
    class="banner-swiper"
  >
    <swiper-slide
      v-for="banner in bannerList"
      :key="banner.cms_id"
      class="cursor-pointer"
    >
      <BannerSwiperContent
        :content="banner"
      />
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import BannerSwiperContent from '@/components/BannerBlock/BannerSwiperContent.vue'

defineProps({
  bannerList: {
    type: Array,
    default () {
      return []
    }
  }
})

const modules = ref([Autoplay, Pagination])
const autoplay = ref({
  delay: 2000
})

defineOptions({
  name: 'BannerBlock'
})
</script>
