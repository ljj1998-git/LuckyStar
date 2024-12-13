<template>
  <div class="flex flex-col w-full overflow-hidden">
    <Header />
    <div class="flex flex-1">
      <div class="h-[calc(100vh-64px)] w-[280px]">
        <Sidebar />
      </div>
      <div class="scrollable-content w-full h-[calc(100vh-64px)] p-4 overflow-y-auto">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/layout/components/header/index.vue'
import Sidebar from '@/layout/components/sidebar/index.vue'
</script>

<style scoped>
.scrollable-content::-webkit-scrollbar {
  display: none; /* 隐藏滚动条 */
}
</style>
