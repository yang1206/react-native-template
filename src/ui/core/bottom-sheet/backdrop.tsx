import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import { useBottomSheet } from '@gorhom/bottom-sheet'
import React from 'react'
import { Pressable } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

function CustomBackdrop({ style }: BottomSheetBackdropProps) {
  const { close } = useBottomSheet()
  return (
    <AnimatedPressable
      onPress={() => close()}
      entering={FadeIn.duration(50)}
      exiting={FadeOut.duration(20)}

      style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.4)' }]}
    />
  )
}

export function renderBackdrop(props: BottomSheetBackdropProps) {
  return <CustomBackdrop {...props} />
}

export default CustomBackdrop
