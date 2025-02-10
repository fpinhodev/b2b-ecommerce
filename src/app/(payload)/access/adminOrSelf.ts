import type { Access } from 'payload'

export const adminOrSelf: Access = ({ req: { user } }) => {
  //  Need to be logged
  if (user) {
    //  If user is admin, allow access
    if (user.roles.includes('admin')) {
      return true
    }
    //  If user is not admin, check if user is the same as the one being accessed
    return {
      id: {
        equals: user.id,
      },
    }
  }
  //  Reject everyone else
  return false
}
