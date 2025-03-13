<template>
  <div class="border border-black">
    <div
      class="flex justify-end px-5 py-3 sm:justify-start"
      :class="couponStatusBgColor"
    >
      <div
        class="inline-block rounded bg-white px-2 py-1 text-sm"
        :class="couponStatusColor"
      >
        {{ couponStatusText }}
      </div>
    </div>
    <div class="p-5 sm:flex">
      <div class="mx-auto mb-8 size-[120px] shrink-0 grow-0 sm:mb-0">
        <img
          :src="couponImage"
          class="size-full"
          alt=""
        />
      </div>
      <div class="shrink grow sm:pl-8">
        <div
          class="items-start sm:mb-0 sm:flex"
          :class="{'mb-5':!isDonateCoupon}"
        >
          <div
            class="shrink grow pr-0 sm:mb-0 sm:pr-2"
            :class="{'mb-5':!isDonateCoupon}"
          >
            <p
              v-show="false"
              class="mb-2 text-center text-gray-3 sm:text-left"
            >
              O.A Beaute
            </p>
            <p class="text-center text-xl font-medium sm:text-left">{{ couponInfo.title }}</p>
          </div>
          <div
            v-if="!isDonateCoupon"
            :class="buttonBgColor"
            class="h-[48px] w-full shrink-0 grow-0 cursor-pointer rounded text-center leading-[48px] sm:h-[56px] sm:w-[120px] sm:leading-[56px]"
            @click="showBarcode"
          >
            {{ $t('displayBarcode') }}
          </div>
        </div>
        <template v-if="!isDonateCoupon">
          <div class="mb-4 flex items-start">
            <div class="flex shrink-0 grow-0 items-center">
              <DateImage />
              <p class="ml-2 text-gray-5">{{ $t('timeOfUse') }}：</p>
            </div>
            <p class="shrink grow text-gray-5">{{ couponInfo.duration }}</p>
          </div>
          <div class="flex items-start">
            <div class="flex shrink-0 grow-0 items-start">
              <InformationCircleIcon class="size-6" />
              <p class="ml-2 text-gray-5">{{ $t('instructionsForUse2') }}：</p>
            </div>
            <a
              :href="couponInfo.redeem_url"
              target="_blank"
              class="shrink grow break-all text-secondary-1 underline"
            >{{ couponInfo.redeem_url }}</a>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
import { useCouponInfo } from '@/composables/useCouponInfo.js'
import { useDonateActivity } from '@/composables/useDonateActivity.js'

const props = defineProps({
  couponInfo: {
    type: Object,
    required: true
  }
})

const { defaultCouponImage, couponUsageInfo } = useCouponInfo()
const { donateMetaKey, donateMetaValue } = useDonateActivity()

const couponStatusText = computed(() => couponUsageInfo.value[props.couponInfo.status].title || '')

const couponStatusColor = computed(() => couponUsageInfo.value[props.couponInfo.status].textColor || '')

const couponStatusBgColor = computed(() => couponUsageInfo.value[props.couponInfo.status].bgColor || '')

const buttonBgColor = computed(() => {
  return props.couponInfo.status === couponUsageInfo.value.expired.code ? 'bg-gray-7' : 'bg-primary-1'
})

const couponImage = computed(() => {
  const { url } = props.couponInfo.feature_image
  return url !== null ? url : defaultCouponImage.value
})

const isDonateCoupon = computed(() => {
  if (props.couponInfo.external_meta === undefined) { return false }
  if (props.couponInfo.external_meta.length === 0) { return false }
  const [obj] = props.couponInfo.external_meta
  return obj.key === donateMetaKey.value && obj.value === donateMetaValue.value
})

const showBarcode = () => {
  if (props.couponInfo.status !== couponUsageInfo.value.expired.code) {
    window.open(props.couponInfo.redeem_url)
  }
}

defineOptions({
  name: 'UserOwnCoupon'
})
</script>
