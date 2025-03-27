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
import { updatePersonalData } from '../../../_server/update-personal-data'
import { PersonalDataSchema } from '../../../_utils/zodSchemas'
import { UserData } from './page'

const UpdateDataForm: React.FC<{ userData: UserData }> = ({ userData }) => {
  const [state, formAction, isPending] = useActionState(updatePersonalData, undefined)
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

  const form = useForm<z.infer<typeof PersonalDataSchema>>({
    resolver: zodResolver(PersonalDataSchema),
    defaultValues: { ...userData },
  })

  return (
    <>
      <Form {...form}>
        <form
          ref={formRef}
          className="w-64 space-y-8"
          action={formAction}
          onSubmit={(e) =>
            form.handleSubmit(() =>
              startTransition(() => formAction(new FormData(formRef.current!))),
            )(e)
          }
        >
          <input
            {...form.register('id', { valueAsNumber: true, value: userData.id })}
            type="hidden"
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
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
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
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

export default UpdateDataForm
