import * as React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StyleSheet } from 'react-native'
import type { TextKeyPath } from '@/locales'
import { Text, TouchableOpacity, View } from '@/ui'

type ItemProps = {
  text: TextKeyPath
  value?: string
  onPress?: () => void
  icon?: React.ReactNode
}

export function Item({ text, value, icon, onPress }: ItemProps) {
  const isPressable = onPress !== undefined
  const Container = isPressable ? TouchableOpacity : View
  return (
    <Container
      onPress={onPress}
      style={styles.line}
      className="flex-1 flex-row  items-center justify-between  px-[20] py-2"
    >

      <View className="flex-row gap-1 items-center">
        {icon && <View >{icon}</View>}
        <Text className="text-[18px]" tx={text} />
      </View>
      <View className="flex-row  items-center">
        <Text variant="md" className="text-neutral-600">
          {value}
        </Text>
        {isPressable && (
          <View className="pl-2">
            <Ionicons name={'chevron-forward-outline'} size={20} color={'#bbb'}></Ionicons>
          </View>
        )}
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

})
