<template>
  <a-layout-header
    class="h-16 px-4 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-600"
  >
    <a-row class="h-full">
      <a-col class="h-full" :span="12">
        <img class="w-[200px] h-[64px]" src="@/assets/images/logo.svg" alt="logo" />
      </a-col>
      <a-col :span="12" class="h-full flex items-center justify-end">
        <a-space>
          <!-- 管理员账户 -->
          <a-dropdown trigger="hover">
            <a-row align="center" :wrap="false" class="cursor-pointer">
              <!-- 管理员头像 -->
              <a-avatar :size="32">A</a-avatar>
              <span class="ml-2">德玛</span>
              <icon-down />
            </a-row>
            <template #content>
              <a-doption>
                <span>个人中心</span>
              </a-doption>
              <a-divider :margin="0" />
              <a-doption @click="logout">
                <span>退出登录</span>
              </a-doption>
            </template>
          </a-dropdown>
        </a-space>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script lang="ts" setup>
import { Modal } from '@arco-design/web-vue'

/** 退出登陆 */
const logout = () => {
  Modal.warning({
    title: '提示',
    content: '确认退出登录？',
    hideCancel: false,
    closable: true,
    onBeforeOk: async () => {
      try {
        return true
      } catch (error) {
        return false
      }
    },
  })
}
</script>
