'use client'

import { User } from '@/payload-types'
import React, { createContext, useContext, useState } from 'react'

type AuthContext = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  isLogged: boolean
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
}

const Context = createContext({} as AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLogged, setIsLogged] = useState<boolean>(false)
  console.log('AuthProvider', isLogged)

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
      }}
    >
      {children}
    </Context.Provider>
  )
}

// type UseAuth<T = User> = () => AuthContext

export const useAuth = () => useContext(Context)
