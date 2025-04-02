import { User } from '@/payload-types'

export type UserData = Pick<User, 'id' | 'firstName' | 'lastName' | 'phone'>
