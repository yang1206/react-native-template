import en from './en'
import zh from './zh-cn'

export type Translations = typeof zh
export const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
}

export type Language = keyof typeof resources
