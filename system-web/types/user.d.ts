interface ISearchUserParams extends IPage {
  username?: string
  status?: number
}

interface IAddUserParams {
  id?: number
  username: string
  password: string
  nickname: string
  mobile: string
  email?: string
  status: number
  sex: number
  description?: string
  roles: string[]
  departmentId: number
}
