<template>
  <div class="mb-4">
    <div class="container">
      <div class="flex justify-end">
        <div
          id="vivus-path-1"
          ref="elPoint"
          class="h-[56px] w-[128px] sm:h-[74px] sm:w-[200px]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVivusSvgPath } from '@/composables/useVivusSvgPath.js'

const { elPoint } = useVivusSvgPath({
  pathId: 'vivus-path-1',
  svgKey: 'one',
  rootMargin: '0px 0px 0px 0px'
})

defineOptions({
  name: 'VivusPath1'
})
</script>
