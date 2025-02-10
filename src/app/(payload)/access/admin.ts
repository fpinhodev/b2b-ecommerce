import type { Access, FieldAccess } from 'payload'
import { checkRole } from './checkRole'

export const admin: Access = ({ req: { user } }) => checkRole(['admin'], user)

export const adminFieldAccess: FieldAccess = ({ req: { user } }) => checkRole(['admin'], user)
