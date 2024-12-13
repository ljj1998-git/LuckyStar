/**
 * @description  : 分页类,具体使用: const pagination = ref(new Pagination(搜索方法))
 */
export class Pagination {
  seachFuc: any
  /** 当前页数 */
  current: number
  /** 每页显示条数 */
  pageSize: number
  /** 总数 */
  total: number
  /** 每页显示条数选项 */
  pageSizeOptions: string[]
  /** 是否显示分页器 */
  showSizeChanger: boolean
  /** 是否显示快速跳转 */
  showQuickJumper: boolean
  /** 页码改变回调 */
  onChange: any
  constructor(seachFuc: Function) {
    this.seachFuc = seachFuc
    this.current = 1
    this.pageSize = 10
    this.total = 0
    this.pageSizeOptions = ['5', '10', '20', '50', '100']
    this.showSizeChanger = true
    this.showQuickJumper = true
    this.onChange = this.pageChange.bind(this)
  }
  /** 分页方法 */
  pageChange(page: number, pageSize: number) {
    this.current = page
    this.pageSize = pageSize
    this.seachFuc()
  }
  /** 设置总数 */
  setTotal(total: number) {
    this.total = total
  }
  /** 重置方法 */
  reset() {
    this.current = 1
    this.pageSize = 10
    this.total = 0
  }
}
