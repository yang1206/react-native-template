import { useColorScheme } from 'nativewind'

export function useDark() {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const isDark = colorScheme === 'dark'
  return { isDark, toggleColorScheme }
}
