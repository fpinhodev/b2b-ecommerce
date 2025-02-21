import { toKebabCase } from '@/utils/toKebabCase'
import { type FieldHook } from 'payload'

export const formatSlugHook =
  (fallback: string): FieldHook =>
  async ({ data, operation, value }) => {
    // const checkSlug = await slugAlreadyExists(fallbackDataCased, 50)
    if (typeof value === 'string') {
      return toKebabCase(value)
    }

    if (operation === 'create' || !data?.slug) {
      const fallbackData = data?.[fallback] || data?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return toKebabCase(fallbackData)
      }
    }

    return value
  }
