<template>
  <div class="shrink grow cursor-pointer">
    <p
      class="flex h-10 items-center justify-center border-b border-b-gray-7 text-center text-gray-5 sm:text-lg [&.active]:border-b-[3px] [&.active]:border-b-primary-1 [&.active]:text-black"
      :class="{active:isActive}"
      @click="tabClick"
    >
      {{ tabInfo.title }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  tabInfo: {
    type: Object,
    required: true
  },
  currentCouponType: {
    type: String,
    required: true
  }
})

const isActive = computed(() => props.tabInfo.type === props.currentCouponType)

const emit = defineEmits(['changeTabType'])

const tabClick = () => {
  if (isActive.value) { return }
  emit('changeTabType', props.tabInfo.type)
}

defineOptions({
  name: 'CouponStatusTab'
})
</script>
