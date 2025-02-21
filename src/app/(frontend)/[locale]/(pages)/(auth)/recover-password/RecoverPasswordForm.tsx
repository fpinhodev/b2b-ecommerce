'use client'

import { TypedLocale } from 'payload'
import React, { Fragment, useActionState, useEffect } from 'react'
import { Input } from '../../../_components/ui/input'
import { useToast } from '../../../_hooks/use-toast'
import { forgotPassword } from '../../../_server/forgot-password'

const RecoverPasswordForm: React.FC<{ _locale: TypedLocale }> = ({ _locale }) => {
  const [state, formAction, isPending] = useActionState(forgotPassword, undefined)
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
        // redirect({ href: '/reset-password', locale })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, state?.fetchErrors, state?.success])

  return (
    <Fragment>
      {state?.success ? (
        <>
          <h3>Request submitted</h3>
          <p>Check your email for a link that will allow you to securely reset your password.</p>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <p className="text-xs">
              {`Please enter your email below. You will receive an email message with instructions on
              how to reset your password. To manage all of your users, `}
            </p>
            <form action={formAction} className="flex flex-col gap-4">
              <Input placeholder="Email" name="email" required type="email" />
              {state?.fieldErrors?.email && <p>{state.fieldErrors.email}</p>}
              <button type="submit" disabled={isPending} className="btn border-4 border-black">
                Recover Password
              </button>
            </form>
          </div>
        </>
      )}
    </Fragment>
  )
}

export default RecoverPasswordForm
