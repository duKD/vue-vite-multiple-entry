<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component
        :is="Component"
        :key="getlevel1Name(route)"
        v-if="route.meta.keepAlive"
      />
    </keep-alive>
    <component
      :is="Component"
      :key="getlevel1Name(route)"
      v-if="!route.meta.keepAlive"
    />
  </router-view>
</template>

<script lang="ts" setup>
import { RouteLocationNormalized } from 'vue-router'
// 返回一级路由的名称 不会重新刷新缓存
const getlevel1Name = (route: RouteLocationNormalized) => {
  if (!Array.isArray(route.matched) || route.matched.length === 0) {
    return route.name
  }
  return route.matched[0].name
}
</script>

<style></style>
