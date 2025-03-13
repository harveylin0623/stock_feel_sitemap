<template>
  <div class="hidden">
  </div>
</template>

<script setup>
import { useSwiper } from 'swiper/vue'

const swiper = useSwiper()

const slideNext = () => {
  swiper.value.slideNext()
}

const slidePrev = () => {
  swiper.value.slidePrev()
}

defineExpose({
  slideNext,
  slidePrev
})

</script>
