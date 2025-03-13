<template>
  <div class="mb-[30px] sm:absolute lg:mb-0 lg:translate-x-[-120px] lg:translate-y-[-20px]">
    <div
      id="vivus-path-2"
      ref="elPoint"
      class="h-[56px] w-[128px] sm:h-[80px] sm:w-[120px]"
    ></div>
  </div>
</template>

<script setup>
import { useVivusSvgPath } from '@/composables/useVivusSvgPath.js'

const { elPoint } = useVivusSvgPath({
  pathId: 'vivus-path-2',
  svgKey: 'two',
  rootMargin: '0px 0px 0px 100px'
})

defineOptions({
  name: 'VivusPath2'
})
</script>
