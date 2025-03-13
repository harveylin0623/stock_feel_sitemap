<template>
  <div class="shrink grow">
    <p class="mb-4 text-lg font-medium text-white">{{ item.title }}</p>
    <div class="space-y-2">
      <a
        v-for="(child,index) in item.children"
        :key="index"
        :href="child.url"
        target="_blank"
        class="block w-full text-gray-5"
      >{{ child.title }}</a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})

defineOptions({
  name: 'PcLinkItem'
})
</script>
