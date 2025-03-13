import QRious from 'qrious'
export const useSocilaJoin = () => {
  const socialType = ref('')
  const socialLink = ref('')
  const qrcodeUrl = ref('')

  const socialName = computed(() => {
    return socialType.value === 'fb' ? 'FB' : socialType.value === 'line' ? 'LINE@' : ''
  })

  const createQrcodeUrl = (value) => {
    const qr = new QRious({
      background: 'white',
      backgroundAlpha: 1,
      foreground: 'black',
      foregroundAlpha: 1,
      size: 250,
      value
    })
    return qr.toDataURL()
  }

  const setSocialInfo = (payload) => {
    socialType.value = payload.socialType
    socialLink.value = payload.url
    qrcodeUrl.value = createQrcodeUrl(payload.url)
  }

  const openSocialLink = () => {
    window.open(socialLink.value)
  }

  return { socialType, socialLink, qrcodeUrl, socialName, createQrcodeUrl, setSocialInfo, openSocialLink }
}
