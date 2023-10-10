import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { TokenType } from '@/utils'
import {
  createSelectors,
  getToken,
  mmkvStorage,
  removeToken,
  setToken,
} from '@/utils'

export interface AuthState {
  token: TokenType | null
  status: 'idle' | 'signOut' | 'signIn'
  signIn: (data: TokenType) => void
  signOut: () => void
  hydrate: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get, _api) => ({
      status: 'idle',
      token: null,
      signIn: (token) => {
        setToken(token)
        set({ status: 'signIn', token })
      },
      signOut: () => {
        removeToken()
        set({ status: 'signOut', token: null })
      },
      hydrate: () => {
        try {
          const userToken = getToken()
          if (userToken !== null) {
            get().signIn(userToken)
          } else {
            get().signOut()
          }
        } catch (e) {
          // catch error here
          // Maybe sign_out user!
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
)

export const useAuth = createSelectors(useAuthStore)
export const signOut = () => useAuthStore.getState().signOut()
export const signIn = (token: TokenType) =>
  useAuthStore.getState().signIn(token)
export const hydrateAuth = () => useAuthStore.getState().hydrate()
