import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import * as React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Item } from './item'
import { t, useSelectedLanguage } from '@/locales'
import type { IOption } from '@/ui'
import { Options } from '@/ui'
import type { Language } from '@/locales/translations/resources'

export function LanguageItem() {
  const { language, setLanguage } = useSelectedLanguage()
  const optionsRef = React.useRef<BottomSheetModal>(null)
  const open = React.useCallback(() => optionsRef.current?.present(), [])
  const onSelect = React.useCallback(
    (option: IOption) => {
      setLanguage(option.value as Language)
      optionsRef.current?.dismiss()
    },
    [setLanguage],
  )

  const langs = React.useMemo(
    () => [
      { label: t('UserScreen.english'), value: 'en' },
      { label: t('UserScreen.chinese'), value: 'zh' },
    ],
    [],
  )

  const selectedLanguage = React.useMemo(
    () => langs.find(lang => lang.value === language),
    [language, langs],
  )

  return (
    <>
      <Item
        icon={<Ionicons name={'language-outline'} size={20} color={'#22d'}></Ionicons>}
        text="UserScreen.language"
        value={selectedLanguage?.label}
        onPress={open}
      />
      <Options
        ref={optionsRef}
        options={langs}
        onSelect={onSelect}
        value={selectedLanguage?.value}
      />
    </>
  )
}
