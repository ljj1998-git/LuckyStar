const home = (state, actions) => {
  //判断state是否存在，如果不存在返回默认值
  if (!state) {
    return {
      name: '张三',
      counter: 18
    }
  }
  //修改数据的type类型
  if (actions.type === 'SET_COUNT') {
    return {
      ...state,
      counter: state.counter + 1
    }
  }
  return state
}
export default home
