'use client'

import { useToast } from '@/app/(frontend)/[locale]/_hooks/use-toast'
import { Link, redirect } from '@/i18n/routing'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'
import { TypedLocale } from 'payload'
import React, { createElement, startTransition, useActionState, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../../_components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../../_components/ui/form'
import { Input } from '../../../_components/ui/input'
import { LoginSchema } from '../../../_utils/zodSchemas'
import { login } from '../_server/login'

const LoginForm = ({ locale }: { locale: TypedLocale }) => {
  const [state, formAction, isPending] = useActionState(login, undefined)
  const formRef = React.useRef<HTMLFormElement>(null)
  const { toast } = useToast()
  const [passwordVisibility, setPasswordVisibility] = useState(false)

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

    if (state?.fetchErrors) {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, state?.fetchErrors, state?.success])

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={passwordVisibility ? 'text' : 'password'}
                    autoComplete="on"
                    placeholder="Password"
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
        <div className="flex justify-between gap-4">
          <Link href={'/recover-password'}>Recover Password</Link>
          <Link href={'/create-account'}>Create new account</Link>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm
