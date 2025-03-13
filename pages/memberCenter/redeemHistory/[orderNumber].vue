<template>
  <div>
    <Breadcrumb :breadcrumb-list="breadcrumbList" />
    <h1>{{ $t('seo.pageTitle.orderDetail') }}：{{ route.params.orderNumber }}</h1>
    <div class="mb-10 border border-black sm:mb-[60px]">
      <div class="flex bg-primary-1 px-5 py-3">
        {{ $t('orderNumber') }}：{{ route.params.orderNumber }}
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
          <div class="mb-5">
            <p
              v-show="false"
              class="mb-2 text-center text-gray-3 sm:text-left"
            >
              O.A Beaute
            </p>
            <p class="text-center text-xl font-medium sm:text-left">{{ activityTitle }}</p>
          </div>
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex shrink-0 grow-0 items-center">
                <ShoppingCartImage />
                <p class="ml-2 text-gray-5">{{ $t('redemptionTime') }}：</p>
              </div>
              <p class="shrink grow text-gray-5">{{ redeemTime }}</p>
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
              <p class="shrink grow text-gray-5">{{ route.params.orderNumber }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div
        v-if="hasRedeemCoupon && !isDonateActivity"
        class="mb-10"
      >
        <p class="mb-5">{{ $t('exchangedFollowingCoupon') }}：</p>
        <div class="divide-y divide-gray-7 border-y border-y-black">
          <AvailableCoupon
            v-for="coupon in myCoupons"
            :key="coupon.my_coupon_id"
            :coupon-info="coupon"
            page-type="historyDetail"
            @intro="introHandler"
          />
        </div>
      </div>
      <BaseButton
        :text="$t('returnToRedemptionRecords')"
        class="btn-outline-gray-2 w-full sm:w-60"
        :left-icon-url="buttonIcon.arrowLeft"
        :hover-left-icon-url="buttonIcon.arrowLeftHover"
        @click="router.push({ name: 'redeemHistory' })"
      />
    </div>
    <CouponUsageModal ref="couponUsageModal" />
    <CouponUsagePanel ref="couponUsagePanel" />
  </div>
</template>

<script setup>
import _ from 'lodash'
import { useCommonStore } from '@/stores/common.js'
import { usePageMeta } from '@/composables/usePageMeta.js'
import { useButtonIcon } from '@/composables/useButtonIcon.js'
import { useBreadcrumb } from '@/composables/useBreadcrumb.js'
import { useMmrmResponseCode } from '@/composables/useMmrmResponseCode.js'
import { useActivityStatus } from '@/composables/useActivityStatus.js'
import { useScreensWidth } from '@/composables/useScreensWidth.js'
import { useDonateActivity } from '@/composables/useDonateActivity.js'
import { couponApi } from '@/api/coupon.js'
import AvailableCoupon from '@/components/AvailableCoupon/index.vue'
import CouponUsageModal from '@/components/Modal/CouponUsageModal.vue'
import CouponUsagePanel from '@/components/CouponUsagePanel/index.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const commonStore = useCommonStore()
const { redeemHistoryDetailMeta } = usePageMeta()
const { buttonIcon } = useButtonIcon()
const { breadcrumbList } = useBreadcrumb([
  { title: t('seo.pageTitle.home'), path: '/' },
  { title: t('seo.pageTitle.memberCenter'), path: '/memberCenter' },
  { title: t('seo.pageTitle.redeemHistory'), path: '/memberCenter/redeemHistory' },
  { title: t('seo.pageTitle.orderDetail'), path: `/memberCenter/redeemHistory/${route.params.orderNumber}` }
])
const { mmrmResponseCode } = useMmrmResponseCode()
const { defaultActivityImage } = useActivityStatus()
const { screensWidth } = useScreensWidth()
const { isDonateActivity, checkIsDonateActivity } = useDonateActivity()
const couponActivity = ref({})
const myCoupons = ref([])
const redeemTime = ref('')
const couponUsageModal = ref(null)
const couponUsagePanel = ref(null)

const hasCouponActivity = computed(() => !_.isEmpty(couponActivity.value))

const activityTitle = computed(() => hasCouponActivity.value ? couponActivity.value.information.title : '')

const activityImage = computed(() => {
  let imgUrl = ''
  if (hasCouponActivity.value) {
    const { url } = couponActivity.value.information.feature_image
    imgUrl = url !== null ? url : defaultActivityImage.value
  } else {
    imgUrl = defaultActivityImage.value
  }
  return imgUrl
})

const usedPoint = computed(() => {
  let pointText = '0'
  if (hasCouponActivity.value) {
    const { point_condition } = couponActivity.value.information
    if (point_condition.length > 0) {
      pointText = point_condition[0].amount
    }
  }
  return pointText
})

const hasRedeemCoupon = computed(() => myCoupons.value.length > 0)

const introHandler = (payload) => {
  if (window.innerWidth > screensWidth.value.sm) {
    couponUsageModal.value.setCouponInfo(payload)
    couponUsageModal.value.toggle(true)
  } else {
    couponUsagePanel.value.setCouponInfo(payload)
    commonStore.toggleCouponUsage(true)
  }
}

const getOrderDetail = async () => {
  const response = await couponApi.redeemRecord({
    data: {
      order_num: route.params.orderNumber || ''
    }
  })
  if (response.rcrm.RC === mmrmResponseCode.value.C01.code) {
    const { created_at, coupon_activity, my_coupons } = response.results
    const { isDonate } = checkIsDonateActivity(my_coupons)
    isDonateActivity.value = isDonate
    redeemTime.value = created_at
    couponActivity.value = coupon_activity
    myCoupons.value = my_coupons
  } else {
    commonStore.toggleReLoginModal(true)
  }
}

onMounted(async () => {
  commonStore.setLoading(true)
  await getOrderDetail()
  commonStore.setLoading(false)
})

definePageMeta({
  middleware: ['cross', 'auth'],
  name: 'redeemHistoryDetail',
  isAuth: true
})

defineOptions({
  name: 'RedeemHistoryDetail'
})

useHead(redeemHistoryDetailMeta)

</script>
