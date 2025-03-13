<template>
  <div>
    <NuxtLink
      :to="redirectUrl"
      class="relative block overflow-hidden rounded-b rounded-tl rounded-tr-[40px] pt-[100%]"
    >
      <img
        :src="activityImage"
        class="absolute left-0 top-0 z-[1] size-full"
        alt=""
      />
    </NuxtLink>
    <div class="space-y-2 pt-2">
      <p
        v-show="false"
        class="text-gray-3"
      >
        誠品書店
      </p>
      <p class="line-clamp-1 font-medium">{{ activityInfo.title }}</p>
      <p class="text-sm text-gray-5 device1:text-base">購買起 - {{ deadline }}</p>
      <div class="flex items-center">
        <LemonImage />
        <p class="ml-1 text-2xl text-secondary-1">{{ needPoint }}</p>
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

const { defaultActivityImage } = useActivityStatus()
const { dateTimeFormat } = useDayjs()

const deadline = computed(() => dateTimeFormat(props.activityInfo.end_datetime))

const activityImage = computed(() => {
  const { url } = props.activityInfo.feature_image
  return url !== null ? url : defaultActivityImage.value
})

const needPoint = computed(() => {
  let pointText = '0'
  if (props.activityInfo.point_condition !== undefined) {
    pointText = props.activityInfo.point_condition[0].amount
  }
  return pointText
})

const redirectUrl = computed(() => {
  const { coupon_activity_id, activity_code } = props.activityInfo
  return {
    name: 'activityDetail',
    params: { id: coupon_activity_id },
    query: { code: activity_code }
  }
})

defineOptions({
  name: 'SwiperContent'
})
</script>
