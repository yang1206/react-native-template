/* eslint-disable   no-console */

import React, { useCallback, useMemo, useState } from 'react'
import { ActivityIndicator, Alert, PermissionsAndroid, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import type { LoadError } from 'react-native-video'
import FastImage from 'react-native-fast-image'
import Video from 'react-native-video'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useIsFocused } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBarBlurBackground } from './StatusBarBlurBackground'
import { useIsForeground } from '@/hooks/useIsForeground'
import type { RootStackParamList } from '@/navigation'

async function requestSavePermission(): Promise<boolean> {
  if (Platform.OS !== 'android')
    return true

  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  if (permission == null)
    return false
  let hasPermission = await PermissionsAndroid.check(permission)
  if (!hasPermission) {
    const permissionRequestResult = await PermissionsAndroid.request(permission)
    hasPermission = permissionRequestResult === 'granted'
  }
  return hasPermission
}

type Props = NativeStackScreenProps<RootStackParamList, 'Media'>
export function MediaScreen({ navigation, route }: Props): React.ReactElement {
  const { top, left, bottom } = useSafeAreaInsets()
  const { path, type } = route.params
  const [hasMediaLoaded, setHasMediaLoaded] = useState(false)
  const isForeground = useIsForeground()
  const isScreenFocused = useIsFocused()
  const isVideoPaused = !isForeground || !isScreenFocused
  const [savingState, setSavingState] = useState<'none' | 'saving' | 'saved'>('none')

  const onMediaLoadEnd = useCallback(() => {
    console.log('media has loaded.')
    setHasMediaLoaded(true)
  }, [])
  const onMediaLoadError = useCallback((error: LoadError) => {
    console.log(`failed to load media: ${JSON.stringify(error)}`)
  }, [])
  const source = useMemo(() => ({ uri: `file://${path}` }), [path])

  const onSavePressed = useCallback(async () => {
    try {
      setSavingState('saving')

      const hasPermission = await requestSavePermission()
      if (!hasPermission) {
        Alert.alert('Permission denied!', 'Vision Camera does not have permission to save the media to your camera roll.')
        return
      }
      await CameraRoll.save(`file://${path}`, {
        type,
      })
      setSavingState('saved')
    }
    catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e)
      setSavingState('none')
      Alert.alert('Failed to save!', `An unexpected error occured while trying to save your ${type}. ${message}`)
    }
  }, [path, type])

  const screenStyle = useMemo(() => ({ opacity: hasMediaLoaded ? 1 : 0 }), [hasMediaLoaded])

  return (
    <View style={[styles.container, screenStyle]}>
      {type === 'photo' && (
        <FastImage source={source} style={StyleSheet.absoluteFill} resizeMode="cover" onLoadEnd={onMediaLoadEnd} />
      )}
      {type === 'video' && (
        <Video
          source={source}
          style={StyleSheet.absoluteFill}
          paused={isVideoPaused}
          resizeMode="cover"
          posterResizeMode="cover"
          allowsExternalPlayback={false}
          automaticallyWaitsToMinimizeStalling={false}
          disableFocus={true}
          repeat={true}
          useTextureView={false}
          controls={false}
          playWhenInactive={true}
          ignoreSilentSwitch="ignore"
          onReadyForDisplay={onMediaLoadEnd}
          onError={onMediaLoadError}
        />
      )}

      <TouchableOpacity style={{ ...styles.closeButton, top, left }} onPress={navigation.goBack}>
        <IonIcon name="close" size={35} color="white" style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity style={{ ...styles.saveButton, bottom, left }} onPress={onSavePressed} disabled={savingState !== 'none'}>
        {savingState === 'none' && <IonIcon name="download" size={35} color="white" style={styles.icon} />}
        {savingState === 'saved' && <IonIcon name="checkmark" size={35} color="white" style={styles.icon} />}
        {savingState === 'saving' && <ActivityIndicator color="white" />}
      </TouchableOpacity>

      <StatusBarBlurBackground />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    width: 40,
    height: 40,
  },
  saveButton: {
    position: 'absolute',
    width: 40,
    height: 40,
  },
  icon: {
    textShadowColor: 'black',
    textShadowOffset: {
      height: 0,
      width: 0,
    },
    textShadowRadius: 1,
  },
})
