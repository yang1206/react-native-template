import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Item } from './item'
import type { Theme } from '@/hooks'
import { useThemeStore } from '@/hooks'
import { t } from '@/locales'
import type { IOption } from '@/ui'

import { Options } from '@/ui'

export function ThemeItem() {
  const { colorScheme, selectedTheme, setColorScheme } = useThemeStore()

  const optionsRef = React.useRef<BottomSheetModal>(null)
  const open = React.useCallback(() => optionsRef.current?.present(), [])
  const onSelect = React.useCallback(
    (option: IOption) => {
      setColorScheme(option.value as Theme)
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

  const theme = React.useMemo(
    () => themes.find(theme => theme.value === selectedTheme),
    [selectedTheme, themes],
  )

  return (
    <>
      <Item
        icon={<Ionicons name={'cloudy-night-outline'} size={20} color={'#22d'}></Ionicons>}
        text="UserScreen.theme" value={theme?.label} onPress={open} />
      <Options
        ref={optionsRef}
        options={themes}
        onSelect={onSelect}
        value={theme?.value}
      />
    </>
  )
}
