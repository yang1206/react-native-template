import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { LoginScreen as Login } from '@/screens'

export type AuthStackParamList = {
  Login: undefined
}

const Stack = createNativeStackNavigator<AuthStackParamList>()

export function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
