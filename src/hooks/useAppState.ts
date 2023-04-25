import { useEffect } from 'react'
import type { AppStateStatus } from 'react-native'
import { AppState } from 'react-native'

export function useAppState(onChange: (status: AppStateStatus) => void) {
  useEffect(() => {
    AppState.addEventListener('change', onChange)
  }, [onChange])
}
