export const useActivityStatus = () => {
  const defaultActivityImage = ref('https://fakeimg.pl/800x800?text=+')

  const activityMappingStatus = ref({
    unopened: {
      title: '尚未開始',
      code: 'unopened'
    },
    opening: {
      title: '已開始',
      code: 'opening'
    },
    closed: {
      title: '已結束',
      code: 'closed'
    }
  })

  return { defaultActivityImage, activityMappingStatus }
}
