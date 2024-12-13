import '@/styles/tailwindcss/index.css'
import '@/styles/base.css'

import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@/styles/arco-ui/index.less'

import 'virtual:svg-icons-register'

import debounce from '@/directives/debounce'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import stores from './stores'

const app = createApp(App)

app.directive('debounce', debounce)
app.use(stores)
app.use(router)
app.use(ArcoVueIcon)

app.mount('#app')
