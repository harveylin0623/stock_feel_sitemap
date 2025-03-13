import sidebarIg from '@/assets/image/instagram-3.png'
import sidebarFacebook from '@/assets/image/facebook-3.png'
import sidebarLine from '@/assets/image/line-3.png'
import footerIg from '@/assets/image/instagram-2.png'
import footerLine from '@/assets/image/line-2.png'
import footerFacebook from '@/assets/image/facebook-2.png'

export const useSocialLink = () => {
  const socialLink = ref([
    {
      title: 'ig',
      link: process.env.SOCIAL_IG,
      sidebarImage: sidebarIg,
      footerImage: footerIg
    },
    {
      title: 'line',
      link: process.env.SOCIAL_LINE,
      sidebarImage: sidebarLine,
      footerImage: footerLine
    },
    {
      title: 'fb',
      link: process.env.SOCIAL_FB,
      sidebarImage: sidebarFacebook,
      footerImage: footerFacebook
    }
  ])

  return { socialLink }
}
