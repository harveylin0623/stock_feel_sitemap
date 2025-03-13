export const useCouponInfo = () => {
  const { t } = useI18n()
  const defaultCouponImage = ref('https://fakeimg.pl/120x120?text=+')

  const couponTypeInfo = ref({
    valid: {
      title: t('couponType.valid'),
      code: 'valid'
    },
    invalid: {
      title: t('couponType.invalid'),
      code: 'invalid'
    },
    transferred: {
      title: t('couponType.transferred'),
      code: 'transferred'
    }
  })

  const couponUsageInfo = ref({
    notyet: {
      title: t('couponUsage.notyet'),
      code: 'notyet',
      textColor: 'text-black',
      bgColor: 'bg-primary-1'
    },
    available: {
      title: t('couponUsage.available'),
      code: 'available',
      textColor: 'text-secondary-2',
      bgColor: 'bg-primary-1'
    },
    expired: {
      title: t('couponUsage.expired'),
      code: 'expired',
      textColor: 'text-gray-2',
      bgColor: 'bg-gray-6'
    },
    obsolete: {
      title: t('couponUsage.obsolete'),
      code: 'obsolete',
      textColor: 'text-used',
      bgColor: 'bg-primary-1'
    },
    redeemed: {
      title: t('couponUsage.redeemed'),
      code: 'redeemed',
      textColor: 'text-used',
      bgColor: 'bg-primary-1'
    },
    transferred: {
      title: t('couponUsage.transferred'),
      code: 'transferred',
      textColor: 'text-used',
      bgColor: 'bg-primary-1'
    }
  })

  return { defaultCouponImage, couponTypeInfo, couponUsageInfo }
}
