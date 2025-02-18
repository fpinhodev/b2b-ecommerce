'use server'

import { redirect } from '@/i18n/routing'
import configPromise from '@payload-config'
import { getLocale } from 'next-intl/server'
import { cookies } from 'next/headers'
import type { Collection, User } from 'payload'
import { getPayload } from 'payload'
import { z } from 'zod'

const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    // .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    // .regex(/[0-9]/, { message: 'Contain at least one number.' })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: 'Contain at least one special character.',
    // })
    .trim(),
})

type FormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

interface LoginResponse {
  errors?: [Record<string, string>]
  user?: User
  token?: string
}

export async function login(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })

  const { errors, token, user }: LoginResponse = await data.json()

  if (errors) {
    return { message: errors[0].message }
  }

  const payload = await getPayload({ config: configPromise })
  const usersCollection: Collection = payload.collections['users']
  const cookieStore = await cookies()
  const colectionCookies = usersCollection.config.auth.cookies
  const locale = await getLocale()

  cookieStore.set(`${payload.config.cookiePrefix}-token`, token!, {
    ...colectionCookies,
    sameSite: colectionCookies?.sameSite as 'strict' | 'lax' | 'none',
    maxAge: usersCollection.config.auth.tokenExpiration,
  })

  redirect({ href: '/account', locale })
}

/*
// Define validation schema
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
})

export async function submitContactForm(prevState: any, formData: FormData) {
  // Parse form data
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  })

  // Handle validation errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to submit form'
    }
  }

  // Simulate API call or database insertion
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Return success response
  return {
    errors: {},
    message: 'Message sent successfully!',
    status: 'success'
  }
}
*/
