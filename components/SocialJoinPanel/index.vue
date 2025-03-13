<template>
  <LikeDragMenu
    :is-open="commonStore.showSocialPanel"
    @close="toggle(false)"
  >
    <div>
      <div class="mx-auto mb-6 size-[160px]">
        <img
          src="@/assets/image/shop_mall_line.png"
          class="size-full"
          alt=""
        />
      </div>
      <div class="mb-10 text-center">
        <p class="mb-2 text-xl font-medium">
          {{ $t('join') }} {{ $t('joinLemonStore', { name: 'LINE@' }) }}
        </p>
        <p class="text-gray-5">各項產品訊息皆可在</p>
        <p class="text-gray-5">檬檬商城LINE@查看喔</p>
      </div>
      <div class="space-y-5">
        <BaseButton
          :text="$t('viewNow')"
          class="btn-primary-1"
          :right-icon-url="buttonIcon.arrowBtn"
          @click="confirmHandler"
        />
        <BaseButton
          :text="$t('cancel')"
          class="btn-outline-gray-2"
          @click="toggle(false)"
        />
      </div>
    </div>
  </LikeDragMenu>
</template>

<script setup>
import { useCommonStore } from '@/stores/common.js'
import { useButtonIcon } from '@/composables/useButtonIcon.js'
import LikeDragMenu from '@/components/LikeDragMenu/index.vue'

const props = defineProps({
  lineUrl: {
    type: String,
    required: true
  }
})

const commonStore = useCommonStore()
const { buttonIcon } = useButtonIcon()

const toggle = (val) => {
  commonStore.toggleSocialPanel(val)
}

const confirmHandler = () => {
  window.open(props.lineUrl)
}

onBeforeUnmount(() => {
  toggle(false)
})

defineExpose({
  toggle
})

defineOptions({
  name: 'SocialJoinPanel'
})
</script>
