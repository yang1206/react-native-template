import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { mmkvStorage } from '@/utils'

export interface AuthState {
  token: string | null
  isAuth: boolean
  login: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get, api) => ({
      token: null,
      isAuth: false,
      login: async (token) => {
        set({ token, isAuth: true })
      },
      logout: async () => {
        set({ token: null, isAuth: false })
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
)
