'use client'

import { redirect } from '@/i18n/routing'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'
import { TypedLocale } from 'payload'
import React, { createElement, startTransition, useActionState, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../../_components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../../_components/ui/form'
import { Input } from '../../../_components/ui/input'
import { useToast } from '../../../_hooks/use-toast'
import { CreateAccountSchema } from '../../../_utils/zodSchemas'
import { createAccount } from '../_server/create-account'

const CreateAccountForm: React.FC<{ locale: TypedLocale }> = ({ locale }) => {
  const [state, formAction, isPending] = useActionState(createAccount, undefined)
  const formRef = React.useRef<HTMLFormElement>(null)
  const { toast } = useToast()
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

    if (state?.fetchErrors) {
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
  }, [isPending, state?.fetchErrors, state?.fieldErrors, state?.success])

  const form = useForm<z.infer<typeof CreateAccountSchema>>({
    resolver: zodResolver(CreateAccountSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      companyName: '',
      taxNumber: '',
      password: '',
      passwordConfirmation: '',
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="First Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Last Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Phone Number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Company Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taxNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Tax Number"
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
                    {createElement(passwordVisibility ? EyeOffIcon : EyeIcon, {
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
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={passwordConfirmationVisibility ? 'text' : 'password'}
                    autoComplete="on"
                    placeholder="Password confirmation"
                  />
                  <Button
                    type="button"
                    variant="link"
                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                    onClick={() =>
                      setPasswordConfirmationVisibility(!passwordConfirmationVisibility)
                    }
                  >
                    {createElement(passwordConfirmationVisibility ? EyeOffIcon : EyeIcon, {
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
  )
}

export default CreateAccountForm
