import { NativeWindStyleSheet, useColorScheme } from 'nativewind'
import { useMMKVString } from 'react-native-mmkv'
import { useCallback } from 'react'
import { mmkv } from '@/utils'

export type Theme = 'dark' | 'light' | 'system'
const SELECTED_THEME = 'SELECTED_THEME'

export function useThemeStore() {
  const { colorScheme, setColorScheme } = useColorScheme()
  const isDark = colorScheme === 'dark'
  const [theme, _setTheme] = useMMKVString(SELECTED_THEME, mmkv)
  const setAndStoreColorScheme = useCallback((newColorScheme: Theme) => {
    setColorScheme(newColorScheme)
    _setTheme(newColorScheme)
  }, [setColorScheme, _setTheme])
  const selectedTheme = (theme ?? 'system') as Theme
  return {
    colorScheme,
    selectedTheme,
    isDark,
    setColorScheme: setAndStoreColorScheme,
  }
}

export function loadSelectedTheme() {
  const theme = mmkv.getString(SELECTED_THEME)
  if (theme !== undefined) {
    // console.log('theme', theme)
    NativeWindStyleSheet.setColorScheme(theme as Theme)
  }
}
