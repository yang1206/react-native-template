import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import type { RouteProp } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { ComponentType } from 'react'
import * as React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import type { IconProps } from 'react-native-vector-icons/Icon'
import { useNavigation } from '@react-navigation/native'
import { FeedNavigator } from './feed-navigator'
import { HomeScreen, UserScreen } from '@/screens'
import { TouchableOpacity, colors } from '@/ui'
import { t } from '@/locales'

export type TabParamList = {
  Home: undefined
  FeedNavigator: undefined
  User: undefined
}

interface TabType {
  name: keyof TabParamList
  component: ComponentType<any>
  label: string
}
type TabIconsType = {
  [key in keyof TabParamList]: (props: Partial<IconProps>) => JSX.Element;
}
const Tab = createBottomTabNavigator<TabParamList>()

const tabsIcons: TabIconsType = {
  Home: props => <Ionicons
    name="home-outline"
    {...props}
  />,
  User: props => <Ionicons
    name="person"
    {...props}
  />,
  FeedNavigator: props => <Ionicons
    name="person"
    {...props}
  />,

}

export interface TabList<T extends keyof TabParamList> {
  navigation: NativeStackNavigationProp<TabParamList, T>
  route: RouteProp<TabParamList, T>
}

const tabs: TabType[] = [
  {
    name: 'Home',
    component: HomeScreen,
    label: t('navigation.home'),
  },
  {
    name: 'FeedNavigator',
    component: FeedNavigator,
    label: 'Feed',
  },
  {
    name: 'User',
    component: UserScreen,
    label: t('navigation.user'),
  },
]

interface BarIconType {
  name: keyof TabParamList
  color: string
  size: number
}

function BarIcon({ color, name, size, ...reset }: BarIconType) {
  const Icon = tabsIcons[name]
  return <Icon color={color} size={size} {...reset} />
}
export function TabNavigator() {
  const { navigate } = useNavigation()
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => <BarIcon name={route.name} size={30} color={color} />,
        tabBarActiveTintColor: colors.primary[400],
        tabBarInactiveTintColor: colors.neutral[600],
      })}
    >
      <Tab.Group
      >
        {tabs.map(({ name, component, label }) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={component}
              options={{
                title: label,
                headerShown: name !== 'FeedNavigator',
                headerRight: name === 'Home'
                  ? () => (
                  <TouchableOpacity onPress={() => { navigate('CameraNavigator') }}>
                      <Ionicons color={colors.primary[400]} name="camera-outline" size={30} style={{ marginRight: 10 }}></Ionicons>
                  </TouchableOpacity>
                    )
                  : () => <></>,
              }}
            />
          )
        })}
      </Tab.Group>
    </Tab.Navigator>
  )
}
