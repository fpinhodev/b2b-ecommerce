import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { createElement, useState } from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from './form'
import { Input } from './input'

type PasswordFieldProps = {
  name?: string
  placeholder?: string
  description?: string
}

export function PasswordField({
  name = 'password',
  placeholder = 'Enter password',
  description,
}: PasswordFieldProps) {
  const { control, getFieldState } = useFormContext()
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={passwordVisibility ? 'text' : 'password'}
                autoComplete="on"
                placeholder={placeholder}
                className={`pr-12 ${getFieldState(name).error && 'text-destructive'}`}
              />
              <div
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                onClick={() => setPasswordVisibility(!passwordVisibility)}
              >
                {createElement(passwordVisibility ? EyeIcon : EyeOffIcon, {
                  className: 'h-6 w-6',
                })}
              </div>
            </div>
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  )
}
