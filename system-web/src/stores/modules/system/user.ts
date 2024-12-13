import { deleteDepartmentApi, getDepartmentTreeApi } from '@/apis/system/department'
import { getUserListApi } from '@/apis/system/user'

const useUserStore = defineStore('user', {
  state: () => ({
    userList: [],
  }),
  getters: {},
  actions: {
    async getUserList(params?: ISearchUserParams) {
      try {
        const res = await getUserListApi(params)
        this.userList = res.data.list
      } catch {
        this.userList = []
      }
    },
  },
  persist: {
    storage: sessionStorage,
  },
})

export default useUserStore
