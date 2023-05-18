import * as React from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { focusManager } from '@tanstack/react-query'
import FlashMessage from 'react-native-flash-message'
import * as SplashScreen from 'expo-splash-screen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useAppState } from '@react-native-community/hooks'
import * as storage from './utils/storage'
import { NAVIGATION_PERSISTENCE_KEY, useNavigationPersistence } from './navigation'
import { loadSelectedTheme, useOnlineManager } from './hooks'
import { RootNavigator } from '@/navigation'
import { APIProvider } from '@/api'
import { hydrateAuth } from '@/store'

hydrateAuth()
loadSelectedTheme()
SplashScreen.preventAutoHideAsync()

function App() {
  useOnlineManager()
  const state = useAppState()
  if (state === 'active')
    focusManager.setFocused(true)

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
