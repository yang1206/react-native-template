import { JSONParse, getItem } from '@/utils'

export function getToken(): string {
  return JSONParse(getItem('auth-storage')).state.token
}
