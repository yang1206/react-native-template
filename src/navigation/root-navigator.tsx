import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { NavigationContainer as RNNavigationContainer } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from 'react'
import { NavigationContainer } from './navigation-container'
import { TabNavigator } from './tab-navigator'
import { AuthNavigator } from './auth-navigator'
import { CameraNavigator } from './camera-navigator'
import { useAuthStore } from '@/store'
import { AboutScreen } from '@/screens'
import { useIsFirstTime, useThemeStore } from '@/hooks'
import { Onboarding } from '@/screens/onboarding'

export type AppStackParamList = {
  Tab: undefined
  FeedNavigator: undefined
  CameraNavigator: undefined
  About: undefined
  Auth: undefined
  Onboarding: undefined
}

const Stack = createNativeStackNavigator<AppStackParamList>()

export function Root() {
  const { colorScheme } = useThemeStore()
  const [isFirstTime] = useIsFirstTime()
  const { isAuth } = useAuthStore()

  const hideSplash = React.useCallback(async () => {
    await SplashScreen.hideAsync()
  }, [])
  useEffect(() => {
    if (isAuth)
      hideSplash()
  }, [hideSplash, isAuth])
  const isDark = colorScheme === 'dark'
  return (
    <Stack.Navigator
      screenOptions={{
        headerBlurEffect: isDark ? 'systemMaterialDark' : 'systemMaterialLight',
        headerShown: false,
      }}
    >
      {
        isFirstTime
          ? (
            <Stack.Screen name="Onboarding" component={Onboarding} />
            )
          : (
            <Stack.Group>
              {
                !isAuth
                  ? (
                    <Stack.Screen name="Auth" component={AuthNavigator} />
                    )
                  : (
                    <>
                      <Stack.Screen name="Tab" component={TabNavigator} />
                      <Stack.Screen options={{
                        headerShown: false,
                      }} name="CameraNavigator" component={CameraNavigator} />
                      <Stack.Screen options={{
                        headerShown: true,
                        headerStyle: {
                          backgroundColor: '#00b38a',
                        },
                      }} name="About" component={AboutScreen} />
                    </>
                    )
              }
            </Stack.Group>
            )
      }

    </Stack.Navigator>
  )
}
export interface NavigationProps extends Partial<React.ComponentProps<typeof RNNavigationContainer>> { }

export function RootNavigator(props: NavigationProps) {
  return (
    <NavigationContainer {...props}>
      <Root />
    </NavigationContainer>
  )
}
