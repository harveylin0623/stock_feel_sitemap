<template>
  <li
    class="cursor-pointer px-4 py-2 font-normal hover:text-secondary-1"
    :class="{'text-secondary-1':isSame}"
    @click="clickHandler"
  >
    {{ category.title }}
  </li>
</template>

<script setup>
const props = defineProps({
  category: {
    type: Object,
    required: true
  },
  activityCode: {
    type: String,
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
  name: 'CategoryItem'
})
</script>
