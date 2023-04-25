import { useCallback } from 'react'
import { NativeModules } from 'react-native'
import { i18n } from './i18n'
import type { Language } from './translations/resources'
import { preferredLocale } from './helpers/preferredLocale'
import { getItem, setItem } from '@/utils'

export const LOCAL = 'local'

export function getLanguage(): Language {
  return getItem(LOCAL) || preferredLocale.languageCode
}

export function changeLanguage(lang: Language) {
  i18n.changeLanguage(lang)

  if (__DEV__)
    NativeModules.DevSettings.reload()
  else NativeModules.DevSettings.reload()
}

export function useSelectedLanguage() {
  const setLanguage = useCallback(
    (lang: Language) => {
      if (getLanguage() === lang)
        return

      setItem(LOCAL, lang)
      if (lang !== undefined)
        changeLanguage(lang as Language)
    },
    [setItem],
  )

  return { language: getLanguage() as Language, setLanguage }
}
