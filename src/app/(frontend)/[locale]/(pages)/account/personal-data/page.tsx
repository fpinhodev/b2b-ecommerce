import { redirect } from '@/i18n/routing'
import { verifySession } from '@/lib/session'
import { Suspense } from 'react'
import getAuthToken from '../../../_utils/getAuthToken'
import { PageArgs } from '../../[slug]/page'
import getCachedPersonalData from '../_fetch/get-personal-data'
import '../index.scss'
import UpdateDataForm from './UpdateDataForm'

const UpdateDataFormWrapper = async ({ userId }: { userId: number }) => {
  const userData = await getCachedPersonalData(userId, await getAuthToken())
  return <UpdateDataForm userData={userData} />
}

export default async function Page({ params }: PageArgs) {
  const { locale } = await params
  const { user } = await verifySession()
  if (!user) return redirect({ href: '/login', locale })

  return (
    <div className="flex flex-col gap-8">
      <h1>Personal Data</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <UpdateDataFormWrapper userId={user.id} />
      </Suspense>
    </div>
  )
}
