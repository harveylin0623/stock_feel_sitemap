<template>
  <LikeDragMenu
    :menu-title="$t('instructionsForUse2')"
    icon-type="info"
    :is-open="commonStore.showCouponUsage"
    @close="closeHandler"
  >
    <div>
      <img
        :src="couponImage"
        class="mx-auto mb-6 size-[100px]"
        alt=""
      />
      <p class="mb-6 text-xl">{{ couponTitle }}</p>
      <FeatureDesc
        :desc1="$t('instructionsForUse')"
        desc2="Terms and Conditions"
        :is-small="true"
      />
      <div class="space-y-6">
        <div class="flex items-start">
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
            id="coupon-usage-content"
            v-dompurify-html="couponContent"
            class="shrink grow text-gray-5"
          ></div>
        </div>
      </div>
    </div>
  </LikeDragMenu>
</template>

<script setup>
import _ from 'lodash'
import { useCommonStore } from '@/stores/common.js'
import { useCouponInfo } from '@/composables/useCouponInfo.js'
import LikeDragMenu from '@/components/LikeDragMenu/index.vue'

const commonStore = useCommonStore()
const { defaultCouponImage } = useCouponInfo()
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

const closeHandler = () => {
  commonStore.toggleCouponUsage(false)
}

const setCouponInfo = (payload) => {
  couponInfo.value = payload
}

onBeforeUnmount(() => {
  closeHandler()
})

defineExpose({
  setCouponInfo
})

defineOptions({
  name: 'CouponUsagePanel'
})
</script>

<style lang="scss">
#coupon-usage-content {
  * {
    word-break: break-all;
    white-space: normal !important;
  }
}
</style>
