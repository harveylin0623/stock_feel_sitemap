<template>
  <div class="border border-black">
    <div class="flex bg-primary-1 px-5 py-3">
      {{ $t('orderNumber') }}  ：{{ orderInfo.order_num }}
    </div>
    <div class="p-5 sm:flex">
      <div class="mx-auto mb-8 size-[120px] shrink-0 grow-0 sm:mb-0">
        <img
          :src="activityImage"
          class="size-full"
          alt=""
        />
      </div>
      <div class="shrink grow sm:pl-8">
        <div class="mb-5 items-center sm:flex">
          <div class="mb-5 shrink grow pr-2 sm:mb-0">
            <p
              v-show="false"
              class="mb-2 text-center text-gray-3 sm:text-left"
            >
              O.A Beaute
            </p>
            <p class="text-center text-xl font-medium sm:text-left">{{ orderInfo.coupon_activity.information.title }}</p>
          </div>
          <NuxtLink
            :to="historyDetailUrl"
            class="h-[48px] w-full shrink-0 grow-0 rounded bg-primary-1 text-center leading-[48px] sm:h-[56px] sm:w-[148px] sm:leading-[56px]"
          >
            {{ $t('viewOrderInformation') }}
          </NuxtLink>
        </div>
        <div class="space-y-4">
          <div class="flex items-start">
            <div class="flex shrink-0 grow-0 items-center">
              <ShoppingCartImage />
              <p class="ml-2 text-gray-5">{{ $t('redemptionTime') }}：</p>
            </div>
            <p class="shrink grow text-gray-5">{{ orderInfo.created_at }}</p>
          </div>
          <div class="flex items-start">
            <div class="flex shrink-0 grow-0 items-center">
              <PayImage />
              <p class="ml-2 text-gray-5">{{ $t('paymentMethod') }}：</p>
            </div>
            <p class="shrink grow text-gray-5">{{ usedPoint }} {{ $t('lemonCoin') }}</p>
          </div>
          <div class="flex items-start">
            <div class="flex shrink-0 grow-0 items-center">
              <OrderImage />
              <p class="ml-2 text-gray-5">{{ $t('orderNumber') }}：</p>
            </div>
            <p class="shrink grow text-gray-5">{{ orderInfo.order_num }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useActivityStatus } from '@/composables/useActivityStatus.js'

const props = defineProps({
  orderInfo: {
    type: Object,
    required: true
  }
})

const { defaultActivityImage } = useActivityStatus()

const activityImage = computed(() => {
  const { url } = props.orderInfo.coupon_activity.information.feature_image
  return url !== null ? url : defaultActivityImage.value
})

const usedPoint = computed(() => {
  let pointText = '0'
  const { point_condition } = props.orderInfo.coupon_activity.information
  if (point_condition.length > 0) {
    pointText = point_condition[0].amount
  }
  return pointText
})

const historyDetailUrl = computed(() => `/memberCenter/redeemHistory/${props.orderInfo.order_num}`)

defineOptions({
  name: 'OrderList'
})
</script>
