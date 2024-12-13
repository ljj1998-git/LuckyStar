import { deleteDepartmentApi, getDepartmentTreeApi } from '@/apis/system/department'

const useDepartmentStore = defineStore('department', {
  state: () => ({
    departmentTree: [] as IDepartmentTree[],
  }),
  getters: {},
  actions: {
    async getDepartmentTree(params?: ISearchDepartmentParams) {
      try {
        const res = await getDepartmentTreeApi(params)
        this.departmentTree = res.data
      } catch {
        this.departmentTree = []
      }
    },
    async deleteDepartment(id: number) {
      try {
        await deleteDepartmentApi(id)
        this.getDepartmentTree()
      } catch {
        //
      }
    },
  },
  persist: {
    storage: sessionStorage,
  },
})

export default useDepartmentStore
