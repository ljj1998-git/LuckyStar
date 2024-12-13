export default {
  beforeMount(el: HTMLElement, binding: any) {
    const delay = binding.arg || 300 // 默认延迟300毫秒
    const originalHandler = binding.value // 获取用户传入的事件处理函数

    let timer: ReturnType<typeof setTimeout> | null
    el.addEventListener('click', function (event) {
      if (timer) clearTimeout(timer) // 清除之前的定时器
      timer = setTimeout(() => {
        originalHandler.call(this, event) // 执行原始事件处理函数
      }, delay)
    })
  },

  unmounted(el: HTMLElement) {
    el.removeEventListener('click', () => {})
  },
}
