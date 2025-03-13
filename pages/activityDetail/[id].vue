<template>
  <div class="pt-8 sm:pt-10">
    <div class="container">
      <Breadcrumb :breadcrumb-list="breadcrumbList" />
      <div class="mb-20 flex flex-wrap sm:mb-[120px] sm:flex-nowrap">
        <div class="w-full shrink-0 grow-0 sm:w-[450px] xl:w-[580px] 2xl:w-[640px]">
          <div class="relative mb-6 pt-[100%] sm:mb-[60px]">
            <img
              :src="activityImage"
              class="absolute left-0 top-0 z-[1] size-full"
              alt="activity-image"
            />
            <template v-if="isUnopened">
              <div class="absolute left-0 top-0 z-[2] size-full bg-[#00000066]"></div>
              <img
                src="@/assets/image/activity-mask.png"
                class="absolute left-1/2 top-1/2 z-[3] size-[320px] -translate-x-1/2 -translate-y-1/2 object-cover "
                alt="mask-image"
              />
            </template>
          </div>
          <div class="hidden sm:block">
            <FeatureDesc
              :desc1="$t('instructionsForUse')"
              desc2="Terms and Conditions"
            />
            <div
              v-dompurify-html="activityContent"
              class="cms-editor-block"
            ></div>
          </div>
        </div>
        <div class="shrink grow sm:pl-[30px] xl:pl-[74px]">
          <p
            v-show="false"
            class="mb-2 text-gray-3"
          >
            O.A Beaute
          </p>
          <h3 class="mb-5">{{ pageData.activityInfo.title }}</h3>
          <div class="mb-4 flex items-center">
            <DateImage />
            <p class="ml-2 text-gray-5">{{ $t('timeOfUse') }} ： {{ activityDuration }}</p>
          </div>
          <div class="flex items-center">
            <InformationCircleIcon class="size-6" />
            <p class="ml-2 text-gray-5">{{ $t('hint') }} ： {{ $t('payAttentionUsageTime') }}</p>
          </div>
          <div class="my-6 flex items-center sm:my-10">
            <LemonImage />
            <p class="ml-2 mr-3 text-[32px] font-bold text-secondary-1">{{ needPoint }}</p>
            <p class="text-gray-2">({{ $t('restrictLemonCoins') }})</p>
          </div>
          <BaseButton
            :text="redeemButtonText"
            class="mb-5"
            :class="redeemButtonClass"
            :left-icon-url="buttonIcon.shopCart"
            @click="redeemAskInAdvance"
          />
          <div
            class="basePoint relative"
            :class="{'mb-[60px]':showAvailableCouponBlcock}"
          >
            <BaseButton
              :text="$t('shareCoupon')"
              class="btn-outline-gray-2"
              :left-icon-url="buttonIcon.share"
              :hover-left-icon-url="buttonIcon.shareHover"
              @click="shareTicket(true)"
            />
            <SharePanel
              ref="sharePanel"
              @success-copy="showToastr = true"
            />
          </div>
          <div v-show="showAvailableCouponBlcock">
            <p class="mb-5">{{ $t('exchangedFollowingCoupon') }}：</p>
            <div class="divide-y divide-gray-7 border-y border-y-black">
              <AvailableCoupon
                v-for="coupon in pageData.couponList"
                :key="coupon.id"
                :coupon-info="coupon"
                @intro="introHandler"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mb-20 block sm:hidden">
        <FeatureDesc
          :desc1="$t('instructionsForUse')"
          desc2="Terms and Conditions"
        />
        <div
          v-dompurify-html="activityContent"
          class="cms-editor-block"
        ></div>
      </div>
      <div class="mb-20 sm:mb-[120px]">
        <div class="mb-8 flex items-center justify-between border-t border-t-black pt-2 device1:mb-10">
          <FeatureDesc
            :desc1="$t('couponRecommendForYou')"
            desc2="Recommended for You"
            :has-border="false"
          />
          <p
            v-if="showRecommendBlock"
            class="hidden shrink-0 grow-0 self-end whitespace-nowrap pl-3 text-lg sm:block"
          >
            {{ swiperPagText }}
          </p>
        </div>
        <CouponRecommendBlock
          v-if="showRecommendBlock"
          v-model="swiperPagText"
          :recommend-list="pageData.recommendList"
        />
        <div
          v-if="showRecommendBlock"
          class="flex flex-wrap gap-x-4 gap-y-8 sm:hidden"
        >
          <RedeemCoupon
            v-for="activity in pageData.recommendList"
            :key="activity.coupon_activity_id"
            :activity-info="activity"
            class="w-[calc((100%-16px)/2)]"
          />
        </div>
      </div>
    </div>
    <Toastr
      v-model="showToastr"
      :text="$t('pageLinkCopied')"
    />
    <CouponUsageModal ref="couponUsageModal" />
    <CouponUsagePanel ref="couponUsagePanel" />
    <RedeemModal
      ref="redeemModal"
      :pay-coin="needPoint"
      :redeem-status="redeemStatus"
      :rc-code="rcCode"
      @redeem-confirm="redeemConfirm"
    />
    <RedeemPanel
      :pay-coin="needPoint"
      :redeem-status="redeemStatus"
      :rc-code="rcCode"
      @redeem-confirm="redeemConfirm"
    />
    <FixedCartButton
      :is-unopened="isUnopened"
      :redeem-button-text="redeemButtonText"
      :redeem-button-class="redeemButtonClass"
      @success-copy="showToastr = true"
      @redeem="redeemAskInAdvance"
    />
  </div>
</template>

<script setup>
import _ from 'lodash'
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
import { useCommonStore } from '@/stores/common.js'
import { useAuthStore } from '@/stores/auth.js'
import { useBreadcrumb } from '@/composables/useBreadcrumb.js'
import { useButtonIcon } from '@/composables/useButtonIcon.js'
import { useActivityStatus } from '@/composables/useActivityStatus.js'
import { useMmrmResponseCode } from '@/composables/useMmrmResponseCode.js'
import { useDayjs } from '@/composables/useDayjs.js'
import { useScreensWidth } from '@/composables/useScreensWidth.js'
import { activityApi } from '@/api/activity.js'
import { couponApi } from '@/api/coupon.js'
import SharePanel from '@/components/SharePanel/index.vue'
import Toastr from '@/components/Toastr/index.vue'
import AvailableCoupon from '@/components/AvailableCoupon/index.vue'
import CouponRecommendBlock from '@/components/CouponRecommendBlock/index.vue'
import RedeemCoupon from '@/components/RedeemCoupon/index.vue'
import CouponUsageModal from '@/components/Modal/CouponUsageModal.vue'
import RedeemModal from '@/components/Modal/RedeemModal.vue'
import CouponUsagePanel from '@/components/CouponUsagePanel/index.vue'
import RedeemPanel from '@/components/RedeemPanel/index.vue'
import FixedCartButton from '@/components/FixedCartButton/index.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const commonStore = useCommonStore()
const authStore = useAuthStore()
const { buttonIcon } = useButtonIcon()
const { breadcrumbList } = useBreadcrumb([
  { title: t('seo.pageTitle.home'), path: '/' },
  { title: t('seo.pageTitle.ticketCenter'), path: '/' },
  { title: '', path: `/activityDetail/${route.params.id}` }
])
const { defaultActivityImage, activityMappingStatus } = useActivityStatus()
const { mmrmResponseCode } = useMmrmResponseCode()
const { dateTimeFormat } = useDayjs()
const { screensWidth } = useScreensWidth()
const redeemStatus = ref('doing')
const rcCode = ref('')
const showToastr = ref(false)
const sharePanel = ref(null)
const couponUsageModal = ref(null)
const couponUsagePanel = ref(null)
const redeemModal = ref(null)
const swiperPagText = ref('')

const { data: pageData } = await useAsyncData('activityDetail', async () => {
  let couponRes = {}
  let recommendList = []
  const [activityRes, recommendRes] = await Promise.allSettled([
    activityApi.activityInfo({
      data: {
        coupon_activity_ids: [route.params.id],
        full_info: true
      }
    }),
    activityApi.getActivityByCode({
      data: { code: route.query.code || '' }
    })
  ])

  if (activityRes.value.rcrm.RC === mmrmResponseCode.value.C01.code) {
    couponRes = await couponApi.info({
      data: {
        coupon_ids: activityRes.value.results.coupon_activity_information[0].coupon_ids,
        full_info: true
      }
    })
  } else {
    router.replace('/')
    return {}
  }

  if (recommendRes.value.rcrm.RC === mmrmResponseCode.value.C01.code) {
    if (!_.isEmpty(recommendRes.value.results)) {
      recommendList = recommendRes.value.results.coupon_activity_information
      recommendList.forEach((item) => {
        item.activity_code = route.query.code || ''
      })
    }
  }

  return {
    activityInfo: activityRes.value.results.coupon_activity_information[0],
    couponList: couponRes.results.coupon_information,
    recommendList
  }
})

breadcrumbList.value[2].title = pageData.value.activityInfo.title

const isUnopened = computed(() => pageData.value.activityInfo.status === activityMappingStatus.value.unopened.code)

const redeemButtonText = computed(() => isUnopened.value ? t('pleaseStayTuned') : t('redeemNow'))

const redeemButtonClass = computed(() => isUnopened.value ? 'btn-gray-7' : 'btn-primary-1')

const activityImage = computed(() => {
  const { url } = pageData.value.activityInfo.feature_image
  return url !== null ? url : defaultActivityImage.value
})

const activityContent = computed(() => {
  const { content } = pageData.value.activityInfo
  return content !== null ? content : ''
})

const activityDuration = computed(() => {
  const { start_datetime, end_datetime } = pageData.value.activityInfo
  const start = dateTimeFormat(start_datetime)
  const end = dateTimeFormat(end_datetime)
  return `${start} - ${end}`
})

const needPoint = computed(() => {
  let pointText = '0'
  if (pageData.value.activityInfo.point_condition !== undefined) {
    pointText = pageData.value.activityInfo.point_condition[0].amount
  }
  return pointText
})

const redeemPointId = computed(() => {
  let pointId = 0
  if (pageData.value.activityInfo.point_condition !== undefined) {
    pointId = pageData.value.activityInfo.point_condition[0].point_id
  }
  return pointId
})

const showAvailableCouponBlcock = computed(() => pageData.value.couponList.length > 1)

const showRecommendBlock = computed(() => pageData.value.recommendList.length > 0)

const introHandler = (payload) => {
  if (window.innerWidth > screensWidth.value.sm) {
    couponUsageModal.value.setCouponInfo(payload)
    couponUsageModal.value.toggle(true)
  } else {
    couponUsagePanel.value.setCouponInfo(payload)
    commonStore.toggleCouponUsage(true)
  }
}

const redeemAskInAdvance = () => {
  if (isUnopened.value) { return }
  if (authStore.getAuthCookie() === undefined) {
    commonStore.toggleReLoginModal(true)
    return
  }
  redeemStatus.value = 'doing'
  if (window.innerWidth > screensWidth.value.sm) {
    redeemModal.value.toggle(true)
  } else {
    commonStore.toggleRedeemPanel(true)
  }
}

const redeemConfirm = async () => {
  commonStore.setLoading(true)
  const response = await activityApi.redeemCoupon({
    data: {
      coupon_activity_id: pageData.value.activityInfo.coupon_activity_id,
      point_id: redeemPointId.value
    }
  })
  if (response.rcrm.RC === mmrmResponseCode.value.C01.code) {
    authStore.updatePointAndCouponAmount()
    await router.push({
      name: 'redeemOk',
      params: { orderNumber: response.results.order_number },
      query: { code: route.query.code || '' }
    })
  } else if (response.rcrm.RC === mmrmResponseCode.value.INVALID_TOKEN.code) {
    redeemStatus.value = 'fail'
    rcCode.value = ''
    authStore.logout()
    redeemModal.value.toggle(false)
    commonStore.toggleRedeemPanel(false)
    commonStore.toggleReLoginModal(true)
  } else {
    redeemStatus.value = 'fail'
    rcCode.value = response.rcrm.RC
  }
  commonStore.setLoading(false)
}

const shareTicket = (val) => {
  sharePanel.value.toggle(val)
}

definePageMeta({
  middleware: ['cross'],
  name: 'activityDetail'
})

defineOptions({
  name: 'ActivityDetail'
})

useHead({
  title: () => pageData.value.activityInfo.title,
  meta: [
    { name: 'description', content: () => pageData.value.activityInfo.title }
  ]
})
</script>
