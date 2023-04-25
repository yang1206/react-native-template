import React from 'react'
import { ActivityIndicator } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Text } from '../text'
import { View } from '../view'

type Props = {
  isLoading: boolean
}
export const EmptyList = React.memo(({ isLoading }: Props) => {
  return (
    <View className="min-h-[400px] flex-1 items-center justify-center">
      {!isLoading
        ? (
        <View>
            <Ionicons name="documents-outline" />
          <Text className="pt-4 text-center">Sorry! No data found</Text>
        </View>
          )
        : (
        <ActivityIndicator />
          )}
    </View>
  )
})
EmptyList.displayName = 'EmptyList'
