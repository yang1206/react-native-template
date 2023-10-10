import { useFlipper } from '@react-navigation/devtools'
import {
  createNavigationContainerRef,
  NavigationContainer as RNNavigationContainer,
} from '@react-navigation/native'
import * as React from 'react'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'

import type { NavigationProps } from './root-navigator'
import { useThemeConfig } from './use-theme-config'
export const navigationRef = createNavigationContainerRef()

export const NavigationContainer = (props: NavigationProps) => {
  useFlipper(navigationRef)
  const theme = useThemeConfig()
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <RNNavigationContainer ref={navigationRef} {...props} theme={theme}>
        {props.children}
      </RNNavigationContainer>
    </SafeAreaProvider>
  )
}
