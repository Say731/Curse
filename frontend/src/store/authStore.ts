import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
import toast from 'react-hot-toast'

interface User {
  username: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  initializeAuth: () => void
}

const API_BASE_URL = 'http://localhost:8000'

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: true,

      login: async (username: string, password: string) => {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            username,
            password,
          })
          
          const { access_token, user } = response.data
          
          // Set up axios defaults
          axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
          
          set({ user, token: access_token })
          toast.success('Login successful!')
          return true
        } catch (error: any) {
          const message = error.response?.data?.detail || 'Login failed'
          toast.error(message)
          return false
        }
      },

      register: async (username: string, email: string, password: string) => {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/register`, {
            username,
            email,
            password,
          })
          
          const { access_token, user } = response.data
          
          // Set up axios defaults
          axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
          
          set({ user, token: access_token })
          toast.success('Registration successful!')
          return true
        } catch (error: any) {
          const message = error.response?.data?.detail || 'Registration failed'
          toast.error(message)
          return false
        }
      },

      logout: () => {
        delete axios.defaults.headers.common['Authorization']
        set({ user: null, token: null })
        toast.success('Logged out successfully')
      },

      initializeAuth: () => {
        const { token } = get()
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          // Verify token validity
          axios.get(`${API_BASE_URL}/auth/me`)
            .then(response => {
              set({ user: response.data, isLoading: false })
            })
            .catch(() => {
              // Token is invalid
              set({ user: null, token: null, isLoading: false })
              delete axios.defaults.headers.common['Authorization']
            })
        } else {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
)