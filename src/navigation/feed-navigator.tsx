import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import { navigate } from './helpers/navigationUtilities'
import { AddPost, Feed, Post } from '@/screens'
import { Pressable, Text } from '@/ui'

export type FeedStackParamList = {
  Feed: undefined
  Post: { id: number }
  AddPost: undefined
}

const Stack = createNativeStackNavigator<FeedStackParamList>()

function GoToAddPost() {
  return (
    <Pressable onPress={() => navigate('AddPost')} className="p-2">
      <Text className="text-primary-300">Create</Text>
    </Pressable>
  )
}

export function FeedNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerRight: () => <GoToAddPost />,
        }}
      >
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="Post" component={Post} />
      </Stack.Group>

      <Stack.Screen name="AddPost" component={AddPost} />
    </Stack.Navigator>
  )
}
