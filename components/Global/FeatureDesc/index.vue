<template>
  <div
    class="block lg:flex lg:flex-wrap"
    :class="[displayBorder, {'!mb-6':isSmall}]"
  >
    <div class="flex flex-wrap lg:mr-5">
      <p class="text-xl font-medium device1:text-[28px]">{{ desc1 }}</p>
      <p class="ml-2 self-end text-lg device1:text-xl">/ {{ desc2 }}</p>
    </div>
    <div class="self-end text-sm text-gray-3 device1:text-base lg:border-l lg:border-l-gray-7 lg:pl-5">{{ desc3 }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  desc1: {
    type: String,
    required: true
  },
  desc2: {
    type: String,
    required: true
  },
  desc3: {
    type: String,
    default: ''
  },
  hasBorder: {
    type: Boolean,
    default: true
  },
  isSmall: {
    type: Boolean,
    default: false
  }
})

const displayBorder = computed(() => props.hasBorder ? ['border-t border-t-black pt-2 mb-8 device1:mb-10'] : '')

defineOptions({
  name: 'FeatureDesc'
})
</script>
