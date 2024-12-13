<template>
  <a-button size="mini" class="gi_hover_btn" @click="handleToggleTheme">
    <template #icon>
      <icon-moon v-if="appStore.theme === 'light'" :size="18" />
      <icon-sun v-else :size="18" />
    </template>
  </a-button>
</template>

<script setup lang="ts">
import { IconMoon, IconSun } from '@arco-design/web-vue/es/icon'
import { useDark, useToggle } from '@vueuse/core'
import { useAppStore } from '@/stores'

defineOptions({ name: 'GiThemeBtn' })
const appStore = useAppStore()

const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'arco-theme',
  onChanged(dark: boolean) {
    appStore.toggleTheme(dark)
  },
})

const toggleTheme = useToggle(isDark)

const handleToggleTheme = () => {
  toggleTheme()
}
</script>

<style lang="less" scoped>
.gi_hover_btn {
  border: 0 !important;
  background-color: transparent;

  &:hover {
    background: var(--color-secondary-hover) !important;
    border-radius: 50%;
  }

  &:active {
    background: var(--color-secondary-active) !important;
    border-radius: 50%;
  }
}

.gi_hover_btn-border {
  &:hover {
    background: var(--color-secondary-hover) !important;
  }

  &:active {
    background: var(--color-secondary-active) !important;
  }
}
</style>
