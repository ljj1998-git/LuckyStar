interface ISearchUserParams extends IPage {
  username?: string
  status?: number
  departmentId?: number
}

interface IAddUserParams {
  id?: number
  username?: string
  password?: string
  nickname?: string
  mobile?: string
  email?: string
  status?: number
  sex?: number
  description?: string
  roles?: string[]
  departmentId?: number
}

interface IUser extends ICommon {
  id: number
  username: string
  nickname: string
  mobile: string
  email?: string
  status: number
  sex: number
  description?: string
  roles: IRole[]
}
