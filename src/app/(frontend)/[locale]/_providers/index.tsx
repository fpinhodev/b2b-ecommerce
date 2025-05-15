import { verifySession } from '@/lib/session'
import React from 'react'
import { CartProvider } from './Cart'

export const Providers: React.FC<{
  children: React.ReactNode
}> = async ({ children }) => {
  const { user } = await verifySession()
  return <CartProvider user={user}>{children}</CartProvider>
}
