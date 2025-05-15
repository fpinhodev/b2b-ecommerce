export type LoginResponse = {
  login: {
    id: number
    role: string
    token: string
    tokenExpiration: number
  }
}
