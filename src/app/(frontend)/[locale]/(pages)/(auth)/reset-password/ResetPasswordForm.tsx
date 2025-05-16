'use client'

import { Input } from '@/app/(frontend)/[locale]/_components/ui/input'
import { redirect } from '@/i18n/routing'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { TypedLocale } from 'payload'
import React, { createElement, startTransition, useActionState, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../../_components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../../_components/ui/form'
import { useToast } from '../../../_hooks/use-toast'
import { ResetPasswordSchema } from '../../../_utils/zodSchemas'
import { resetPassword } from '../_server/reset-password'

export const ResetPasswordForm: React.FC<{ locale: TypedLocale }> = ({ locale }) => {
  const [state, formAction, isPending] = useActionState(resetPassword, undefined)
  const formRef = React.useRef<HTMLFormElement>(null)
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [resetToken] = useState(token)
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [passwordConfirmationVisibility, setPasswordConfirmationVisibility] = useState(false)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, state?.fieldErrors, state?.fetchErrors, state?.success])

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      token: resetToken || '',
      newPassword: '',
      newPasswordConfirmation: '',
    },
  })

  if (!resetToken) {
    return <p>Token is required!</p>
  }

  return (
    <>
      <p>Please enter a new password and its confirmation below.</p>
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
          <input
            {...form.register('token')}
            type="hidden"
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={passwordVisibility ? 'text' : 'password'}
                      autoComplete="on"
                      placeholder="New password"
                    />
                    <Button
                      type="button"
                      variant="link"
                      className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                      onClick={() => setPasswordVisibility(!passwordVisibility)}
                    >
                      {createElement(passwordVisibility ? EyeIcon : EyeOffIcon, {
                        className: 'h-6 w-6',
                      })}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPasswordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={passwordConfirmationVisibility ? 'text' : 'password'}
                      autoComplete="on"
                      placeholder="New password confirmation"
                    />
                    <Button
                      type="button"
                      variant="link"
                      className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                      onClick={() =>
                        setPasswordConfirmationVisibility(!passwordConfirmationVisibility)
                      }
                    >
                      {createElement(passwordConfirmationVisibility ? EyeIcon : EyeOffIcon, {
                        className: 'h-6 w-6',
                      })}
                    </Button>
                  </div>
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
    </>
  )
}
