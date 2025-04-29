'use client'

import { Link, redirect } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { TypedLocale } from 'payload'
import { LogoutResponse, logout as logoutAction } from '../../../(pages)/(auth)/_server/logout'
import { useToast } from '../../../_hooks/use-toast'
import { Button } from '../../ui/button'
import CartBadge from '../CartBadge'

const AccountLinks = ({ locale, isLogged }: { locale: TypedLocale; isLogged: boolean }) => {
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
      <Link href={'/account'} className="hover:underline">
        {t('my-account')}
      </Link>
      <CartBadge />
      <Button onClick={logout}>{t('logout')}</Button>
    </>
  ) : (
    <Link href={'/login'}>{t('login')}</Link>
  )
}

export default AccountLinks
