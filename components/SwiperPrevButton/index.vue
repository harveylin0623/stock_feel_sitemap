<template>
  <div
    class="absolute left-[-12px] top-1/2 z-[3] hidden size-[40px] translate-y-[-180%] cursor-pointer rounded-full bg-primary-1 device2:flex"
  >
    <ChevronLeftIcon class="m-auto size-6" />
  </div>
</template>

<script setup>
import { ChevronLeftIcon } from '@heroicons/vue/24/solid'

defineOptions({
  name: 'SwiperPrevButton'
})
</script>
