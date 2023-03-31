import { instance } from './axios'
import { throttle } from 'lodash-es'

// export const http2 = instance

export const random = () => Math.random()

export const throttle_fn = (fn: Function) => throttle(fn)

// throttle_fn(()=>{})
