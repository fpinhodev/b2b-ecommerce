'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import React, { startTransition, useActionState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../../_components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../../_components/ui/form'
import { Input } from '../../../_components/ui/input'
import { useToast } from '../../../_hooks/use-toast'
import { ForgotPasswordSchema } from '../../../_utils/zodSchemas'
import { forgotPassword } from '../_server/forgot-password'

const RecoverPasswordForm = () => {
  const [state, formAction, isPending] = useActionState(forgotPassword, undefined)
  const formRef = React.useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (isPending) return

    if (state?.fieldErrors !== undefined) {
      const fieldErrorMessages = Object.values(state?.fieldErrors)
        .reduce((acc, val) => acc.concat(val), [])
        .join('\n')
      toast({
        description: fieldErrorMessages,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, state?.fieldErrors])

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  return (
    <>
      {state?.success ? (
        <>
          <h3>Request submitted</h3>
          <p>
            Check your email for a link that will allow you to securely reset your password. Token
            sent on email expires on 1 hour.
          </p>
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-xs">
            {`Please enter your email below. You will receive an email message with instructions on
              how to reset your password. To manage all of your users, `}
          </p>
          <Form {...form}>
            <form
              ref={formRef}
              className="flex flex-col gap-4"
              action={formAction}
              onSubmit={(e) =>
                form.handleSubmit(() =>
                  startTransition(() => formAction(new FormData(formRef.current!))),
                )(e)
              }
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isPending}
              >
                {
                  <>
                    {isPending && <Loader2 className="animate-spin" />}
                    {isPending ? 'Please wait' : 'Submit'}
                  </>
                }
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  )
}

export default RecoverPasswordForm
