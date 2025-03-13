export const useRecommendSwiperPag = () => {
  const pagText = ref('')
  const couponRecommendBlock = ref(null)
  const swiperPagInfo = ref({
    current: 0,
    total: 0,
    isBeginning: false,
    isEnd: false
  })

  const setPagInfo = (payload) => {
    const { current, total } = payload
    pagText.value = `${current} / ${total}`
    swiperPagInfo.value = payload
  }

  const slideNext = () => {
    couponRecommendBlock.value.slideNext()
  }

  const slidePrev = () => {
    couponRecommendBlock.value.slidePrev()
  }

  return { pagText, couponRecommendBlock, swiperPagInfo, setPagInfo, slideNext, slidePrev }
}
