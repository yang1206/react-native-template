import React from 'react'
import { ColorVariants } from './color-variants'
import { ButtonVariants } from './button-variants'
import { InputVariants } from './input-variants'
import { TextVariants } from './text-variants'
import { SafeAreaScrollView, View } from '@/ui'

export default function Home() {
  return (
    <SafeAreaScrollView className="bg-white dark:bg-gray-950">
      <View className="flex-1  px-4 pt-10">
        <TextVariants />
        <ColorVariants />
        <InputVariants />
        <ButtonVariants />
      </View>
    </SafeAreaScrollView>
  )
}
