'use client'

import { useToast } from '@/app/(frontend)/[locale]/_hooks/use-toast'
import { login } from '@/app/(frontend)/[locale]/_server/login'
import { Link, redirect } from '@/i18n/routing'
import { Loader2 } from 'lucide-react'
import { TypedLocale } from 'payload'
import { useActionState, useEffect } from 'react'
import { Button } from '../../../_components/ui/button'
import { Input } from '../../../_components/ui/input'

const LoginForm: React.FC<{ locale: TypedLocale }> = ({ locale }) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, state?.fetchErrors, state?.success])

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Input placeholder="Email" name="email" required type="email" />
      {state?.fieldErrors?.email && <p>{state.fieldErrors.email}</p>}
      <Input placeholder="Password" name="password" required type="password" />
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
      <Button type="submit" disabled={isPending}>
        {
          <>
            {isPending && <Loader2 className="animate-spin" />}
            {isPending ? 'Please wait' : 'Submit'}
          </>
        }
      </Button>
      <Link href={'/recover-password'}>Recover Password</Link>
    </form>
  )
}

export default LoginForm
