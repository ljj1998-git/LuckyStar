interface ISearchRoleParams extends IPage {
  name?: string
  code?: number
}

interface ICreateRoleParams {
  name: string
  code: number
  description?: string
  sort?: number
}

interface IRole extends ICommon {
  id: number
  name: string
  code: number
  description?: string
  sort?: number
}
