import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(() => {
  const ids = [1, 2, 3, 4, 5]
  return ids.map((id) => {
    return {
      loc: `/productDetail/${id}`,
      lastmod: new Date(),
      changefreq: 'daily'
    }
  })
})
