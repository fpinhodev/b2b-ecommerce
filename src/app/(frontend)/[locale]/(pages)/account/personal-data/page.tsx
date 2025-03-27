import { redirect } from '@/i18n/routing'
import { User } from '@/payload-types'
import { getCachedUser } from '../../../_utils/get-user'
import verifySessionToken from '../../../_utils/verifySessionToken'
import { PageArgs } from '../../[slug]/page'
import '../index.scss'
import UpdateDataForm from './UpdateDataForm'

export type UserData = Pick<User, 'id' | 'firstName' | 'lastName' | 'phone'>

export default async function Page({ params }: PageArgs) {
  const { locale } = await params
  const { user } = await verifySessionToken()
  if (!user) return redirect({ href: '/login', locale })
  console.log(10, user)

  const userData = await getCachedUser(user.id)

  console.log(11, userData)

  return (
    <div className="flex flex-col gap-8">
      <h1>Personal Data</h1>
      <UpdateDataForm userData={userData} />
    </div>
  )
}
