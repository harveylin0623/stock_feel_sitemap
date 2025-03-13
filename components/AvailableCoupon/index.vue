<template>
  <div class="py-5">
    <div class="flex">
      <div class="size-[100px] shrink-0 grow-0 sm:size-[120px]">
        <img
          :src="couponImage"
          alt="coupon-image"
          class="w-full"
        />
      </div>
      <div class="shrink grow pl-5 pt-1">
        <p class="mb-4 line-clamp-2 font-medium sm:mb-5 sm:text-xl">{{ couponInfo.title }}</p>
        <div
          v-if="!isActivityDetail"
          class="mb-4 hidden items-start sm:flex"
        >
          <div class="flex shrink-0 grow-0 items-center">
            <DateImage />
            <p class="ml-2 text-gray-5">{{ $t('timeOfUse') }}：</p>
          </div>
          <p class="shrink grow text-gray-5">{{ couponInfo.duration }}</p>
        </div>
        <div
          class="cursor-pointer items-center text-gray-3"
          :class="usageStatusClass"
          @click="introHandler"
        >
          <InformationCircleIcon class="size-6" />
          <p class="ml-1 underline">{{ $t('instructionsForUse2') }}</p>
        </div>
      </div>
    </div>
    <div
      v-if="!isActivityDetail"
      class="mt-5 block w-full sm:hidden"
    >
      <div class="mb-4 flex items-start">
        <div class="flex shrink-0 grow-0 items-center">
          <DateImage />
          <p class="ml-2 text-gray-5">{{ $t('timeOfUse') }}：</p>
        </div>
        <p class="shrink grow text-gray-5">{{ couponInfo.duration }}</p>
      </div>
      <div
        class="flex cursor-pointer items-center text-gray-3"
        @click="introHandler"
      >
        <InformationCircleIcon class="size-6" />
        <p class="ml-1 underline">{{ $t('instructionsForUse2') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
import { useCouponInfo } from '@/composables/useCouponInfo.js'

const props = defineProps({
  couponInfo: {
    type: Object,
    required: true
  },
  pageType: {
    type: String,
    default: 'activityDetail'
  }
})

const { defaultCouponImage } = useCouponInfo()

const isActivityDetail = computed(() => props.pageType === 'activityDetail')

const usageStatusClass = computed(() => isActivityDetail.value ? 'flex' : 'hidden sm:flex')

const couponImage = computed(() => {
  const { url } = props.couponInfo.feature_image
  return url !== null ? url : defaultCouponImage.value
})

const emit = defineEmits(['intro'])

const introHandler = () => {
  emit('intro', props.couponInfo)
}

defineOptions({
  name: 'AvailableCoupon'
})
</script>
