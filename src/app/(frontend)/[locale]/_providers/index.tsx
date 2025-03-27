import React from 'react'
import { AuthProvider } from '../_providers/Auth'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <AuthProvider>
      {children}
      {/* <CartProvider>{children}</CartProvider> */}
    </AuthProvider>
  )
}
