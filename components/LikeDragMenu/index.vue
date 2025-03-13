<template>
  <div
    class="fixed bottom-0 left-0 z-[14] w-full rounded-t-lg bg-white p-5 transition-transform duration-200 ease-in-out"
    :class="displayStatus"
  >
    <div class="flex items-center justify-between border-b border-b-gray-7 pb-4">
      <div class="flex">
        <component
          :is="tagretIcon"
          v-if="showIcon"
          class="size-6"
        />
        <p
          class="ml-1"
          :class="{'opacity-0':!showMenuTitle}"
        >
          {{ menuTitle }}
        </p>
      </div>
      <div>
        <XMarkIcon
          class="size-6"
          @click="closeHandler"
        />
      </div>
    </div>
    <div class="max-h-[70dvh] min-h-[40vh] overflow-y-auto pt-5">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { XMarkIcon, Squares2X2Icon, InformationCircleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  menuTitle: {
    type: String,
    default: ''
  },
  iconType: {
    type: String,
    default: ''
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const mappingIcon = ref({
  menu: Squares2X2Icon,
  info: InformationCircleIcon
})

const showMenuTitle = computed(() => props.menuTitle !== '')

const showIcon = computed(() => props.iconType !== '')

const tagretIcon = computed(() => mappingIcon.value[props.iconType] || '')

const displayStatus = computed(() => props.isOpen ? 'translate-y-0' : 'translate-y-full')

const emit = defineEmits(['close'])

const closeHandler = () => {
  emit('close')
}

defineOptions({
  name: 'LikeDragMenu'
})
</script>
