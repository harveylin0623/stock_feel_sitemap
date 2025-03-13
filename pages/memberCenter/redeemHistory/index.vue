<template>
  <div>
    <Breadcrumb :breadcrumb-list="breadcrumbList" />
    <h1>{{ $t('seo.pageTitle.redeemHistory') }}</h1>
    <div class="mb-[60px] sm:mb-10">
      <p class="mb-2">{{ $t('orderStartAndEndTime') }}</p>
      <OrderTimeRange
        ref="timeRange"
        @search="searchOrder"
      />
      <div class="flex items-start text-gray-4 sm:items-center">
        <InformationCircleIcon class="size-6 " />
        <p class="ml-2">{{ $t('youCanCheckOrdersWithinThePastThreeMonths') }}</p>
      </div>
    </div>
    <div class="space-y-6">
      <OrderList
        v-for="order in orderList"
        :key="order.order_num"
        :order-info="order"
      />
    </div>
    <BaseButton
      v-show="showNextPageButton"
      class="btn-primary-1 mx-auto mt-6 w-[200px]"
      :text="nextPageButtonText"
      @click="seeMore"
    />
  </div>
</template>

<script setup>
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
import { useCommonStore } from '@/stores/common.js'
import { usePageMeta } from '@/composables/usePageMeta.js'
import { useBreadcrumb } from '@/composables/useBreadcrumb.js'
import { useMmrmResponseCode } from '@/composables/useMmrmResponseCode.js'
import { couponApi } from '@/api/coupon.js'
import OrderTimeRange from '@/components/OrderTimeRange/index.vue'
import OrderList from '@/components/OrderList/index.vue'

const { t } = useI18n()
const commonStore = useCommonStore()
const { redeemHistoryMeta } = usePageMeta()
const { breadcrumbList } = useBreadcrumb([
  { title: t('seo.pageTitle.home'), path: '/' },
  { title: t('seo.pageTitle.memberCenter'), path: '/memberCenter' },
  { title: t('seo.pageTitle.redeemHistory'), path: '/memberCenter/redeemHistory' }
])
const { mmrmResponseCode } = useMmrmResponseCode()
const timeRange = ref(null)
const pagLoading = ref(false)
const firstGetRecord = ref(true)
const orderList = ref([])
const offsetPag = ref(0)

const showNextPageButton = computed(() => {
  return firstGetRecord.value === false && offsetPag.value !== null
})

const nextPageButtonText = computed(() => {
  return pagLoading.value ? t('loading') : t('seeMore')
})

const getRecord = async (duration, isConcat, pageNumber) => {
  const { start, end } = duration
  const response = await couponApi.redeemRecordList({
    data: {
      start_date: start,
      end_date: end,
      offset: pageNumber === undefined ? 0 : offsetPag.value
    }
  })
  if (response.rcrm.RC !== mmrmResponseCode.value.C01.code) {
    commonStore.toggleReLoginModal(true)
    return
  }
  if (isConcat) {
    orderList.value = orderList.value.concat(response.results.redeem_records)
  } else {
    orderList.value = response.results.redeem_records
  }
  offsetPag.value = response.next
  firstGetRecord.value = false
}

const searchOrder = async (duration) => {
  commonStore.setLoading(true)
  await getRecord(duration, false)
  commonStore.setLoading(false)
}

const seeMore = async () => {
  if (pagLoading.value) { return }
  pagLoading.value = true
  const duration = timeRange.value.getCurrentTime()
  await getRecord(duration, true, offsetPag.value)
  pagLoading.value = false
}

onMounted(async () => {
  commonStore.setLoading(true)
  const duration = timeRange.value.getCurrentTime()
  await getRecord(duration, false)
  commonStore.setLoading(false)
})

definePageMeta({
  middleware: ['cross', 'auth'],
  name: 'redeemHistory',
  isAuth: true
})

defineOptions({
  name: 'RedeemHistory'
})

useHead(redeemHistoryMeta)
</script>
