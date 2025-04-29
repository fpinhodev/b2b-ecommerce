'use client'

import { Button } from '@/app/(frontend)/[locale]/_components/ui/button'
import { Checkbox } from '@/app/(frontend)/[locale]/_components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/(frontend)/[locale]/_components/ui/form'
import { Input } from '@/app/(frontend)/[locale]/_components/ui/input'
import { useToast } from '@/app/(frontend)/[locale]/_hooks/use-toast'
import { UserAddressSchema } from '@/app/(frontend)/[locale]/_utils/zodSchemas'
import { redirect } from '@/i18n/routing'
import { UsersAddress } from '@/payload-types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { TypedLocale } from 'payload'
import React, { startTransition, useActionState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { updateUserData } from '../../_server/update-address'

const UpdateAddressForm: React.FC<{
  updateAddress: UsersAddress
  locale: TypedLocale
}> = ({ updateAddress, locale }) => {
  const [state, formAction, isPending] = useActionState(updateUserData, undefined)
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
      redirect({ href: '/account/addresses', locale })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, state?.fetchErrors, state?.fieldErrors, state?.success])

  const form = useForm<z.infer<typeof UserAddressSchema>>({
    resolver: zodResolver(UserAddressSchema),
    defaultValues: {
      ...updateAddress,
      addressLine2: updateAddress.addressLine2 ?? '',
    },
  })

  return (
    <Form {...form}>
      <form
        ref={formRef}
        className="w-64 space-y-4"
        action={formAction}
        onSubmit={form.handleSubmit((data, event) =>
          startTransition(() => formAction(new FormData(event?.target))),
        )}
      >
        <input
          {...form.register('id', { value: updateAddress.id, valueAsNumber: true })}
          type="hidden"
        />
        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Address Line 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Address Line 2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Zip Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isDefault"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox name="isDefault" checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Primary Address</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="mt-6">
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

export default UpdateAddressForm
