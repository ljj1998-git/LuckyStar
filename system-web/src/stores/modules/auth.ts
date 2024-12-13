import { accountLoginApi } from '@/apis/system/user'
import { setToken } from '@/utils/auth'

const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    userInfo: {},
  }),
  getters: {},
  actions: {
    async accountLogin(req: IAccountLoginApiParams) {
      const res = await accountLoginApi(req)
      setToken(res.data.token)
      this.token = res.data.token
    },
  },
  persist: {
    omit: ['token'],
    storage: localStorage,
  },
})

export default useAuthStore
