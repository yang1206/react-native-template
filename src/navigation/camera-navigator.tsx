import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import { CameraScreen, MediaScreen } from '@/screens'

export type CameraStackParamList = {
  Camera: undefined
  Media: {
    path: string
    type: 'video' | 'photo'
  }
}

const Stack = createNativeStackNavigator<CameraStackParamList>()

export function CameraNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={
          {
            headerShown: false,
          }
        }
      >
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Media" component={MediaScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}
