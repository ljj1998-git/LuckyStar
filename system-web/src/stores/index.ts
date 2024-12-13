import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import useAppStore from './modules/app'
import useAuthStore from './modules/auth'
import useDepartmentStore from './modules/system/department'
import useUserStore from './modules/system/user'
import useMenuStore from './modules/system/menu'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

export { useAppStore, useAuthStore, useDepartmentStore, useUserStore, useMenuStore }
