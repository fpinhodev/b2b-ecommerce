'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'
import React, { createElement, startTransition, useActionState, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../../_components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../../_components/ui/form'
import { Input } from '../../../_components/ui/input'
import { useToast } from '../../../_hooks/use-toast'
import { UpadateAccessDataSchema } from '../../../_utils/zodSchemas'
import { updateAccessData } from '../_server/update-access-data'

const AccessDataForm = () => {
  const [state, formAction, isPending] = useActionState(updateAccessData, undefined)
  const formRef = React.useRef<HTMLFormElement>(null)
  const { toast } = useToast()
  const [oldPasswordVisibility, setOldPasswordVisibility] = useState(false)
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
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, state?.fetchErrors, state?.fieldErrors, state?.success])

  const form = useForm<z.infer<typeof UpadateAccessDataSchema>>({
    resolver: zodResolver(UpadateAccessDataSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
    },
  })

  return (
    <>
      <Form {...form}>
        <form
          ref={formRef}
          className="w-64 space-y-4"
          action={formAction}
          onSubmit={(e) =>
            form.handleSubmit(() =>
              startTransition(() => formAction(new FormData(formRef.current!))),
            )(e)
          }
        >
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={oldPasswordVisibility ? 'text' : 'password'}
                      autoComplete="on"
                      placeholder="Old Password"
                    />
                    <Button
                      type="button"
                      variant="link"
                      className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                      onClick={() => setOldPasswordVisibility(!oldPasswordVisibility)}
                    >
                      {createElement(oldPasswordVisibility ? EyeIcon : EyeOffIcon, {
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
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={passwordVisibility ? 'text' : 'password'}
                      autoComplete="on"
                      placeholder="New Password "
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
                      placeholder="New Password Confirmation"
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

export default AccessDataForm
