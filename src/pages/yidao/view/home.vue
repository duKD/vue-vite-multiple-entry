<template>
  <section class="home">
    home=====yidao==={{ count }}==={{ str }}==={{ num }}==={{ getTime() }}
  </section>
</template>

<script lang="ts" setup>
import { add, transform } from '@/utils/http'
import { random, throttle_fn } from '@/utils/math'
import { getTime } from '../utils/common'

const count = add(1, 4)
const str = transform('123456789')

const num = random()

// throttle_fn(()=>{

// })
</script>

<style>
.home {
  background-image: url(@/assets/main.png);
}
</style>
