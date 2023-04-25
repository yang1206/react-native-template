import { DevSettings } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin'

export const mmkv = new MMKV({
  id: 'default',
})
if (__DEV__)
  initializeMMKVFlipper({ default: mmkv })

export function setItem(key: string, value: boolean | string | number | Uint8Array | object) {
  mmkv.set(key, typeof value === 'object' ? JSON.stringify(value) : value)
}

export function setObject(key: string, value: object) {
  mmkv.set(key, JSON.stringify(value))
}

export function getItem(key: string, type: 'number' | 'string' | 'boolean' | 'object' = 'string') {
  switch (type) {
    case 'boolean':
      return mmkv.getBoolean(key)
    case 'number':
      return mmkv.getNumber(key)
    case 'object':
      return JSONParse(mmkv.getString(key))
    default:
      return mmkv.getString(key)
  }
}

export function removeItem(key: string) {
  mmkv.delete(key)
}

export function clear() {
  return mmkv.clearAll()
}

export function getAllKeys() {
  return mmkv.getAllKeys()
}

export function JSONParse(data?: any) {
  if (!data)
    return null

  try {
    return JSON.parse(data)
  }
  catch (error) {
    if (__DEV__)
      console.error('[JSONParse]', error)

    return null
  }
}

export function JSONStringify(data?: string) {
  if (!data)
    return null

  try {
    return JSON.stringify(data)
  }
  catch (error) {
    if (__DEV__)
      console.error('[JSONParse]', error)

    return null
  }
}

if (__DEV__) {
  DevSettings.addMenuItem('Clear Persisted', () => {
    clear()
    DevSettings.reload()
  })
}

export interface clientStorage {
  getItem: (name: string) => string | null | Promise<string | null>
  setItem: (name: string, value: string) => void | Promise<void>
  removeItem: (name: string) => void | Promise<void>
}

export const mmkvStorage: clientStorage = {
  setItem: (key, value) => setItem(key, value),
  getItem: key => getItem(key) || null,
  removeItem: key => removeItem(key),
}
