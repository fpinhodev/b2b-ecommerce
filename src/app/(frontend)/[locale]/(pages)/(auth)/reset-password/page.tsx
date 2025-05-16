import { PageArgs } from '../../[slug]/page'
import { ResetPasswordForm } from './ResetPasswordForm'

export default async function Page({ params: params }: PageArgs) {
  const { locale } = await params
  return (
    <div className="mx-auto max-w-md space-y-4 rounded-xl bg-white p-6 shadow-md">
      <h2 className="text-center text-2xl font-bold">Reset Password</h2>
      <ResetPasswordForm locale={locale} />
    </div>
  )
}
