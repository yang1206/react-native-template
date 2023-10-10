import type TranslateOptions from 'i18next'
import i18n from 'i18next'
import memoize from 'lodash.memoize'
import { useCallback } from 'react'
import { I18nManager, NativeModules } from 'react-native'
import RNRestart from 'react-native-restart'

import { getItem, setItem } from '@/utils'

import { preferredLocale } from './helpers/preferred-locale'
import type { Language, resources } from './resources'
import type { RecursiveKeyOf } from './types'

type DefaultLocale = typeof resources.en.translation
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>

export const LOCAL = 'local'

export function getLanguage() {
  return getItem(LOCAL) || preferredLocale.languageCode
}
export const translate = memoize(
  (key: TxKeyPath, options = undefined) =>
    i18n.t(key, options) as unknown as string,
  (key: TxKeyPath, options: typeof TranslateOptions) =>
    options ? key + JSON.stringify(options) : key
)

export const changeLanguage = (lang: Language) => {
  i18n.changeLanguage(lang)
  if (lang === 'ar') {
    I18nManager.forceRTL(true)
  } else {
    I18nManager.forceRTL(false)
  }
  if (__DEV__) NativeModules.DevSettings.reload()
  else RNRestart.restart()
}

export const useSelectedLanguage = () => {
  const setLanguage = useCallback((lang: Language) => {
    if (getLanguage() === lang) return
    setItem(LOCAL, lang)
    if (lang !== undefined) changeLanguage(lang as Language)
  }, [])

  return { language: getLanguage() as Language, setLanguage }
}
