<template>
  <div class="mb-8 border-t border-t-black pt-2 sm:hidden">
    <div class="mb-4 flex items-center">
      <Squares2X2Icon class="size-6" />
      <p class="ml-2">{{ $t('selectTicketCategory') }}</p>
    </div>
    <div class="mb-4 flex flex-wrap justify-between gap-x-2">
      <CategoryMobileItem
        v-for="category in categoryList"
        :key="category.code"
        :activity-code="activityStore.activityCode"
        :category="category"
        @change-category="changeCategory"
      />
    </div>
    <div
      v-if="showSeeMoreBlock"
      class="flex items-center justify-center text-gray-5"
      @click="showOtherData"
    >
      <p>{{ $t('seeMore') }}</p>
      <ChevronDownIcon
        class="size-5"
        :class="{'-rotate-180':seeMore}"
      />
    </div>
  </div>
</template>

<script setup>
import { Squares2X2Icon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useCommonStore } from '@/stores/common.js'
import { useActivityStore } from '@/stores/activity.js'
import CategoryMobileItem from '@/components/ActivityCategory/CategoryMobileItem.vue'
import { activityApi } from '@/api/activity.js'

const commonStore = useCommonStore()
const activityStore = useActivityStore()
const limitCount = ref(4)
const seeMore = ref(false)

const showSeeMoreBlock = computed(() => {
  return activityStore.activityLists.length > limitCount.value
})

const categoryList = computed(() => {
  let lists = []
  const categoryCount = activityStore.activityLists.length
  if (categoryCount <= 0) {
    return lists
  }
  if (categoryCount > limitCount.value && seeMore.value) {
    lists = activityStore.activityLists
  } else {
    lists = activityStore.activityLists.slice(0, limitCount.value)
  }
  return lists
})

const showOtherData = () => {
  seeMore.value = !seeMore.value
}

const changeCategory = async (payload) => {
  commonStore.setLoading(true)
  const { code } = payload
  const response = await activityApi.getActivityByCode({
    data: {
      code
    }
  })
  activityStore.setActivityCode(code)
  activityStore.setActivityInfos(response.results.coupon_activity_information || [])
  commonStore.setLoading(false)
}

defineOptions({
  name: 'ActivityCategoryMobile'
})
</script>
