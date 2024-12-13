<template>
  <div class="w-full h-full">
    <a-menu
      :style="{ width: '100%', height: '100%' }"
      :default-open-keys="['0']"
      :default-selected-keys="['0_2']"
      show-collapse-button
      breakpoint="xl"
      @menu-item-click="handleClick"
    >
      <a-sub-menu key="0">
        <template #icon><icon-apps></icon-apps></template>
        <template #title>系统管理</template>
        <a-menu-item key="/system/user">用户管理</a-menu-item>
        <a-menu-item key="/system/menu">菜单管理</a-menu-item>
        <a-menu-item key="/system/role">角色管理</a-menu-item>
        <a-menu-item key="/system/department">部门管理</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import { IconApps } from '@arco-design/web-vue/es/icon'

const handleClick = (key: string) => {
  router.push({ path: key })
}
</script>
