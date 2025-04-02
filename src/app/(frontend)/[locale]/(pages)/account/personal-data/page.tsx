import { redirect } from '@/i18n/routing'
import { Suspense } from 'react'
import getCachedPersonalData from '../../../_fetch/get-personal-data'
import verifySessionToken from '../../../_utils/verifySessionToken'
import { PageArgs } from '../../[slug]/page'
import '../index.scss'
import UpdateDataForm from './UpdateDataForm'

const UpdateDataFormWrapper: React.FC<{ userId: number }> = async ({ userId }) => {
  const userData = await getCachedPersonalData(userId)
  return <UpdateDataForm userData={userData} />
}

export default async function Page({ params }: PageArgs) {
  const { locale } = await params
  const { user } = await verifySessionToken()
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
