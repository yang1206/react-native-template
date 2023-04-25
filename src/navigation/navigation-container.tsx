import { DarkTheme, DefaultTheme, NavigationContainer as RNNavigationContainer } from '@react-navigation/native'
import * as React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import { useFlipper } from '@react-navigation/devtools'
import { navigationRef } from './helpers/navigationUtilities'
import { useThemeStore } from '@/hooks'

export interface NavigationProps extends Partial<React.ComponentProps<typeof RNNavigationContainer>> { }

export function NavigationContainer(props: NavigationProps) {
  const { colorScheme } = useThemeStore()
  useFlipper(navigationRef)
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RNNavigationContainer
          {...props}
          ref={navigationRef}
          theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >{props.children}
        </RNNavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
