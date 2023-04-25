import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Item } from './item'
import { useThemeStore } from '@/hooks'
import { t } from '@/locales'
import type { IOption } from '@/ui'

import { Options } from '@/ui'

export function ThemeItem() {
  const { colorScheme, setColorScheme } = useThemeStore()

  const optionsRef = React.useRef<BottomSheetModal>(null)
  const open = React.useCallback(() => optionsRef.current?.present(), [])
  const onSelect = React.useCallback(
    (option: IOption) => {
      setColorScheme(option.value as 'light' | 'dark')
      optionsRef.current?.dismiss()
    },
    [setColorScheme],
  )

  const themes = React.useMemo(
    () => [
      { label: `${t('UserScreen.dark')} 🌙`, value: 'dark' },
      { label: `${t('UserScreen.light')} 🌞`, value: 'light' },
      { label: `${t('UserScreen.system')}`, value: 'system' },
    ],
    [],
  )

  const selectedTheme = React.useMemo(
    () => themes.find(theme => theme.value === colorScheme),
    [colorScheme, themes],
  )

  return (
    <>
      <Item
        icon={<Ionicons name={'cloudy-night-outline'} size={20} color={'#22d'}></Ionicons>}
      text="UserScreen.theme" value={selectedTheme?.label} onPress={open} />
      <Options
        ref={optionsRef}
        options={themes}
        onSelect={onSelect}
        value={selectedTheme?.value}
      />
    </>
  )
}
