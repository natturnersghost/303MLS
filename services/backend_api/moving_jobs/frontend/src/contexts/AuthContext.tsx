'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  isAuthenticated: boolean
  user: { id: number; username: string } | null
  login: (token: string, userData: { user_id: number; username: string }) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ id: number; username: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if token exists on mount
    const token = localStorage.getItem('access_token')
    if (token) {
      setIsAuthenticated(true)
      const userData = JSON.parse(localStorage.getItem('user') || '{}')
      setUser(userData)
    }
  }, [])

  const login = (token: string, userData: { user_id: number; username: string }) => {
    localStorage.setItem('access_token', token)
    localStorage.setItem('user', JSON.stringify({ id: userData.user_id, username: userData.username }))
    setIsAuthenticated(true)
    setUser({ id: userData.user_id, username: userData.username })
    
    // Set cookie (expires in 7 days)
    document.cookie = `access_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    setIsAuthenticated(false)
    setUser(null)
    router.push('/sign_in')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
