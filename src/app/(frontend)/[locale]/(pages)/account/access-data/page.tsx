import { redirect } from '@/i18n/routing'
import { verifySession } from '@/lib/session'
import { PageArgs } from '../../[slug]/page'
import '../index.scss'
import AccessDataForm from './AccessDataForm'

export default async function Page({ params }: PageArgs) {
  const { locale } = await params
  const { user } = await verifySession()
  if (!user) return redirect({ href: '/login', locale })

  return (
    <div className="flex flex-col gap-8">
      <h1>Access Data</h1>
      <AccessDataForm />
    </div>
  )
}
