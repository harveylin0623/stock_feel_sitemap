<template>
  <BasicModal
    v-model:is-open="isOpen"
    :header-title="$t('instructionsForUse2')"
    :show-icon="true"
  >
    <template v-slot:default>
      <div class="mx-auto mb-6 size-[200px]">
        <img
          :src="couponImage"
          class="size-full"
          alt=""
        />
      </div>
      <h3 class="mb-6">{{ couponTitle }}</h3>
      <FeatureDesc
        :desc1="$t('instructionsForUse')"
        desc2="Terms and Conditions"
        :is-small="true"
      />
      <div class="space-y-6">
        <div class="flex items-center">
          <div class="flex shrink-0 grow-0 items-center">
            <DateImage />
            <p class="ml-2 text-gray-5">{{ $t('timeOfUse') }}：</p>
          </div>
          <div class="shrink grow text-gray-5">{{ usageDuration }}</div>
        </div>
        <div class="flex items-start">
          <div class="flex shrink-0 grow-0 items-center">
            <AnnounceImage />
            <p class="ml-2 text-gray-5">{{ $t('precautions') }}：</p>
          </div>
          <div
            v-dompurify-html="couponContent"
            class="cms-editor-block shrink grow text-gray-5"
          ></div>
        </div>
      </div>
    </template>
  </BasicModal>
</template>

<script setup>
import _ from 'lodash'
import { useCouponInfo } from '@/composables/useCouponInfo.js'
import BasicModal from '@/components/Modal/BasicModal.vue'

const { defaultCouponImage } = useCouponInfo()
const isOpen = ref(false)
const couponInfo = ref({})

const hasCouponInfo = computed(() => !_.isEmpty(couponInfo.value))

const couponTitle = computed(() => hasCouponInfo.value ? couponInfo.value.title : '')

const usageDuration = computed(() => hasCouponInfo.value ? couponInfo.value.duration : '')

const couponImage = computed(() => {
  let realImage = ''
  if (hasCouponInfo.value) {
    const { url } = couponInfo.value.feature_image
    realImage = url !== null ? url : defaultCouponImage.value
  } else {
    realImage = defaultCouponImage.value
  }
  return realImage
})

const couponContent = computed(() => {
  let result = ''
  if (hasCouponInfo.value) {
    const { content } = couponInfo.value
    result = content !== null ? content : ''
  }
  return result
})

const toggle = (val) => {
  isOpen.value = val
}

const setCouponInfo = (payload) => {
  couponInfo.value = payload
}

defineExpose({
  toggle,
  setCouponInfo
})

defineOptions({
  name: 'CouponUsageModal'
})
</script>
