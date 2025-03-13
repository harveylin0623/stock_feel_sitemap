<template>
  <div
    class="fixed left-1/2 top-5 z-[12] hidden h-[64px] w-[320px] -translate-x-1/2 items-center rounded bg-footer p-5 text-white"
    :class="{'!flex': modelValue}"
  >
    <InformationCircleIcon class="size-6" />
    <p class="ml-[6px] mr-auto">{{ text }}</p>
    <XMarkIcon
      class="size-6 cursor-pointer"
      @click="closeHandler"
    />
  </div>
</template>

<script setup>
import { InformationCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

const timer = ref(null)

const emit = defineEmits(['update:modelValue'])

const closeHandler = () => {
  clearTimeout(timer.value)
  emit('update:modelValue', false)
}

watch(() => props.modelValue, (val) => {
  if (val) {
    timer.value = setTimeout(() => {
      emit('update:modelValue', false)
    }, 3000)
  }
})

onBeforeUnmount(() => {
  clearTimeout(timer.value)
})

defineOptions({
  name: 'Toastr'
})
</script>
