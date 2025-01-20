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
        this.departmentTree.unshift({ id: 0, name: '全部', parentId: -1, children: [] })
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
