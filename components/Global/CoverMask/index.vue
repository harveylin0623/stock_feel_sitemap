<template>
  <div
    class="fixed left-0 top-0 z-[12] h-dvh w-full bg-mask transition-opacity duration-200 ease-in-out"
    :class="displayStatus"
  >
  </div>
</template>

<script setup>
import { useCommonStore } from '@/stores/common.js'
import { useLockBody } from '@/composables/useLockBody.js'

const commonStore = useCommonStore()
const { lockBody } = useLockBody()

const displayStatus = computed(() => {
  return commonStore.showCoverMask ? ['opacity-100', 'visible'] : ['opacity-0', 'invisible']
})

watch(() => commonStore.showCoverMask, (val) => {
  lockBody(val)
})

defineOptions({
  name: 'CoverMask'
})
</script>
