<template>
  <BasicModal
    v-model:is-open="isOpen"
    header-title=""
  >
    <template v-slot:default>
      <div class="mx-auto mb-6 size-[200px]">
        <img
          src="@/assets/image/shop_mall_line.png"
          class="size-full"
          alt=""
        />
      </div>
      <h2 class="mb-2 text-center">
        {{ $t('join') }} {{ $t('joinLemonStore', { name: 'LINE@' }) }}
      </h2>
      <p class="mb-10 text-center text-gray-5">
        {{ $t('findInformationOnLemonStore', { name: 'LINE@' }) }}
      </p>
      <div class="flex items-center justify-between">
        <BaseButton
          :text="$t('cancel')"
          class="btn-outline-gray-2 w-[49%]"
          @click="toggle(false)"
        />
        <BaseButton
          :text="$t('viewNow')"
          class="btn-primary-1 w-[49%]"
          :right-icon-url="buttonIcon.arrowBtn"
          @click="confirmHandler"
        />
      </div>
    </template>
  </BasicModal>
</template>

<script setup>
import { useButtonIcon } from '@/composables/useButtonIcon.js'
import BasicModal from '@/components/Modal/BasicModal.vue'

const props = defineProps({
  lineUrl: {
    type: String,
    required: true
  }
})

const { buttonIcon } = useButtonIcon()
const isOpen = ref(false)

const toggle = (val) => {
  isOpen.value = val
}

const confirmHandler = () => {
  window.open(props.lineUrl)
}

defineExpose({
  toggle
})

defineOptions({
  name: 'SocialJoinModal'
})
</script>
