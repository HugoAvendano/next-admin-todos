'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export const AuthProvider = ({children, ...rest}: Props) => {
  return (
    <SessionProvider>
      { children }
    </SessionProvider>
  )
}
