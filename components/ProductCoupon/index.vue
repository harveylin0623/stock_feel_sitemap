<template>
  <div class="py-5">
    <div class="flex">
      <div class="size-[100px] shrink-0 grow-0 sm:size-[120px]">
        <img
          :src="couponImage"
          class="size-full"
          alt=""
        />
      </div>
      <div class="shrink grow pl-5 pt-[14px] sm:pt-0">
        <div class="flex items-start">
          <p class="shrink grow break-all font-medium sm:pr-2 sm:text-xl">{{ couponInfo.title }}</p>
          <a
            :href="couponInfo.redeem_url"
            target="_blank"
            class="hidden h-[56px] w-[120px] shrink-0 grow-0 rounded bg-primary-1 text-center leading-[56px] sm:block"
          >{{ $t('displayBarcode') }}</a>
        </div>
        <div class="hidden sm:block">
          <div class="mb-4 flex items-center">
            <div class="flex items-center">
              <DateImage />
              <p class="ml-2 text-gray-5">{{ $t('timeOfUse') }}：</p>
            </div>
            <p class="shrink grow text-gray-5">{{ couponInfo.duration }}</p>
          </div>
          <div class="flex items-center">
            <div class="flex items-center">
              <InformationCircleIcon class="size-6" />
              <p class="ml-2 text-gray-5">{{ $t('instructionsForUse2') }}：</p>
            </div>
            <a
              :href="couponInfo.redeem_url"
              target="blank"
              class="text-secondary-1 underline"
            >{{ couponInfo.redeem_url }}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="block sm:hidden">
      <a
        :href="couponInfo.redeem_url"
        target="_blank"
        class="mt-5 h-[48px] w-full rounded bg-primary-1 text-center leading-[48px]"
      >{{ $t('displayBarcode') }}</a>
      <div class="mt-5">
        <div class="mb-4 flex items-center">
          <div class="flex items-center">
            <DateImage />
            <p class="ml-2 text-gray-5">{{ $t('timeOfUse') }}：</p>
          </div>
          <p class="shrink grow text-gray-5">{{ couponInfo.duration }}</p>
        </div>
        <div class="flex items-center">
          <div class="flex items-center">
            <InformationCircleIcon class="size-6" />
            <p class="ml-2 text-gray-5">{{ $t('instructionsForUse2') }}：</p>
          </div>
          <a
            :href="couponInfo.redeem_url"
            target="blank"
            class="break-all text-secondary-1 underline"
          >{{ couponInfo.redeem_url }}</a>
        </div>
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
  }
})

const { defaultCouponImage } = useCouponInfo()

const couponImage = computed(() => {
  const { url } = props.couponInfo.feature_image
  return url !== null ? url : defaultCouponImage.value
})

defineOptions({
  name: 'ProductCoupon'
})
</script>
