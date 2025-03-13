<template>
  <div class="sticky top-[calc(var(--header-height)+40px)] border-t border-t-black pt-4">
    <h3 class="mb-4">{{ $t('couponCategory') }}</h3>
    <ul class="space-y-2">
      <CategoryItem
        v-for="category in activityStore.activityLists"
        :key="category.code"
        :category="category"
        :activity-code="activityStore.activityCode"
        @change-category="changeCategory"
      />
    </ul>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/stores/common.js'
import { useActivityStore } from '@/stores/activity.js'
import { activityApi } from '@/api/activity.js'
import CategoryItem from '@/components/ActivityCategory/CategoryItem.vue'

const commonStore = useCommonStore()
const activityStore = useActivityStore()

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
  name: 'ActivityCategory'
})
</script>
