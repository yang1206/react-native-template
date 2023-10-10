import { getItem, removeItem, setItem } from './storage'

const TOKEN = 'token'

export type TokenType = {
  access: string
  refresh: string
}

export const getToken = () => getItem<TokenType>(TOKEN, 'object') as TokenType
export const removeToken = () => removeItem(TOKEN)
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value)
