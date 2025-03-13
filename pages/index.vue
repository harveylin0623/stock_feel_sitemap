<template>
  <div>
    <div class="mb-8 pt-8 sm:pt-10">
      <div class="container px-0 device1:px-4">
        <BannerBlock :banner-list="pageData.bannerList" />
      </div>
    </div>
    <ImageMarquee />
    <VivusPath1 />
    <div class="mb-20 sm:mb-[120px]">
      <div class="container">
        <div class="flex">
          <div class="hidden shrink-0 grow-0 sm:block sm:w-[250px] sm:pr-[30px] lg:w-[300px] lg:pr-[50px]">
            <ActivityCategory />
          </div>
          <div class="w-full sm:w-[calc(100%-250px)] lg:w-[calc(100%-300px)]">
            <Breadcrumb :breadcrumb-list="breadcrumbList" />
            <ActivityCategoryMobile />
            <FeatureDesc
              :desc1="activityStore.activityTitle"
              desc2="Joint Vouchers"
              :desc3="$t('sectionTitle.recommendVariousCoupon')"
            />
            <div class="flex flex-wrap gap-x-4 gap-y-8 device1:gap-x-[24px] device1:gap-y-[40px]">
              <RedeemCoupon
                v-for="activityInfo in activityStore.activityInfos"
                :key="activityInfo.coupon_activity_id"
                :activity-info="activityInfo"
                class="w-[calc((100%-16px)/2)] device1:w-[calc((100%-24px*2)/3)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-20 sm:mb-[120px]">
      <div class="container">
        <FeatureDesc
          :desc1="$t('hotSellingCoupon')"
          desc2="Popular Vouchers"
          :desc3="$t('sectionTitle.everyoneIsRushing')"
        />
        <div class="flex flex-wrap gap-x-4 gap-y-8 device1:gap-x-[24px] device1:gap-y-[40px]">
          <RedeemCoupon
            v-for="activityInfo in pageData.hotActivityList"
            :key="activityInfo.coupon_activity_id"
            :activity-info="activityInfo"
            class="w-[calc((100%-16px)/2)] device1:w-[calc((100%-24px*2)/3)] sm:w-[calc((100%-24px*3)/4)]"
          />
        </div>
      </div>
    </div>
    <HowToBlock class="device1:bg-pc-howto" />
    <div class="mb-[60px] sm:mb-[120px]">
      <div class="container">
        <div class="mb-8 flex items-center justify-between border-t border-t-black pt-2 device1:mb-10">
          <FeatureDesc
            :desc1="$t('articleRecommend')"
            desc2="Article recommendation"
            :desc3="$t('sectionTitle.recommendedForYouKnowledge')"
            :has-border="false"
          />
          <p class="shrink-0 grow-0 self-end whitespace-nowrap pl-3 device1:text-lg">{{ swiperPagText }}</p>
        </div>
        <ArticleBlock v-model="swiperPagText" />
      </div>
    </div>
  </div>
</template>

<script setup>
import _ from 'lodash'
import { useActivityStore } from '@/stores/activity.js'
import { usePageMeta } from '@/composables/usePageMeta.js'
import { useBreadcrumb } from '@/composables/useBreadcrumb.js'
import { cmsApi } from '@/api/cms.js'
import { activityApi } from '@/api/activity.js'
import BannerBlock from '@/components/BannerBlock/index.vue'
import ActivityCategory from '@/components/ActivityCategory/index.vue'
import ActivityCategoryMobile from '@/components/ActivityCategory/mobile.vue'
import RedeemCoupon from '@/components/RedeemCoupon/index.vue'
import HowToBlock from '@/components/HowToBlock/index.vue'
import ArticleBlock from '@/components/ArticleBlock/index.vue'
import VivusPath1 from '@/components/VivusPath1/index.vue'
import ImageMarquee from '@/components/ImageMarquee/index.vue'

const { t } = useI18n()
const activityStore = useActivityStore()
const { homeMeta } = usePageMeta()
const { breadcrumbList } = useBreadcrumb([
  { title: t('seo.pageTitle.home'), path: '/' },
  { title: t('seo.pageTitle.ticketCenter'), path: '/' }
])
const swiperPagText = ref('')

const setDefaultActivity = async (activityLists) => {
  if (activityLists.length <= 0) { return }
  const { code } = activityLists[0]
  const response = await activityApi.getActivityByCode({
    data: {
      code
    }
  })
  activityStore.setActivityCode(code)
  activityStore.setActivityInfos(response.results.coupon_activity_information || [])
}

const createHotActivityList = (payload) => {
  let arr = []
  const isEmpty = _.isEmpty(payload.value.results)
  if (isEmpty) {
    return arr
  } else {
    arr = payload.value.results.coupon_activity_information.reduce((prev, current) => {
      prev.push({ ...current, activity_code: 'hot' })
      return prev
    }, [])
  }
  return arr
}

const { data: pageData } = await useAsyncData('homeData', async () => {
  const [activityRes, hotRes, bannerRes] = await Promise.allSettled([
    activityApi.category(),
    activityApi.hotActivity(),
    cmsApi.searchCmsListItem({ data: { type: 'home_ad' } })
  ])
  const activityLists = activityRes.value.results
  activityStore.setActivityList(activityLists)
  await setDefaultActivity(activityLists)
  const hotActivityList = createHotActivityList(hotRes)
  const bannerList = bannerRes.value.results.search_cms_list_item_results

  return {
    hotActivityList,
    bannerList
  }
})

definePageMeta({
  middleware: ['cross'],
  name: 'home'
})

defineOptions({
  name: 'Home'
})

useHead(homeMeta)
</script>
