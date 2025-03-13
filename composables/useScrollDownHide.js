export const useScrollDownHide = () => {
  const currentScrollTop = ref(0)
  const downScrollBaseline = ref(0)
  const scrollDownHide = ref(false)
  const waiting = ref(false)
  let timer = null

  const headerTopBorderStatus = computed(() => scrollDownHide.value ? 'border-b-0' : 'border-b')

  const menuHeightStatus = computed(() => scrollDownHide.value ? 'h-0' : 'h-[32px]')

  const displayMenu = () => {
    if (waiting.value) { return }
    const scrollY = window.scrollY
    const delta = 50
    currentScrollTop.value = scrollY
    clearTimeout(timer)
    if (downScrollBaseline.value < currentScrollTop.value && scrollY > 2 * (delta)) {
      waiting.value = true
      timer = setTimeout(() => {
        scrollDownHide.value = true
        waiting.value = false
      }, 200)
    } else if (downScrollBaseline.value > currentScrollTop.value && (downScrollBaseline.value - currentScrollTop.value >= 100)) {
      waiting.value = true
      timer = setTimeout(() => {
        scrollDownHide.value = false
        waiting.value = false
      }, 200)
    }
    downScrollBaseline.value = currentScrollTop.value
  }

  return { scrollDownHide, headerTopBorderStatus, menuHeightStatus, displayMenu }
}
