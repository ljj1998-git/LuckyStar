const useAppStore = defineStore('app', {
  state: () => ({
    collapsed: false,
    theme: 'light', // light白色 dark暗黑
    /** 主题色 */
    primaryColor: '#4343c7',
    /** 简体中文 zh_cn 英文 en */
    language: 'zh_cn',
  }),
  getters: {},
  actions: {
    // 切换主题 暗黑模式|简白模式
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark'
        document.body.setAttribute('arco-theme', 'dark')
      } else {
        this.theme = 'light'
        document.body.removeAttribute('arco-theme')
      }
    },
  },
  persist: true,
})

export default useAppStore
