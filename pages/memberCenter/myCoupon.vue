<template>
  <div>
    <Breadcrumb :breadcrumb-list="breadcrumbList" />
    <h1>{{ $t('seo.pageTitle.myCoupon') }}</h1>
    <div class="mb-8 flex items-center sm:mb-10">
      <CouponStatusTab
        v-for="tab in couponTabList"
        :key="tab.type"
        :tab-info="tab"
        :current-coupon-type="currentCouponType"
        @change-tab-type="changeTabType"
      />
    </div>
    <div>
      <div v-show="currentCouponType === couponTypeInfo.valid.code">
        <div class="space-y-6">
          <UserOwnCoupon
            v-for="coupon in couponBox[couponTypeInfo.valid.code].data"
            :key="coupon.my_coupon_id"
            :coupon-info="coupon"
          />
        </div>
        <BaseButton
          v-show="showValidSeeMoreButton"
          class="btn-primary-1 mx-auto mt-6 w-[200px]"
          :text="seeMoreButtonText"
          @click="seeMore(couponTypeInfo.valid.code)"
        />
      </div>
      <div v-show="currentCouponType === couponTypeInfo.invalid.code">
        <div class="space-y-6">
          <UserOwnCoupon
            v-for="coupon in couponBox[couponTypeInfo.invalid.code].data"
            :key="coupon.my_coupon_id"
            :coupon-info="coupon"
          />
        </div>
        <BaseButton
          v-show="showInvalidSeeMoreButton"
          class="btn-primary-1 mx-auto mt-6 w-[200px]"
          :text="seeMoreButtonText"
          @click="seeMore(couponTypeInfo.invalid.code)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/stores/common.js'
import { usePageMeta } from '@/composables/usePageMeta.js'
import { useCouponInfo } from '@/composables/useCouponInfo.js'
import { useBreadcrumb } from '@/composables/useBreadcrumb.js'
import { useMmrmResponseCode } from '@/composables/useMmrmResponseCode.js'
import { couponApi } from '@/api/coupon.js'
import CouponStatusTab from '@/components/CouponStatusTab/index.vue'
import UserOwnCoupon from '@/components/UserOwnCoupon/index.vue'

const { t } = useI18n()
const route = useRoute()
const commonStore = useCommonStore()
const { myCouponMeta } = usePageMeta()
const { couponTypeInfo } = useCouponInfo()
const { breadcrumbList } = useBreadcrumb([
  { title: t('seo.pageTitle.home'), path: '/' },
  { title: t('seo.pageTitle.memberCenter'), path: '/memberCenter' },
  { title: t('seo.pageTitle.myCoupon'), path: '/memberCenter/myCoupon' }
])
const { mmrmResponseCode } = useMmrmResponseCode()
const disableTabClick = ref(false)
const currentCouponType = ref('')
const couponTabList = ref([
  { title: t('couponUsage.available'), type: couponTypeInfo.value.valid.code },
  { title: t('couponUsage.redeemedAndExpired'), type: couponTypeInfo.value.invalid.code }
])
const couponBox = ref({
  [couponTypeInfo.value.valid.code]: {
    isGetData: false,
    data: [],
    offset: 0
  },
  [couponTypeInfo.value.invalid.code]: {
    isGetData: false,
    data: [],
    offset: 0
  }
})

const showValidSeeMoreButton = computed(() => {
  const criteria1 = couponBox.value[couponTypeInfo.value.valid.code].offset !== null
  const criteria2 = couponBox.value[couponTypeInfo.value.valid.code].isGetData === true
  return criteria1 && criteria2
})

const showInvalidSeeMoreButton = computed(() => {
  const criteria1 = couponBox.value[couponTypeInfo.value.invalid.code].offset !== null
  const criteria2 = couponBox.value[couponTypeInfo.value.invalid.code].isGetData === true
  return criteria1 && criteria2
})

const seeMoreButtonText = computed(() => disableTabClick.value ? t('loading') : t('seeMore'))

const createCouponList = (myCouponList, couponInfo) => {
  return myCouponList.reduce((prev, current) => {
    const obj = couponInfo.find(coupon => coupon.coupon_id === current.coupon_id)
    prev.push({ ...obj, ...current }) // 兩個都有duratoin欄位,使用my_coupon_list
    return prev
  }, [])
}

const getCouponData = async (couponType, isConcat = false) => {
  disableTabClick.value = true
  const listRes = await couponApi.myCouponList({
    data: {
      type: couponType,
      offset: couponBox.value[couponType].offset
    }
  })
  if (listRes.rcrm.RC !== mmrmResponseCode.value.C01.code) {
    commonStore.toggleReLoginModal(true)
    return
  }
  const myCouponList = listRes.results.my_coupon_list
  if (myCouponList.length !== 0) {
    const couponIds = Array.from(new Set(myCouponList.map(coupon => coupon.coupon_id)))
    const infoRes = await couponApi.info({
      data: {
        coupon_ids: couponIds,
        full_info: true
      }
    })
    const myList = createCouponList(myCouponList, infoRes.results.coupon_information)
    if (isConcat) {
      couponBox.value[couponType].data = couponBox.value[couponType].data.concat(myList)
    } else {
      couponBox.value[couponType].data = myList
    }
  }
  couponBox.value[couponType].isGetData = true
  couponBox.value[couponType].offset = listRes.next
  disableTabClick.value = false
}

const changeTabType = async (couponType) => {
  if (disableTabClick.value) { return }
  commonStore.setLoading(true)
  currentCouponType.value = couponType
  if (!couponBox.value[couponType].isGetData) {
    await getCouponData(couponType)
  }
  commonStore.setLoading(false)
}

const seeMore = async (couponType) => {
  if (disableTabClick.value) { return }
  await getCouponData(couponType, true)
}

const getInitCouponType = () => {
  const queryType = route.query.couponType
  const obj = couponBox.value[queryType]
  return obj !== undefined ? queryType : couponTypeInfo.value.valid.code
}

onMounted(async () => {
  commonStore.setLoading(true)
  currentCouponType.value = getInitCouponType()
  await getCouponData(currentCouponType.value)
  commonStore.setLoading(false)
})

definePageMeta({
  middleware: ['cross', 'auth'],
  name: 'myCoupon',
  isAuth: true
})

defineOptions({
  name: 'MyCoupon'
})

useHead(myCouponMeta)
</script>
