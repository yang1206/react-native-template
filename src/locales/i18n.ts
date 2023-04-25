import i18n from 'i18next'
import { I18nManager } from 'react-native'
import { SupportedLanguage } from './constants'
import type { Translations } from './translations/en'
import { resources } from './translations/resources'
import { getLanguage } from './utils'

export const LanguageReadable = {
  [SupportedLanguage.ZH]: '简体中文',
  [SupportedLanguage.EN]: 'English',
}

i18n.init({
  compatibilityJSON: 'v3',
  debug: false,
  lng: getLanguage(),
  fallbackLng: SupportedLanguage.EN,
  supportedLngs: [SupportedLanguage.EN, SupportedLanguage.ZH],
  nonExplicitSupportedLngs: true,
  resources,
})
export const isRTL: boolean = i18n.dir() === 'rtl'

I18nManager.allowRTL(isRTL)
I18nManager.forceRTL(isRTL)
export { i18n }

/**
 * Builds up valid keypaths for translations.
 */
export type TextKeyPath = RecursiveKeyOf<Translations>

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>;
}[keyof TObj & (string | number)]

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >;
}[keyof TObj & (string | number)]

type RecursiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
  ? Text
  : TValue extends object
    ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
    : Text
