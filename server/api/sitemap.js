import axios from 'axios'
import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
  const ids = []
  const outsideUrl = [
    'https://mmrm-ec-frontend.stockfeel.dev/brandIntroduction',
    'https://mmrm-ec-frontend.stockfeel.dev/contactUs',
    'https://mmrm-ec-frontend.stockfeel.dev/terms/privacyTerms',
    'https://mmrm-ec-frontend.stockfeel.dev/terms/memberTerms',
    'https://www.lemongrocery.com.tw/help',
    'https://www.stockfeel.com.tw/mission/',
    'https://www.stockfeel.com.tw/member/redeem',
    'https://www.stockfeel.com.tw/member/point',
    'https://www.stockfeel.com.tw/',
    'https://www.cashfeel.com.tw/',
    'https://www.insfeel.com.tw/',
    'https://www.housefeel.com.tw/'
  ]

  const response = await axios({
    url: 'https://randomuser.me/api/?results=10',
    method: 'get'
  })

  response.data.results.forEach((user) => {
    ids.push(user.location.street.number)
  })

  const productDetailSitemap = ids.map((id) => {
    return {
      loc: `/productDetail/${id}`,
      lastmod: new Date(),
      changefreq: 'daily'
    }
  })

  const outsideSieMap = outsideUrl.map((url) => {
    return {
      loc: url,
      lastmod: new Date(),
      changefreq: 'daily'
    }
  })

  const result = outsideSieMap.concat(productDetailSitemap)
  console.log(result)

  return result
})
