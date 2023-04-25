import React from 'react'
import { Card } from './card'
import type { Post } from '@/api'
import { usePosts } from '@/api'
import { EmptyList, List, Text, View } from '@/ui'
import { navigate } from '@/navigation'

export function Feed() {
  const { data, isLoading, isError } = usePosts()

  const renderItem = React.useCallback(
    ({ item }: { item: Post }) => (
      <Card {...item} onPress={() => navigate('Post', { id: item.id })} />
    ),
    [navigate],
  )
  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    )
  }
  return (
    <View className="flex-1 bg-white dark:bg-gray-950">
      <List
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        estimatedItemSize={300}
      />
    </View>
  )
}
