<template>
  <client-only>
    <el-dialog
      v-model="modalIsOpen"
      :align-center="true"
      :show-close="false"
      :close-on-click-modal="false"
      class="basic-dialog"
    >
      <template v-slot:header>
        <div class="flex items-center">
          <InformationCircleIcon
            class="size-6"
            :class="{hidden:!showIcon}"
          />
          <h3
            class="ml-1 mr-auto"
            :class="{'opacity-0':!showHeaderTitle}"
          >
            {{ headerTitle }}
          </h3>
          <XMarkIcon
            v-show="showXMark"
            class="size-6 cursor-pointer"
            @click="closeHandler"
          />
        </div>
      </template>
      <slot name="default"></slot>
    </el-dialog>
  </client-only>
</template>

<script setup>
import { InformationCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  headerTitle: {
    type: String,
    default: ''
  },
  showIcon: {
    type: Boolean,
    default: false
  },
  showXMark: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:isOpen'])

const modalIsOpen = computed({
  get () {
    return props.isOpen
  },
  set (val) {
    emit('update:isOpen', val)
  }
})

const showHeaderTitle = computed(() => props.headerTitle !== '')

const closeHandler = () => {
  modalIsOpen.value = false
}

defineOptions({
  name: 'BasicModal'
})

</script>
