import { StatusBar as NStatusBar } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'
import { View } from '@/ui'

function StatusBarComp(props: { isDarkStyle: boolean; statusBarBgColor?: string }) {
  const { isDarkStyle = true, statusBarBgColor = 'transparent' } = props
  const STATUS_BAR_HEIGHT = 0
  return (
    <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: statusBarBgColor }}>
      <NStatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={isDarkStyle ? 'dark-content' : 'light-content'}
      />
    </View>
  )
}
export const StatusBar = styled(StatusBarComp)
