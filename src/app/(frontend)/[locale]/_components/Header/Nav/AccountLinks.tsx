'use client'

import { Link, redirect } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { TypedLocale } from 'payload'
import { useToast } from '../../../_hooks/use-toast'
import { logout as logoutAction, LogoutResponse } from '../../../_server/logout'
import { Button } from '../../ui/button'

const AccountLinks: React.FC<{ locale: TypedLocale; isLogged: boolean }> = ({
  locale,
  isLogged,
}) => {
  const t = useTranslations()
  const { toast } = useToast()

  const logout = async () => {
    const { errors, message }: LogoutResponse = await logoutAction()

    if (errors) {
      toast({
        description: errors[0].message,
      })
      return
    }

    toast({
      description: message,
    })

    redirect({ href: '/login', locale })
  }

  return isLogged ? (
    <>
      <Link href={'/account'}>{t('my-account')}</Link>
      <Button onClick={logout}>{t('logout')}</Button>
    </>
  ) : (
    <Link href={'/login'}>{t('login')}</Link>
  )
}

export default AccountLinks
