<template>
  <div class="mb-2 items-center space-y-4 sm:flex sm:space-y-0">
    <div class="relative">
      <client-only>
        <el-date-picker
          v-model="timeRange.start"
          class="custom"
          type="date"
          format="YYYY/MM/DD"
          :clearable="false"
          :editable="false"
          :disabled-date="disabledDate"
          :prefix-icon="CalendarIcon"
          popper-class="custom-popper"
          @visible-change="visibleChange1"
        />
      </client-only>
      <ChevronDownIcon
        class="absolute right-[10px] top-[15px] size-5"
        :class="{'-rotate-180':isRotate1}"
      />
    </div>
    <div class="mx-2 hidden h-px w-[32px] bg-gray-5 sm:block"></div>
    <div class="relative">
      <client-only>
        <el-date-picker
          v-model="timeRange.end"
          class="custom"
          type="date"
          format="YYYY/MM/DD"
          :clearable="false"
          :editable="false"
          :disabled-date="disabledDate"
          :prefix-icon="CalendarIcon"
          popper-class="custom-popper"
          @visible-change="visibleChange2"
        />
      </client-only>
      <ChevronDownIcon
        class="absolute right-[10px] top-[15px] size-5"
        :class="{'-rotate-180':isRotate2}"
      />
    </div>
    <BaseButton
      text="查詢訂單"
      class="btn-primary-1 sm sm:ml-5"
      @click="searchHandler"
    />
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useDayjs } from '@/composables/useDayjs.js'
import CalendarIcon from '@/components/OrderTimeRange/CalendarIcon.vue'

dayjs.extend(isSameOrBefore)

const { dateTimeFormat } = useDayjs()
const isRotate1 = ref(false)
const isRotate2 = ref(false)
const maxRangeMonth = 3
const timeRange = ref({
  start: dayjs().subtract(maxRangeMonth, 'month').toDate(),
  end: dayjs().toDate()
})

const emit = defineEmits(['search'])

const visibleChange1 = (value) => {
  isRotate1.value = value
}

const visibleChange2 = (value) => {
  isRotate2.value = value
}

const disabledDate = (time) => {
  const mintDate = dayjs().subtract(maxRangeMonth, 'month').subtract(1, 'day').valueOf()
  const criteria1 = time.getTime() > Date.now()
  const criteria2 = time.getTime() < mintDate
  return (criteria1 || criteria2)
}

const getCurrentTime = () => {
  return {
    start: dateTimeFormat(timeRange.value.start),
    end: dateTimeFormat(timeRange.value.end)
  }
}

const searchHandler = () => {
  const isBefore = dayjs(timeRange.value.start).isSameOrBefore(dayjs(timeRange.value.end), 'day')
  if (!isBefore) { return }
  const duration = getCurrentTime()
  emit('search', duration)
}

defineExpose({
  getCurrentTime
})

defineOptions({
  name: 'OrderTimeRange'
})
</script>
