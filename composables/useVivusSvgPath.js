import Vivus from 'vivus'
import arrowLine1 from '@/assets/image/arrow_line_1.svg'
import arrowLine2 from '@/assets/image/arrow_line_2.svg'

export const useVivusSvgPath = (options) => {
  const { pathId, svgKey, rootMargin } = options
  const elPoint = ref(null)
  const vivusObj = ref(null)
  const mappingSvgUrl = ref({
    one: arrowLine1,
    two: arrowLine2
  })

  const observeHandler = () => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target)
          vivusObj.value.play()
        }
      })
    }, {
      threshold: 0.5,
      rootMargin
    })
    observer.observe(elPoint.value)
  }

  const runPathAnimate = () => {
    vivusObj.value = new Vivus(pathId, {
      file: mappingSvgUrl.value[svgKey],
      type: 'oneByOne',
      duration: 35,
      start: 'manual',
      animTimingFunction: Vivus.EASE_IN,
      onReady () {
        observeHandler()
      }
    })
  }

  onMounted(() => {
    runPathAnimate()
  })

  return { elPoint }
}
