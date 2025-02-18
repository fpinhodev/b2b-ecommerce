'use client'

import { login } from '@/app/(frontend)/[locale]/_server/login'
import { useActionState } from 'react'

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, undefined)
  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex gap-4">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" className="border border-black" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <div className="flex gap-4">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" className="border border-black" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error: string) => (
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
