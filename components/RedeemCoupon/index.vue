<template>
  <div>
    <NuxtLink
      :to="redirectUrl"
      class="relative block overflow-hidden rounded rounded-tr-[40px] pt-[100%]"
    >
      <img
        :src="activityImage"
        class="absolute left-0 top-0 z-[1] size-full"
        alt=""
      />
      <template v-if="isUnopened">
        <div class="absolute left-0 top-0 z-[2] size-full bg-black opacity-40"></div>
        <img
          src="@/assets/image/activity-mask.png"
          class="absolute left-1/2 top-1/2 z-[3] size-full -translate-x-1/2 -translate-y-1/2 device1:size-[200px]"
          alt=""
        />
      </template>
    </NuxtLink>
    <div class="space-y-1 pt-2 device1:space-y-2">
      <p
        v-show="false"
        class="text-gray-3"
      >
        O.A Beaute
      </p>
      <p class="line-clamp-1 font-medium">{{ activityInfo.title }}</p>
      <p class=" text-sm text-gray-5 device1:text-base">購買起 - {{ deadline }}</p>
      <div class="flex items-center">
        <LemonImage />
        <p class="ml-1 text-xl text-secondary-1 device1:text-2xl">{{ pointDollar }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useActivityStatus } from '@/composables/useActivityStatus.js'
import { useDayjs } from '@/composables/useDayjs.js'

const props = defineProps({
  activityInfo: {
    type: Object,
    required: true
  }
})

const { defaultActivityImage, activityMappingStatus } = useActivityStatus()
const { dateTimeFormat } = useDayjs()

const redirectUrl = computed(() => {
  const { coupon_activity_id, activity_code } = props.activityInfo
  return {
    name: 'activityDetail',
    params: { id: coupon_activity_id },
    query: { code: activity_code }
  }
})

const isUnopened = computed(() => props.activityInfo.status === activityMappingStatus.value.unopened.code)

const activityImage = computed(() => {
  const { url } = props.activityInfo.feature_image
  return url !== null ? url : defaultActivityImage.value
})

const deadline = computed(() => dateTimeFormat(props.activityInfo.end_datetime))

const pointDollar = computed(() => props.activityInfo.point_condition[0].amount)

defineOptions({
  name: 'RedeemCoupon'
})
</script>
