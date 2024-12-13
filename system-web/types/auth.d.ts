interface IAccountLoginApiParams {
  username: string
  password: string
  captcha: string
}

interface IAccountLoginApiRes {
  token: string
}
