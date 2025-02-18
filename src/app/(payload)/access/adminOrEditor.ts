import type { Access } from 'payload'

export const adminOrEditor: Access = ({ req: { user } }) => {
  //  Need to be logged
  if (user) {
    //  If user is admin or editor, allow access
    if (user.roles.includes('admin') || user.roles.includes('editor')) {
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
