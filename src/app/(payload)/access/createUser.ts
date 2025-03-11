import type { Access } from 'payload'

export const createUser: Access = ({ data, req }) => {
  const isAuthenticated = Boolean(req?.user)
  const isAdmin: boolean | undefined = req?.user?.roles?.includes('admin')
  const isEditor: boolean | undefined = req?.user?.roles?.includes('editor')
  const creatingEditor: boolean | undefined = data?.roles?.includes('editor')
  const creatingCustomer: boolean | undefined = data?.roles?.includes('customer')
  const creatingSeller: boolean | undefined = data?.roles?.includes('seller')

  if (isAuthenticated) {
    if (isAdmin) return true
    if (isEditor) {
      if (creatingEditor || creatingCustomer || creatingSeller) return true
    }
  } else {
    if (creatingCustomer) return true
  }

  return false
}
