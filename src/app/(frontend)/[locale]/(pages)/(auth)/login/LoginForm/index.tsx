'use client'

import { useToast } from '@/app/(frontend)/[locale]/_hooks/use-toast'
import { login } from '@/app/(frontend)/[locale]/_server/login'
import { redirect } from '@/i18n/routing'
import { TypedLocale } from 'payload'
import { useActionState, useEffect } from 'react'

export default function LoginForm({ locale }: { locale: TypedLocale }) {
  const [state, formAction, isPending] = useActionState(login, undefined)
  const { toast } = useToast()

  useEffect(() => {
    if (!isPending) {
      if (state?.fetchErrors?.length) {
        toast({
          description: state?.fetchErrors[0].message,
        })
      }
      if (state?.success) {
        toast({
          description: state?.message,
        })
        redirect({ href: '/account', locale })
      }
    }
  }, [isPending, state?.fetchErrors, state?.success])

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex gap-4">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" className="border border-black" />
      </div>
      {state?.fieldErrors?.email && <p>{state.fieldErrors.email}</p>}
      <div className="flex gap-4">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" className="border border-black" />
      </div>
      {state?.fieldErrors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.fieldErrors.password.map((error: string) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <button type="submit" disabled={isPending} className="btn border-4 border-black">
        Submeter
      </button>
    </form>
  )
}
