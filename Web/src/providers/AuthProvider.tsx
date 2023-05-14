import React, { createContext, useContext, useState } from 'react'
import { apiPublic } from '../tools/instance'
import { Navigate, useLocation } from 'react-router-dom'

interface AuthContextType {
  token: string | null
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  signIn: async () => await Promise.resolve(false),
  signOut: () => { }
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

  const signIn = async (login: string, password: string) => {
    try {
      const response = await apiPublic.post('/signin', {
        login,
        password
      })
      const { token } = response.data
      setToken(token)
      localStorage.setItem('token', token)
      return true
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la connexion.', error)
      setToken(null)
      localStorage.removeItem('token')
      return false
    }
  }

  const signOut = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  const authContextValue: AuthContextType = {
    token,
    signIn,
    signOut
  }

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { token } = useAuth()
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
