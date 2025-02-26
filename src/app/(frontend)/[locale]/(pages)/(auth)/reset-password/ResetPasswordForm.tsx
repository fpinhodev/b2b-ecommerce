'use client'

import { Input } from '@/app/(frontend)/[locale]/_components/ui/input'
import { useSearchParams } from 'next/navigation'
import { TypedLocale } from 'payload'
import React, { useActionState, useEffect } from 'react'
import { toast } from '../../../_hooks/use-toast'
import { resetPassword } from '../../../_server/reset-password'
import { redirect } from '@/i18n/routing'

export const ResetPasswordForm: React.FC<{ locale: TypedLocale }> = ({ locale }) => {
  const [state, formAction, isPending] = useActionState(resetPassword, undefined)
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

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
        redirect({ href: '/login', locale })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, state?.fetchErrors, state?.success])

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="token" value={token || ''} />
      <Input type="password" name="newPassword" placeholder="New Password" required />
      {state?.fieldErrors?.newPassword && <p>{state.fieldErrors.newPassword}</p>}
      <button type="submit" disabled={isPending} className="btn border-4 border-black">
        Reset Password
      </button>
    </form>
  )
}
