import { z } from 'zod'

export const AccountSchema = z.object({
  id: z.number().optional(),
  firstName: z.string().trim().min(2, {
    message: 'Firstname must be at least 2 characters.',
  }),
  lastName: z.string().trim().min(2, {
    message: 'Lastname must be at least 2 characters.',
  }),
  email: z.string().trim().email({ message: 'Please enter a valid email.' }),
  phone: z.string().trim().min(9, {
    message: 'Phone number must be 9 numbers.',
  }),
  addresses: z.object({
    id: z.string(),
    addressLine1: z.string().min(2).trim(),
    addressLine2: z.string().trim().optional(),
    city: z.string().min(2).trim(),
    state: z.string().min(2).trim(),
    zipCode: z.string().min(2).trim(),
    country: z.string().min(2).trim(),
    isDefault: z.boolean().default(false),
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
    })
    .optional(),
  // .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
  //   message: 'At least one special character.',
  // }),
})

export const CreateAccountSchema = AccountSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  password: true,
})

export const ForgotPasswordSchema = AccountSchema.pick({ email: true, password: true })

export const LoginSchema = AccountSchema.pick({ email: true, password: true })

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

export const PersonalDataSchema = AccountSchema.pick({
  id: true,
  firstName: true,
  lastName: true,
  phone: true,
})

export const CreateAddressSchema = AccountSchema.pick({
  id: true,
  addresses: true,
}).extend({
  userAddresses: z.string().optional(),
})

export const UpdateAddressSchema = AccountSchema.pick({
  id: true,
  addresses: true,
}).extend({
  userAddresses: z.string().optional(),
})
