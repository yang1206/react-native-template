import type { BlurViewProps } from '@react-native-community/blur'
import { BlurView } from '@react-native-community/blur'
import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const FALLBACK_COLOR = 'rgba(140, 140, 140, 0.3)'

function StatusBarBlurBackgroundImpl({ style, ...props }: BlurViewProps): React.ReactElement | null {
  const { top } = useSafeAreaInsets()
  const styles = StyleSheet.create({
    statusBarBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: top,
    },
  })
  if (Platform.OS !== 'ios')
    return null
  return (
    <BlurView
      style={[styles.statusBarBackground, style]}
      blurAmount={25}
      blurType="light"
      reducedTransparencyFallbackColor={FALLBACK_COLOR}
      {...props}
    />
  )
}

export const StatusBarBlurBackground = React.memo(StatusBarBlurBackgroundImpl)
