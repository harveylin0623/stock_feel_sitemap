import center from '@/assets/image/memberCenter/center.png'
import setting from '@/assets/image/memberCenter/setting.png'
import mission from '@/assets/image/memberCenter/mission.png'
import level from '@/assets/image/memberCenter/level.png'
import point from '@/assets/image/memberCenter/point.png'
import order from '@/assets/image/memberCenter/order.png'
import exchange from '@/assets/image/memberCenter/exchange.png'
import exchangeActive from '@/assets/image/memberCenter/exchange-active.png'
import ticket from '@/assets/image/memberCenter/ticket.png'
import ticketActive from '@/assets/image/memberCenter/ticket-active.png'

import dropdownSetting from '@/assets/image/memberDoprdown/setting.png'
import dropdownLevel from '@/assets/image/memberDoprdown/level.png'
import dropdownPoint from '@/assets/image/memberDoprdown/point.png'
import dropdownMission from '@/assets/image/memberDoprdown/mission.png'
import dropdownOrder from '@/assets/image/memberDoprdown/order.png'

export const useMemberMenuList = () => {
  const { t } = useI18n()

  const memberMenuList = ref([
    {
      id: 1,
      title: t('seo.pageTitle.memberCenter'),
      url: process.env.MEMBER_CENTER,
      external: true,
      image: center,
      activeImage: center,
      dropdownImage: '',
      routeName: ['']
    },
    {
      id: 2,
      title: t('accountSetting'),
      url: process.env.ACCOUNT_SETTING,
      external: true,
      image: setting,
      activeImage: setting,
      dropdownImage: dropdownSetting,
      routeName: ['']
    },
    {
      id: 3,
      title: t('missionCenter'),
      url: process.env.MISSION_CENTER,
      external: true,
      image: mission,
      activeImage: mission,
      dropdownImage: dropdownMission,
      routeName: ['']
    },
    {
      id: 4,
      title: t('tierBenefits'),
      url: process.env.MEMBER_LEVEL,
      external: true,
      image: level,
      activeImage: level,
      dropdownImage: dropdownLevel,
      routeName: ['']
    },
    {
      id: 5,
      title: t('pointCenter'),
      url: process.env.POINT_CENTER,
      external: true,
      image: point,
      activeImage: point,
      dropdownImage: dropdownPoint,
      routeName: ['']
    },
    {
      id: 6,
      title: t('historyOrder'),
      url: process.env.MMRM_EC_ORDER_HISTORY,
      external: true,
      image: order,
      activeImage: order,
      dropdownImage: dropdownOrder,
      routeName: ['']
    },
    {
      id: 7,
      title: t('seo.pageTitle.redeemHistory'),
      url: '/memberCenter/redeemHistory',
      external: false,
      image: exchange,
      activeImage: exchangeActive,
      dropdownImage: '',
      routeName: ['redeemHistory', 'redeemHistoryDetail']
    },
    {
      id: 8,
      title: t('seo.pageTitle.myCoupon'),
      url: '/memberCenter/myCoupon',
      external: false,
      image: ticket,
      activeImage: ticketActive,
      dropdownImage: '',
      routeName: ['myCoupon']
    }
  ])

  return { memberMenuList }
}
