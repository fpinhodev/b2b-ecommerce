import { z } from 'zod'

export const CreateAccountSchema = z.object({
  firstName: z.string().trim().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  lastName: z.string().trim().min(2, {
    message: 'Lastname must be at least 2 characters.',
  }),
  email: z.string().trim().email({ message: 'Please enter a valid email.' }),
  phone: z.string().trim().min(9, {
    message: 'Phone number must be 9 numbers.',
  }),
  password: z
    .string()
    .trim()
    .regex(/^.{8,20}$/, {
      message: 'Minimum 8 and maximum 20 characters.',
    })
    .regex(/(?=.*[A-Z])/, {
      message: 'At least one uppercase character.',
    })
    .regex(/(?=.*[a-z])/, {
      message: 'At least one lowercase character.',
    })
    .regex(/(?=.*\d)/, {
      message: 'At least one digit.',
    }),
  // .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
  //   message: 'At least one special character.',
  // }),
})

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
})

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .trim()
    .regex(/^.{8,20}$/, {
      message: 'Minimum 8 and maximum 20 characters.',
    })
    .regex(/(?=.*[A-Z])/, {
      message: 'At least one uppercase character.',
    })
    .regex(/(?=.*[a-z])/, {
      message: 'At least one lowercase character.',
    })
    .regex(/(?=.*\d)/, {
      message: 'At least one digit.',
    }),
})

export const ResetPasswordSchema = z.object({
  token: z
    .string()
    .length(40, { message: 'Must be exactly 40 characters long' })
    .regex(/^[a-zA-Z0-9]+$/, { message: 'Contain only letters and numbers.' })
    .trim(),
  newPassword: z
    .string()
    .trim()
    .regex(/^.{8,20}$/, {
      message: 'Minimum 8 and maximum 20 characters.',
    })
    .regex(/(?=.*[A-Z])/, {
      message: 'At least one uppercase character.',
    })
    .regex(/(?=.*[a-z])/, {
      message: 'At least one lowercase character.',
    })
    .regex(/(?=.*\d)/, {
      message: 'At least one digit.',
    }),
})
