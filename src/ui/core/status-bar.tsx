import type { StatusBarProps } from 'react-native'
import { StatusBar as NStatusBar, View } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'

type Props = { isDarkStyle?: boolean } & StatusBarProps
function StatusBarComp(props: Props) {
  const { isDarkStyle = true, backgroundColor = 'transparent' } = props
  const STATUS_BAR_HEIGHT = 0
  return (
    <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor }}>
      <NStatusBar
        translucent={true}
        backgroundColor={backgroundColor}
        barStyle={isDarkStyle ? 'light-content' : 'dark-content'}
      />
    </View>
  )
}
export const StatusBar = styled(StatusBarComp)
