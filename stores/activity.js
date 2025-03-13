import { defineStore } from 'pinia'

export const useActivityStore = defineStore('activity', () => {
  const activityCode = ref('')
  const activityLists = ref([])
  const activityInfos = ref([])

  const activityTitle = computed(() => {
    const obj = activityLists.value.find(activity => activity.code === activityCode.value)
    return obj !== undefined ? obj.title : ''
  })

  const setActivityCode = (code) => {
    activityCode.value = code
  }

  const setActivityList = (lists) => {
    activityLists.value = lists
  }

  const setActivityInfos = (lists) => {
    activityInfos.value = lists.reduce((prev, current) => {
      prev.push({ ...current, activity_code: activityCode.value })
      return prev
    }, [])
  }

  return { activityCode, activityLists, activityInfos, activityTitle, setActivityCode, setActivityList, setActivityInfos }
})
