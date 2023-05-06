import React from 'react'
import { View } from 'react-native'

type Props = {
  children: React.ReactNode
}

export function Screen({ children }: Props) {
  return <View className="flex flex-1 flex-col justify-center bg-white px-2">
    {children}
  </View>
}
