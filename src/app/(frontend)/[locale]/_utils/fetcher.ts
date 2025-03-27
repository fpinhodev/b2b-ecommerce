import { headers as nextHeaders } from 'next/headers'

const fetcher = async <T>(
  url: RequestInfo,
  method: RequestInit['method'],
  headers?: RequestInit['headers'],
  body?: RequestInit['body'],
): Promise<T> => {
  const cookies = (await nextHeaders()).get('cookie')
  try {
    const response = await fetch(url, {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        cookie: `${cookies}`,
        ...headers,
      },
      ...(body ? { body } : {}),
    })
    const result = await response.json()

    if (!response.ok) {
      if (response.status === 404) throw '404, Not found'
      if (response.status === 500) throw '500, Internal server error'
      return result
    }

    return result
  } catch (e) {
    throw e
  }
}

export default fetcher
