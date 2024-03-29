import 'react-native-gesture-handler'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useAppState } from '@react-native-community/hooks'
import { focusManager } from '@tanstack/react-query'
import * as SplashScreen from 'expo-splash-screen'
import React from 'react'
import { StyleSheet } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { APIProvider } from '@/api'
import { loadSelectedTheme, useOnlineManager } from '@/hooks'
import { RootNavigator } from '@/navigation'
import { hydrateAuth } from '@/stores'

hydrateAuth()
loadSelectedTheme()
SplashScreen.preventAutoHideAsync()

const App = () => {
  useOnlineManager()
  const state = useAppState()
  if (state === 'active') focusManager.setFocused(true)
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <APIProvider>
          <RootNavigator />
          <FlashMessage position="top" />
        </APIProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App
