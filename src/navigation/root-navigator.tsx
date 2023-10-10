import type { NavigationContainer as RNNavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as SplashScreen from 'expo-splash-screen'
import { useColorScheme } from 'nativewind'
import React, { useEffect } from 'react'

import { useIsFirstTime } from '@/hooks'
import { Onboarding } from '@/screens'
import { useAuth } from '@/stores'

import { AuthNavigator } from './auth-navigator'
import { NavigationContainer } from './navigation-container'
import { TabNavigator } from './tab-navigator'

export type AppStackParamList = {
  App: undefined
  Feed: undefined
  About: undefined
  Auth: undefined
  Onboarding: undefined
}

const Stack = createNativeStackNavigator<AppStackParamList>()

export const Root = () => {
  const { colorScheme } = useColorScheme()

  const status = useAuth.use.status()
  const [isFirstTime] = useIsFirstTime()
  const hideSplash = React.useCallback(async () => {
    await SplashScreen.hideAsync()
  }, [])
  useEffect(() => {
    if (status !== 'idle') {
      hideSplash()
    }
  }, [hideSplash, status])

  return (
    <Stack.Navigator
      screenOptions={{
        headerBlurEffect:
          colorScheme === 'dark' ? 'systemMaterialDark' : 'systemMaterialLight',
        headerShown: false,
        gestureEnabled: false,
        animation: 'none',
      }}
    >
      {isFirstTime ? (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      ) : (
        <Stack.Group>
          {status === 'signOut' ? (
            <Stack.Screen name="Auth" component={AuthNavigator} />
          ) : (
            <Stack.Screen name="App" component={TabNavigator} />
          )}
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof RNNavigationContainer>> {}

export const RootNavigator = (props: NavigationProps) => {
  return (
    <NavigationContainer {...props}>
      <Root />
    </NavigationContainer>
  )
}
