import { PageArgs } from '../../[slug]/page'
import CreateAccountForm from './CreateAccountForm'

export default async function Page({ params: params }: PageArgs) {
  const { locale } = await params
  return (
    <div className="mx-auto max-w-md space-y-4 rounded-xl bg-white p-6 shadow-md">
      <h2 className="text-center text-2xl font-bold">CREATE ACCOUNT</h2>
      <CreateAccountForm locale={locale} />
    </div>
  )
}
