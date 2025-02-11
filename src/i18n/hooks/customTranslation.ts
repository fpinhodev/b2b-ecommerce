import { CustomTranslationsKeys } from '@/i18n/custom-translations'
import { DefaultTranslationKeys, TFunction } from '@payloadcms/translations'

const customTranslation =
  (translationKey: string) =>
  (
    { t }: { t: TFunction<CustomTranslationsKeys | DefaultTranslationKeys> }, // The generic passed to TFunction does not automatically merge the custom translations with the default translations. We need to merge them ourselves here
  ) =>
    t(translationKey)

export default customTranslation
