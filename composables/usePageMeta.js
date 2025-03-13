export const usePageMeta = () => {
  const { t } = useI18n()

  const homeMeta = ref({
    title: t('seo.pageTitle.home'),
    meta: [
      { name: 'description', content: '' }
    ]
  })

  const redeemOkMeta = ref({
    title: t('seo.pageTitle.redeemOk'),
    meta: [
      { name: 'description', content: '' }
    ]
  })

  const memberCenterMeta = ref({
    title: t('seo.pageTitle.memberCenter'),
    meta: [
      { name: 'description', content: '' }
    ]
  })

  const myCouponMeta = ref({
    title: t('seo.pageTitle.myCoupon'),
    meta: [
      { name: 'description', content: '' }
    ]
  })

  const redeemHistoryMeta = ref({
    title: t('seo.pageTitle.redeemHistory'),
    meta: [
      { name: 'description', content: '' }
    ]
  })

  const redeemHistoryDetailMeta = ref({
    title: t('seo.pageTitle.orderDetail'),
    meta: [
      { name: 'description', content: '' }
    ]
  })

  const oauthMeta = ref({
    title: t('seo.pageTitle.oauth'),
    meta: [
      { name: 'description', content: '' }
    ]
  })

  return { homeMeta, redeemOkMeta, memberCenterMeta, myCouponMeta, redeemHistoryMeta, redeemHistoryDetailMeta, oauthMeta }
}
