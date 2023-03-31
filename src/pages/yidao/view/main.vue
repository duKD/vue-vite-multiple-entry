<template>
  <section class="main">main=====yidao===222222s{{ num }}===={{ bol }}</section>
</template>

<script lang="ts" setup>
import { random } from '@/utils/math'
import { isArray } from '../utils/common'
const num = random()

const bol = isArray([])
</script>

<style lang="less" scoped>
.main {
  background-color: aqua;
  background-image: url(@/assets/yidao/main.png);
}
</style>
