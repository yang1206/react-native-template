// This is the entry point if you run `yarn expo:start`
// If you run `yarn ios` or `yarn android`, it'll use ./index.js instead.
import React from 'react'
import { registerRootComponent } from 'expo'
import * as SplashScreen from 'expo-splash-screen'
import App from './src/App'

SplashScreen.preventAutoHideAsync()

function IgniteApp() {
  return <App hideSplashScreen={SplashScreen.hideAsync} />
}

registerRootComponent(IgniteApp)
export default IgniteApp
