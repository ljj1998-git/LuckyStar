import { queryMenuTreeApi } from '@/apis/system/menu'
import { getRoleListApi } from '@/apis/system/role'

const useMenuStore = defineStore('role', {
  state: () => ({
    roleList: [] as IRole[],
  }),
  getters: {},
  actions: {
    async getRoleList(params?: ISearchRoleParams) {
      try {
        const res = await getRoleListApi(params)
        this.roleList = res.data.list
      } catch {
        this.roleList = []
      }
    },
  },
})

export default useMenuStore
