<template>
  <section class="home">home=====index==={{ count }}</section>
</template>

<script lang="ts" setup>
import { add } from '@/utils/http'

const count = add(1, 4)
</script>

<style lang="less" scoped>
.home {
  height: 100px;
  color: @bs-bg-type-base;
}
</style>
