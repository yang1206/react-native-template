import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { getToken, mmkvStorage } from '@/utils'

export interface AuthState {
  token: string | null
  isAuth: boolean
  login: (token: string) => void
  logout: () => void
  hydrate: () => void
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
      hydrate: () => {
        try {
          const userToken = getToken()

          if (userToken !== null)
            get().login(userToken)

          else
            get().logout()
        }
        catch (e) {
          // catch error here
          // Maybe sign_out user!
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
)

export const signOut = () => useAuthStore.getState().logout()
export const signIn = (token: string) => useAuthStore.getState().login(token)
export const hydrateAuth = () => useAuthStore.getState().hydrate()
