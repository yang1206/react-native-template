import { useMMKVBoolean } from 'react-native-mmkv'

import { mmkv } from '@/utils'

const IS_FIRST_TIME = 'IS_FIRST_TIME'

export const useIsFirstTime = () => {
  const [isFirstTime, setIsFirstTime] = useMMKVBoolean(IS_FIRST_TIME, mmkv)
  if (isFirstTime === undefined) {
    return [true, setIsFirstTime] as const
  }
  return [isFirstTime, setIsFirstTime] as const
}
