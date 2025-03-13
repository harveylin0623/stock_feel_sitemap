<template>
  <div>
    <div
      class="flex justify-between border-b border-white px-4 pb-2 text-white"
      @click="toggle"
    >
      <p>{{ item.title }}</p>
      <ChevronDownIcon
        class="size-6"
        :class="{'-rotate-180': item.isOpen }"
      />
    </div>
    <div
      v-show="item.isOpen"
      class="space-y-3 px-4 pt-3"
    >
      <a
        v-for="(child,index) in item.children"
        :key="index"
        target="_blank"
        :href="child.url"
        class="block w-full text-xs text-gray-5"
      >{{ child.title }}</a>
    </div>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle'])

const toggle = () => {
  emit('toggle', {
    id: props.item.id,
    isOpen: !props.item.isOpen
  })
}

defineOptions({
  name: 'AccordionItem'
})
</script>
