import RecoverPasswordForm from './RecoverPasswordForm'

export default async function Page() {
  return (
    <div className="mx-auto max-w-md space-y-4 rounded-xl bg-white p-6 shadow-md">
      <h2 className="text-center text-2xl font-bold">Recover Password</h2>
      <RecoverPasswordForm />
    </div>
  )
}
