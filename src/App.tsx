import * as React from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import type { AppStateStatus } from 'react-native'
import { Platform } from 'react-native'
import { focusManager } from '@tanstack/react-query'
import FlashMessage from 'react-native-flash-message'
import * as SplashScreen from 'expo-splash-screen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as storage from './utils/storage'
import { NAVIGATION_PERSISTENCE_KEY, useNavigationPersistence } from './navigation'
import { loadSelectedTheme, useAppState, useOnlineManager } from './hooks'
import { RootNavigator } from '@/navigation'
import { APIProvider } from '@/api'
import { hydrateAuth } from '@/store'

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web')
    focusManager.setFocused(status === 'active')
}

hydrateAuth()
loadSelectedTheme()
SplashScreen.preventAutoHideAsync()

function App() {
  useOnlineManager()
  useAppState(onAppStateChange)
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>

  )
}

export default App
