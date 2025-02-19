'use client'

import { Link, redirect } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { TypedLocale } from 'payload'
import { useToast } from '../../../_hooks/use-toast'
import { logout as logoutAction, LogoutResponse } from '../../../_server/logout'
import { Button } from '../../ui/button'

const AccountLinks: React.FC<{ isLogged: boolean; locale: TypedLocale }> = ({
  isLogged,
  locale,
}) => {
  const t = useTranslations()
  const { toast } = useToast()
  const logout = async () => {
    const { message }: LogoutResponse = await logoutAction()
    toast({
      description: message,
    })
    // Redirect to the login page
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
