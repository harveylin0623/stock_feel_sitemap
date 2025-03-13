import dayjs from 'dayjs'
import { useAxios } from './config.js'
import { useAuthStore } from '@/stores/auth.js'

export const baseAxios = (options) => {
  const authStore = useAuthStore()
  const { data, ...other } = options
  const requestParameter = data === undefined ? {} : data
  const requestSchema = {
    member_access_token: authStore.getAuthCookie() || '',
    request_parameter: {
      ...requestParameter
    },
    timestamp: dayjs().format('YYYY/MM/DD HH:mm:ss')
  }

  return useAxios({ ...other, data: requestSchema }).then(res => res.data)
}
