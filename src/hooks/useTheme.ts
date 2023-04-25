import { useColorScheme } from 'nativewind'
import { setItem } from '@/utils'

export type Theme = 'dark' | 'light' | 'system'

export interface ThemeState {
  colorScheme: Theme
  setColorScheme: (colorSchemeSystem: Theme) => void
  toggleColorScheme: () => void

}
export function useThemeStore() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme()
  const isDark = colorScheme === 'dark'
  const setAndStoreColorScheme = async (newColorScheme: Theme) => {
    setColorScheme(newColorScheme)
    setItem('appColorScheme', newColorScheme)
  }

  return {
    colorScheme,
    isDark,
    setColorScheme: setAndStoreColorScheme,
    toggleColorScheme,
  }
}
