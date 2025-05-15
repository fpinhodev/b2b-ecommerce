import { redirect } from '@/i18n/routing'
import { verifySession } from '@/lib/session'
import { Suspense } from 'react'
import { PageArgs } from '../../[slug]/page'
import getCachedPersonalData from '../_fetch/get-personal-data'
import '../index.scss'
import UpdateDataForm from './UpdateDataForm'

const UpdateDataFormWrapper: React.FC<{ userId: number }> = async ({ userId }) => {
  const userData = await getCachedPersonalData(userId)
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
