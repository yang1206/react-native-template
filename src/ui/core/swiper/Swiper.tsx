import React from 'react'
import type { TCarouselProps } from 'react-native-reanimated-carousel'
import Carousel from 'react-native-reanimated-carousel'
import type { AnimatedStyleProp } from 'react-native-reanimated'
import Animated, {
  interpolate, interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import type { ViewStyle } from 'react-native'
import { Dimensions, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import PaginationItem from './PaginationItem'

const { width: PAGE_WIDTH } = Dimensions.get('window')
export type TAnimationStyle = (value: number) => AnimatedStyleProp<ViewStyle>

interface ItemProps {
  index: number
  animationValue: Animated.SharedValue<number>
  item: { id: number; image: string }
}
const CustomItem: React.FC<ItemProps> = ({ index, animationValue, item }) => {
  const maskStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ['#000000dd', 'transparent', '#000000dd'],
    )

    return {
      backgroundColor,
    }
  }, [animationValue])

  return (
    <View style={{ flex: 1 }}>
      <FastImage style={{ height: PAGE_WIDTH / 1.5, borderRadius: 0 }} source={{ uri: item.image }}></FastImage>
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          maskStyle,
        ]}
      />
    </View>
  )
}

export type ISwiper = Omit<TCarouselProps, 'renderItem' | 'mode' | 'modeConfig'> & {
  data: Array<{ id: number | string; image: string }>
}

export default function Swiper(props: ISwiper) {
  const animationStyle: TAnimationStyle = React.useCallback(
    (value: number) => {
      'worklet'

      const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30])
      const translateX = interpolate(
        value,
        [-2, 0, 1],
        [-PAGE_WIDTH, 0, PAGE_WIDTH],
      )

      return {
        transform: [{ translateX }],
        zIndex,
      }
    },
    [],
  )
  const progressValue = useSharedValue<number>(0)
  return (
    <>
      <Carousel
        {...props}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        width={props.width as number}
        height={props.height as number}
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        mode="parallax"
        renderItem={({ item, index, animationValue }) => (
          <CustomItem index={index} animationValue={animationValue} item={item}/>
        )}
        customAnimation={animationStyle}
      />
      {
        !!progressValue && (
          <View
          className="relative bottom-5"
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 35,
              alignSelf: 'center',
            }}>
            {props.data.map((item, index) => {
              return (
                <PaginationItem
                  backgroundColor={'skyblue'}
                  inActiveColor={'grey'}
                  animValue={progressValue}
                  index={index}
                  key={item.id}
                  isRotate={props.vertical}
                  length={props.data.length}
                />
              )
            })}
          </View>
        )
      }
    </>
  )
}
