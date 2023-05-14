import React, { useEffect, useMemo } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { BlurView } from '@react-native-community/blur'
import TopSection from './top-section'
import BottomForm from './bottom-form'
import { SafeAreaView, View } from '@/ui'

// 适应不同屏幕高度
function BottomUpAnimation() {
  const translateY = useSharedValue(0)
  const scale = useSharedValue(1)
  useEffect(() => {
    translateY.value = 300
    translateY.value = withTiming(0, { duration: 1000 })
  }, [translateY])
  // 定义手势事件处理函数

  const panGesture = useMemo(() => (
    Gesture.Pan()
      .minDistance(20)
      .onChange((e) => {
        'worklet'
        translateY.value = e.translationY
        scale.value = e.translationY > 0 ? 1 - e.translationY / 1000 : 1
      })
      .onEnd(() => {
        'worklet'
        translateY.value = withSpring(0)
        scale.value = withSpring(1)
      })
  ), [translateY, scale])

  // 定义动画样式
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { scaleX: scale.value },
        { scaleY: scale.value },
      ],

    }
  })

  return (
    <>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]} >
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
          <View style={styles.contentWrapper}>
            <BlurView style={styles.blur} blurAmount={25}
              blurType="light"
              reducedTransparencyFallbackColor="rgba(140, 140, 140, 0.3)" />
            {/* 顶部欢迎词与图标 */}
            <TopSection />

            {/* 底部滑动表单 */}
            <View style={styles.bottom}>

              <GestureDetector
                gesture={panGesture}
                >
                <Animated.View style={[styles.animatedView, animatedStyle]}>
                  <View style={styles.card} className="bg-white dark:bg-black" />
                  <BottomForm translateY={translateY} />
                </Animated.View>
              </GestureDetector>

            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </>

  )
}

const styles = StyleSheet.create({
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: Dimensions.get('screen').height,
  },
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  bottom: {
    flex: 1,
  },
  card: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -100,
    top: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  contentWrapper: {
    flex: 1,
    paddingBottom: 20,
  },
  animatedView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%', // 修改高度为 100%
    paddingHorizontal: 20,
  },
})

export default BottomUpAnimation
