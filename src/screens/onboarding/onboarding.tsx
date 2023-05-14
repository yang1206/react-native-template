import React from 'react'
import { Cover } from './cover'
import { useIsFirstTime } from '@/hooks'
import { Button, SafeAreaView, Text, View } from '@/ui'

export function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime()
  return (
    <View className="flex h-full items-center pt-20  justify-center bg-white text-gray-600">
      <View className="w-full flex-1">
        <Cover />
      </View>

      <View className="justify-end ">
        <Text className="my-3 text-center text-5xl font-bold text-gray-600">
          React Native Starter
        </Text>
        <Text className="mb-2 text-center text-lg text-gray-600">
          The right way to build your mobile app
        </Text>

        <Text className="my-1 pt-6 text-left text-lg text-gray-600">
          🚀 Production-ready{' '}
        </Text>
        <Text className="my-1 text-left text-lg text-gray-600">
          🥷 Developer experience + Productivity
        </Text>
        <Text className="my-1 text-left text-lg text-gray-600">
          🧩 Minimal code and dependencies
        </Text>
        <Text className="my-1 text-left text-lg text-gray-600">
          💪 well maintained third-party libraries
        </Text>
      </View>
      <SafeAreaView className="mt-6">
        <Button
          label="Let's Get Started "
          onPress={() => {
            setIsFirstTime(false)
          }}
        />
      </SafeAreaView>
    </View>
  )
}
