import { instance } from './axios'
import { debounce } from 'lodash-es'

const http = instance

export const add = (a: number, b: number) => {
  return a + b
}

export const transform = (str: string) => {
  return str + 'update'
}

debounce(() => {})

export default http
