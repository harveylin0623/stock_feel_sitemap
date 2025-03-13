<template>
  <div
    class="mb-2 w-[calc((100%-8px)/2)] rounded-full border border-black px-[10px] py-[6px] text-center text-sm [&.active]:border-secondary-1 [&.active]:text-secondary-1"
    :class="{active:isSame}"
    @click="clickHandler"
  >
    {{ category.title }}
  </div>
</template>

<script setup>
const props = defineProps({
  activityCode: {
    type: String,
    required: true
  },
  category: {
    type: Object,
    required: true
  }
})

const isSame = computed(() => props.category.code === props.activityCode)

const emit = defineEmits(['changeCategory'])

const clickHandler = () => {
  if (isSame.value) { return }
  emit('changeCategory', {
    ids: props.category.activity_ids,
    code: props.category.code
  })
}

defineOptions({
  name: 'CategoryMobileItem'
})
</script>
