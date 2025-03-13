export const useFooterLink = () => {
  const { t } = useI18n()

  const footerLink = ref([
    {
      id: 1,
      title: t('footerLink.group.customerService'),
      isOpen: true,
      children: [
        {
          title: t('footerLink.help'),
          url: process.env.MMRM_EC_HELP
        },
        {
          title: t('footerLink.refundPolicy'),
          url: process.env.MMRM_EC_REFUNDTERMS
        },
        {
          title: t('missionCenter'),
          url: process.env.MISSION_CENTER
        },
        {
          title: t('footerLink.redemptionCenter'),
          url: process.env.REDEEM_CENTER
        },
        {
          title: t('pointCenter'),
          url: process.env.POINT_CENTER
        }
      ]
    },
    {
      id: 2,
      title: t('footerLink.group.aboutLemonMall'),
      isOpen: false,
      children: [
        {
          title: t('footerLink.brandIntro'),
          url: process.env.MMRM_EC_BRANDINTRODUCTION
        },
        {
          title: t('footerLink.contactUs'),
          url: process.env.MMRM_EC_CONTACTUS
        },
        {
          title: t('footerLink.privacyPolicy'),
          url: process.env.MMRM_EC_PRIVACYTERMS
        },
        {
          title: t('footerLink.memberTermsService'),
          url: process.env.MMRM_EC_MEMBERTERMS
        }
      ]
    },
    {
      id: 3,
      title: t('footerLink.group.ganganGroup'),
      isOpen: false,
      children: [
        {
          title: t('footerLink.stockfeel'),
          url: process.env.STOCK_FEEL
        },
        {
          title: t('footerLink.cashFeel'),
          url: process.env.CASHFEEL
        },
        {
          title: t('footerLink.insFeel'),
          url: process.env.INSFEEL
        },
        {
          title: t('footerLink.houseFeel'),
          url: process.env.HOUSEFEEL
        }
      ]
    }
  ])

  return { footerLink }
}
