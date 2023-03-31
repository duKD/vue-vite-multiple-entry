import http from '@/utils/http'

export const getAge = () => {
  return http.get('/getAge')
}
