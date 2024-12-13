import { queryMenuTreeApi } from '@/apis/system/menu'

const useMenuStore = defineStore('menu', {
  state: () => ({
    menuTree: [] as IMenuTree[],
  }),
  getters: {},
  actions: {
    async getMenuTree() {
      try {
        const res = await queryMenuTreeApi()
        this.menuTree = res.data
      } catch {
        this.menuTree = []
      }
    },
  },
  persist: {
    storage: sessionStorage,
  },
})

export default useMenuStore
