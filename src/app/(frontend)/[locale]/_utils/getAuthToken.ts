import { cookies } from 'next/headers'
import 'server-only'

const getAuthToken = async (): Promise<string> => {
  const authToken = (await cookies()).get('auth-token')?.value
  return `Bearer ${authToken}`
}

export default getAuthToken
