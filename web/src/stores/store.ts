// 引入createStore，专门用于创建redux最为核心的store对象
import { legacy_createStore } from "redux";
// 引入Count组件服务的reducer
import appReducer from "@/stores/modules/app/reducer";
// 暴露store
export default legacy_createStore(appReducer);
