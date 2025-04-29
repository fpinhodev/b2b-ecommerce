import React from 'react'
import verifySessionToken from '../_utils/verifySessionToken'
import { CartProvider } from './Cart'

export const Providers: React.FC<{
  children: React.ReactNode
}> = async ({ children }) => {
  const { user } = await verifySessionToken()
  return <CartProvider user={user}>{children}</CartProvider>
}
