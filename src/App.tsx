import * as React from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import type { AppStateStatus } from 'react-native'
import { Platform } from 'react-native'
import { focusManager } from '@tanstack/react-query'
import FlashMessage from 'react-native-flash-message'
import { useEffect } from 'react'
import * as storage from './utils/storage'
import { NAVIGATION_PERSISTENCE_KEY, useNavigationPersistence } from './navigation'
import { useAppState, useOnlineManager, useThemeStore } from './hooks'
import { getItem } from './utils/storage'
import { RootNavigator } from '@/navigation'
import { APIProvider } from '@/api'

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web')
    focusManager.setFocused(status === 'active')
}

function App() {
  useOnlineManager()

  useAppState(onAppStateChange)
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const { colorScheme, setColorScheme } = useThemeStore()

  useEffect(() => {
    (async () => {
      const storedColorScheme = getItem('appColorScheme')
      if (storedColorScheme)
        setColorScheme(storedColorScheme)
    })()
  }, [])
  return (
    <BottomSheetModalProvider>
      <APIProvider>
        <RootNavigator
          {...(__DEV__
            ? {
                initialState: initialNavigationState,
                onStateChange: onNavigationStateChange,
              }
            : {})}
          />
        <FlashMessage position="top" />
      </APIProvider>
    </BottomSheetModalProvider>

  )
}

export default App
