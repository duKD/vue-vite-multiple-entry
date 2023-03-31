<template>
  <section class="index">main=====index</section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { getName } from '../api'
import { debounce } from 'lodash-es'
onMounted(() => {
  getName()
})

debounce(() => {})
</script>

<style>
.index {
  background-color: red;
}
</style>
