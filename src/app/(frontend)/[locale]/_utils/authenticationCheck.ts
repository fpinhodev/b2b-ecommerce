import { Pathnames } from '@/i18n/routing'
import { User } from '@/payload-types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
export const fetchCache = 'force-cache'

export const authenticationCheck = async (args?: {
  nullUserRedirect?: Pathnames
  validUserRedirect?: Pathnames
}): Promise<{
  user: User
  token: string
}> => {
  const { nullUserRedirect, validUserRedirect } = args || {}
  const token = (await cookies()).get('payload-token')?.value
  if (!token) redirect('/login')

  const userRequest = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })

  const {
    user,
  }: {
    user: User
  } = await userRequest.json()

  if (validUserRedirect && userRequest.ok && user) {
    redirect(validUserRedirect)
  }

  if (nullUserRedirect && (!userRequest.ok || !user)) {
    redirect(nullUserRedirect)
  }

  return {
    user,
    token,
  }
}
