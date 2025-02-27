import { PageArgs } from '../../[slug]/page'
import RecoverPasswordForm from './RecoverPasswordForm'

export default async function Page({ params: _params }: PageArgs) {
  // const { locale } = await params
  // const headers = await getHeaders()
  // const payload = await getPayload({ config })
  // const { user } = await payload.auth({ headers })

  // if (user) {
  //   redirect(`/account?message=${encodeURIComponent('Cannot recover password while logged in.')}`)
  // }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">RECOVER PASSWORD</h2>
      <RecoverPasswordForm />
    </div>
  )
}
