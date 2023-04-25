import type { ScrollViewProps, ViewStyle } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import type { SafeAreaViewProps } from 'react-native-safe-area-context'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styled } from 'nativewind'

interface SafeAreaScrollViewProps extends ScrollViewProps {
  safeAreaProps?: SafeAreaViewProps
}

function styledSafeAreaScrollView({
  children,
  safeAreaProps,
  ...scrollViewProps
}: SafeAreaScrollViewProps): JSX.Element {
  return (
    <SafeAreaView
      edges={['left', 'right']}
      {...safeAreaProps}
      style={[$defaultSafeAreaStyle, safeAreaProps?.style]}
    >
      <ScrollView contentInsetAdjustmentBehavior="automatic" {...scrollViewProps}>
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}

const $defaultSafeAreaStyle: ViewStyle = {
  flex: 1,
}

export const SafeAreaScrollView = styled(styledSafeAreaScrollView)
