<template>home=====three==={{ num }}</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { random } from '@/utils/math'
import { getAge } from '../api'
const num = random()
onMounted(() => {
  getAge()
})
</script>

<style>
.home {
  height: 200px;
}
</style>
