import http from '@/utils/http'

export const getName = () => {
  return http.get('/getName')
}
