import type { User } from '@/payload-types'
import { PayloadRequest } from 'payload'

export const checkRole = (allRoles: User['roles'], user: PayloadRequest['user']): boolean => {
  if (user) {
    if (
      allRoles.some((role) => {
        return user?.roles?.some((individualRole) => {
          return individualRole === role
        })
      })
    ) {
      return true
    }
  }

  return false
}
