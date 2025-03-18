import axios from 'axios'
import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
  const ids = []
  const response = await axios({
    url: 'https://randomuser.me/api/?results=10',
    method: 'get'
  })

  response.data.results.forEach((user) => {
    ids.push(user.location.street.number)
  })

  console.log(ids)

  return ids.map((id) => {
    return {
      loc: `/productDetail/${id}`,
      lastmod: new Date(),
      changefreq: 'daily'
    }
  })
})
