'use client'

import { Input } from '@/app/(frontend)/[locale]/_components/ui/input'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'

type _FormData = {
  password: string
  token: string
}

export const ResetPasswordForm: React.FC = () => {
  const [_error, _setError] = useState('')
  // const { login } = useAuth()
  // const router = useRouter()
  const searchParams = useSearchParams()
  const _token = searchParams.get('token')

  // const {
  //   formState: { errors },
  //   handleSubmit,
  //   register,
  //   reset,
  // } = useForm<FormData>()

  // const onSubmit = useCallback(
  //   async (data: FormData) => {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`,
  //       {
  //         body: JSON.stringify(data),
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         method: 'POST',
  //       },
  //     )

  //     if (response.ok) {
  //       const json = await response.json()

  //       // Automatically log the user in after they successfully reset password
  //       // await login({ email: json.user.email, password: data.password })

  //       // Redirect them to `/account` with success message in URL
  //       router.push('/account?success=Password reset successfully.')
  //     } else {
  //       setError('There was a problem while resetting your password. Please try again later.')
  //     }
  //   },
  //   [router],
  // )

  // when Next.js populates token within router,
  // reset form with new token value
  // useEffect(() => {
  // reset({ token: token || undefined })
  // }, [reset, token])

  return (
    <form
      className="flex flex-col gap-4"
      // className={classes.form}
      //  onSubmit={handleSubmit(onSubmit)}
    >
      {/* <Message className={classes.message} error={error} /> */}
      <Input
        // error={errors.password}
        // register={register}
        placeholder="New Password"
        name="password"
        required
        type="password"
      />
      {/* <input type="hidden" {...register('token')} /> */}
      <button type="submit" className="btn border-4 border-black">
        Reset Password
      </button>
    </form>
  )
}
