import { createStore, combineReducers } from 'redux'
import home from './modules/home'

//可以合并多个模块actions
const Reducer = combineReducers({
  home
})
//创建存储对象并且抛出对象
const store = createStore(Reducer)
export default store //抛出store对象的信息
