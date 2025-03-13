import { baseAxios } from './baseAxios.js'
export const cmsApi = {
  headerMenu (payload = {}) {
    return baseAxios({
      url: '/scenes',
      method: 'post',
      ...payload
    })
  },
  searchCmsListItem (payload = {}) {
    return baseAxios({
      url: '/cms/search_cms_list_item',
      method: 'post',
      ...payload
    })
  }
}
