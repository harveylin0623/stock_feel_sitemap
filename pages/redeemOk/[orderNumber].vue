<template>
  <div class="pt-8 sm:pt-10">
    <div class="mb-10">
      <div class="container space-y-4 sm:space-y-5">
        <img
          src="@/assets/image/successful.png"
          class="mx-auto size-[160px] sm:size-[200px]"
          alt=""
        />
        <p class="text-center text-xl font-medium sm:text-[28px]">{{ $t('redemptionComplete') }}</p>
        <p class="text-center">{{ $t('thankYouForCompletingRedemption') }}：</p>
      </div>
    </div>
    <div class="mb-20 sm:mb-[120px]">
      <div class="container">
        <div class="mb-10 border border-black">
          <div class="bg-primary-1 p-4 text-center text-xl">{{ $t('redemptionDetails') }}</div>
          <div class="p-5 sm:p-10">
            <div class="items-start sm:flex">
              <div class="mx-auto size-[180px] shrink-0 grow-0 device2:size-[200px]">
                <img
                  :src="activityImage"
                  class="size-full"
                  alt=""
                />
              </div>
              <div class="shrink grow pt-5 sm:pl-10 sm:pt-0">
                <div
                  class="mb-4 items-start justify-between sm:flex"
                  :class="{'sm:mb-4':thanOneProductCoupon}"
                >
                  <div class="mb-5 text-center sm:mb-0 sm:text-left">
                    <p
                      v-show="false"
                      class="mb-2 text-gray-3"
                    >
                      O.A Beaute
                    </p>
                    <p class="text-xl font-medium">{{ activityTitle }}</p>
                  </div>
                  <a
                    v-if="!thanOneProductCoupon && !isDonateActivity"
                    :href="redeemUrl"
                    target="_blank"
                    class="h-12 w-full shrink-0 grow-0 rounded bg-primary-1 text-center leading-[48px] sm:h-[56px] sm:w-[120px] sm:leading-[56px]"
                  >{{ $t('displayBarcode') }}</a>
                </div>
                <div class="space-y-4">
                  <div class="flex items-center">
                    <div class="flex w-[115px] shrink-0 grow-0 items-center">
                      <ShoppingCartImage />
                      <p class="ml-2 text-gray-5">{{ $t('redemptionTime') }}：</p>
                    </div>
                    <div class="shrink grow text-gray-5">{{ redeemTime }}</div>
                  </div>
                  <div class="flex items-center">
                    <div class="flex w-[115px] shrink-0 grow-0 items-center">
                      <PayImage />
                      <p class="ml-2 text-gray-5">{{ $t('paymentMethod') }}：</p>
                    </div>
                    <div class="shrink grow text-gray-5">{{ usedPoint }} {{ $t('lemonCoin') }}</div>
                  </div>
                  <div
                    v-if="!thanOneProductCoupon && !isDonateActivity"
                    class="flex items-center"
                  >
                    <div class="flex w-[115px] shrink-0 grow-0 items-center">
                      <DateImage />
                      <p class="ml-2 text-gray-5">{{ $t('timeOfUse') }}：</p>
                    </div>
                    <div class="shrink grow text-gray-5">{{ activityDuration }}</div>
                  </div>
                  <div
                    v-if="!thanOneProductCoupon && !isDonateActivity"
                    class="flex items-center"
                  >
                    <div class="flex w-[115px] shrink-0 grow-0 items-center">
                      <InformationCircleIcon class="size-6" />
                      <p class="ml-2 text-gray-5">{{ $t('instructionsForUse2') }}：</p>
                    </div>
                    <div class="shrink grow text-gray-5">
                      <a
                        :href="redeemUrl"
                        target="_blnak"
                        class="break-all text-secondary-1 underline"
                      >{{ redeemUrl }}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="thanOneProductCoupon && !isDonateActivity"
              class="mt-10 sm:pl-60"
            >
              <div class="mb-5 flex justify-between border-b border-b-black pb-1">
                <p>{{ $t('thisItemIncludesFollowingCoupon') }}</p>
                <ChevronUpIcon
                  class="size-6 cursor-pointer"
                  :class="{'rotate-180': showProductCoupon}"
                  @click="toggleProductCoupon"
                />
              </div>
              <div
                v-show="showProductCoupon"
                class="divide-y divide-gray-7"
              >
                <ProductCoupon
                  v-for="coupon in myCoupons"
                  :key="coupon.my_coupon_id"
                  :coupon-info="coupon"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-5 sm:flex sm:justify-center sm:space-x-5 sm:space-y-0">
          <BaseButton
            :text="$t('continueToRedeem')"
            class="btn-outline-gray-2 sm:w-60"
            @click="redirectHandler({ type: redirectType.home, path: '/' })"
          />
          <BaseButton
            :text="$t('viewCoupon')"
            class="btn-primary-1 sm:w-60"
            :right-icon-url="buttonIcon.arrowBtn"
            @click="redirectHandler({ type: redirectType.myCoupon, path: '/memberCenter/myCoupon' })"
          />
        </div>
      </div>
    </div>
    <div
      id="follow-us-marquee"
      class="bg-flow-us bg-[length:auto_80px] bg-repeat-x pb-20 sm:pb-[120px]"
    >
      <div class="container">
        <FeatureDesc
          :desc1="$t('followUs')"
          desc2="Follow us"
        />
        <JoinOurBlock @join="joinHandler" />
      </div>
    </div>
    <HowToBlock
      class="device1:bg-rectangle"
      sort-type="desc"
      :has-svg-animate="false"
    />
    <div class="mb-20 sm:mb-[120px]">
      <div class="container">
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
          :recommend-list="recommendList"
        />
        <div
          v-if="showRecommendBlock"
          class="flex flex-wrap gap-x-4 gap-y-8 sm:hidden"
        >
          <RedeemCoupon
            v-for="activity in recommendList"
            :key="activity.coupon_activity_id"
            :activity-info="activity"
            class="w-[calc((100%-16px)/2)]"
          />
        </div>
      </div>
    </div>
    <SocialJoinModal
      ref="socialJoinModal"
      :line-url="lineUrl"
    />
    <SocialJoinPanel
      ref="socialJoinPanel"
      :line-url="lineUrl"
    />
  </div>
</template>

<script setup>
import _ from 'lodash'
import { InformationCircleIcon, ChevronUpIcon } from '@heroicons/vue/24/outline'
import { useCommonStore } from '@/stores/common.js'
import { useAuthStore } from '@/stores/auth.js'
import { usePageMeta } from '@/composables/usePageMeta.js'
import { useButtonIcon } from '@/composables/useButtonIcon.js'
import { useMmrmResponseCode } from '@/composables/useMmrmResponseCode.js'
import { useActivityStatus } from '@/composables/useActivityStatus.js'
import { useScreensWidth } from '@/composables/useScreensWidth.js'
import { useDonateActivity } from '@/composables/useDonateActivity.js'
import { useCouponInfo } from '@/composables/useCouponInfo.js'
import { couponApi } from '@/api/coupon.js'
import { activityApi } from '@/api/activity.js'
import { wmAes } from '@/utilities/crypto.js'
import ProductCoupon from '@/components/ProductCoupon/index.vue'
import JoinOurBlock from '@/components/JoinOurBlock/index.vue'
import SocialJoinModal from '@/components/Modal/SocialJoinModal.vue'
import SocialJoinPanel from '@/components/SocialJoinPanel/index.vue'
import HowToBlock from '@/components/HowToBlock/index.vue'
import CouponRecommendBlock from '@/components/CouponRecommendBlock/index.vue'
import RedeemCoupon from '@/components/RedeemCoupon/index.vue'

const route = useRoute()
const router = useRouter()
const commonStore = useCommonStore()
const authStore = useAuthStore()
const { redeemOkMeta } = usePageMeta()
const { buttonIcon } = useButtonIcon()
const { mmrmResponseCode } = useMmrmResponseCode()
const { defaultActivityImage } = useActivityStatus()
const { screensWidth } = useScreensWidth()
const { isDonateActivity, checkIsDonateActivity } = useDonateActivity()
const { couponTypeInfo } = useCouponInfo()
const couponActivity = ref({})
const myCoupons = ref([])
const recommendList = ref([])
const showProductCoupon = ref(true)
const socialJoinModal = ref(null)
const socialJoinPanel = ref(null)
const redeemTime = ref('')
const lineUrl = ref('https://lin.ee/eXSgiXJ')
const swiperPagText = ref('')
const redirectType = ref({
  home: 'home',
  myCoupon: 'myCoupon'
})

const hasCouponActivity = computed(() => !_.isEmpty(couponActivity.value))

const activityTitle = computed(() => hasCouponActivity.value ? couponActivity.value.information.title : '')

const thanOneProductCoupon = computed(() => myCoupons.value.length > 1)

const showRecommendBlock = computed(() => recommendList.value.length > 0)

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

const activityDuration = computed(() => {
  let text = ''
  if (hasCouponActivity.value && myCoupons.value.length === 1) {
    text = myCoupons.value[0].duration
  }
  return text
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

const redeemUrl = computed(() => {
  let url = ''
  if (myCoupons.value.length > 0) {
    url = myCoupons.value[0].redeem_url
  }
  return url
})

const toggleProductCoupon = () => {
  showProductCoupon.value = !showProductCoupon.value
}

const joinHandler = () => {
  if (window.innerWidth >= screensWidth.value.sm) {
    socialJoinModal.value.toggle(true)
  } else {
    socialJoinPanel.value.toggle(true)
  }
}

const redirectHandler = (payload) => {
  const { type, path } = payload
  if (type === redirectType.value.home) {
    router.push(path)
  } else if (type === redirectType.value.myCoupon) {
    const routeConfig = { path }
    if (isDonateActivity.value) {
      routeConfig.query = {
        couponType: couponTypeInfo.value.invalid.code
      }
    }
    router.push(routeConfig)
  }
}

const writeOffCoupon = async (brandCode, storeCode, myCouponId) => {
  const myCouponDetailRes = await couponApi.myCouponDetail({
    data: {
      my_coupon_id: myCouponId
    }
  })
  const payload = {
    member_identity: {
      type: 'memberno',
      identity: wmAes(authStore.userInfo.memberNumber)
    },
    coupon_no: myCouponDetailRes.results.my_coupon_detail.coupon_no,
    transaction_type: 'normal',
    brand_code: brandCode,
    store_code: storeCode,
    source_uuid: 'EC',
    quantity: 1
  }
  await couponApi.serverSideCouponRedeem({ data: payload })
}

const processOrderRes = async (orderRes) => {
  let orderStatus = false
  if (orderRes.value.rcrm.RC === mmrmResponseCode.value.C01.code) {
    const { created_at, coupon_activity, my_coupons } = orderRes.value.results
    const { isVerify, isDonate, brandCode, storeCode } = checkIsDonateActivity(my_coupons, true)
    redeemTime.value = created_at
    couponActivity.value = coupon_activity
    myCoupons.value = my_coupons
    isDonateActivity.value = isDonate
    if (isVerify) {
      await writeOffCoupon(brandCode, storeCode, my_coupons[0].my_coupon_id)
    }
    orderStatus = true
  } else {
    commonStore.toggleReLoginModal(true)
    orderStatus = false
  }
  return {
    orderStatus
  }
}

const init = async () => {
  const [orderRes, recommendRes] = await Promise.allSettled([
    couponApi.redeemRecord({
      data: {
        order_num: route.params.orderNumber || ''
      }
    }),
    activityApi.getActivityByCode({
      data: { code: route.query.code || '' }
    })
  ])
  const { orderStatus } = await processOrderRes(orderRes)
  if (!orderStatus) { return }
  if (recommendRes.value.rcrm.RC === mmrmResponseCode.value.C01.code) {
    if (!_.isEmpty(recommendRes.value.results)) {
      recommendList.value = recommendRes.value.results.coupon_activity_information
      recommendList.value.forEach((item) => {
        item.activity_code = route.query.code
      })
    }
  }
}

onMounted(async () => {
  commonStore.setLoading(true)
  await init()
  commonStore.setLoading(false)
})

definePageMeta({
  middleware: ['cross', 'auth'],
  name: 'redeemOk',
  isAuth: true
})

defineOptions({
  name: 'RedeemOk'
})

useHead(redeemOkMeta)
</script>

<style lang="scss">
#follow-us-marquee {
  background-position-x: 0px;
  background-position-y: center;
  animation-name: run;
  animation-duration: 50s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes run {
  0% {
    background-position-x: 0px;
  }
  100% {
    background-position-x: -2880px;
  }
}
</style>
