import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native'
import * as React from 'react'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import { useFlipper } from '@react-navigation/devtools'
import { navigationRef } from './helpers/navigationUtilities'
import { useThemeConfig } from './use-theme-config'
import { ErrorHandler, StatusBar } from '@/ui'
import { useThemeStore } from '@/hooks'

export interface NavigationProps extends Partial<React.ComponentProps<typeof RNNavigationContainer>> { }

export function NavigationContainer(props: NavigationProps) {
  useFlipper(navigationRef)
  const theme = useThemeConfig()
  const { isDark } = useThemeStore()
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar isDarkStyle={isDark}></StatusBar>
      <ErrorHandler>
          <RNNavigationContainer
            {...props}
            ref={navigationRef}
            theme={theme}
          >{props.children}
          </RNNavigationContainer>
      </ErrorHandler>
    </SafeAreaProvider>
  )
}
