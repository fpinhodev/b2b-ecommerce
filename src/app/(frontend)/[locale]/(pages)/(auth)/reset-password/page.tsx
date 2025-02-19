// import config from '../../../payload.config'
// import { Gutter } from '../_components/Gutter'
import { ResetPasswordForm } from './ResetPasswordForm'

export default async function Page() {
  // const headers = await getHeaders()
  // const payload = await getPayload({ config })
  // const { user } = await payload.auth({ headers })

  // if (user) {
  //   redirect(`/account?message=${encodeURIComponent('Cannot reset password while logged in.')}`)
  // }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Reset Password</h2>
      <p>Please enter a new password below.</p>
      <ResetPasswordForm />
    </div>
  )
}
