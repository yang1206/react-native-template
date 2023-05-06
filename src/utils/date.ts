import type { Locale } from 'date-fns'
import { format, parseISO } from 'date-fns'

import zh from 'date-fns/locale/zh-CN'
import en from 'date-fns/locale/en-US'
import { getLanguage } from '@/locales'

type Options = Parameters<typeof format>[2]

function getLocale(): Locale {
  const locale = getLanguage()
  return locale === 'zh' ? zh : en
}

export function formatDate(date: string, dateFormat?: string, options?: Options) {
  const locale = getLocale()
  const dateOptions = {
    ...options,
    locale,
  }
  return format(parseISO(date), dateFormat ?? 'MMM dd, yyyy', dateOptions)
}
