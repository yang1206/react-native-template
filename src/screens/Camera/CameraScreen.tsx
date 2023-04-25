import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Reanimated, {
  useAnimatedProps,
  useSharedValue,
  useWorkletCallback,
} from 'react-native-reanimated'
import type {
  CameraDeviceFormat,
  CameraPermissionRequestResult,
  CameraProps,
  CameraRuntimeError,
  FrameProcessorPerformanceSuggestion,
  PhotoFile,
  VideoFile,
} from 'react-native-vision-camera'
import {
  Camera as CameraVision,
  frameRateIncluded,
  sortFormats,
  useCameraDevices,
} from 'react-native-vision-camera'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  Gesture,
  GestureDetector,
  RectButton,
} from 'react-native-gesture-handler'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CaptureButton } from './CaptureButton'
import { StatusBarBlurBackground } from './StatusBarBlurBackground'
import { useIsForeground, useThemeStore } from '@/hooks'
import { goBack, navigate } from '@/navigation'

const ReanimatedCamera = Reanimated.createAnimatedComponent(CameraVision)

Reanimated.addWhitelistedNativeProps({
  zoom: true,
})
export function CameraScreen() {
  const navigation = useNavigation()
  const { isDark } = useThemeStore()
  const isFocussed = useIsFocused()
  const isForeground = useIsForeground()
  const isActive = isFocussed && isForeground // 判断是否留在当前屏幕
  const camera = useRef<CameraVision>(null) // 相机
  const [isCameraInitialized, setIsCameraInitialized] = useState(false)
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false)
  const isHolding = useSharedValue(false) // 是否正在触摸屏幕
  const zoom = useSharedValue(1)
  const savaZoom = useSharedValue(1)
  const isPressingButton = useSharedValue(false)
  const [enableHdr, setEnableHdr] = useState(false)
  const [enableNightMode, setEnableNightMode] = useState(false)
  const [torchActive, setTorchActive] = useState(false) // 闪光灯开关
  const [frontCamera, setFrontCamera] = useState(false) // 前后摄像头
  const [permissionResult, setPermissionResult]
    = useState<CameraPermissionRequestResult>('denied')
  const { top, right } = useSafeAreaInsets()
  /* Here we use hook provided by library to take available devices (lenses) */
  const availableDevices = useCameraDevices()

  /* useCameraDevices hook returns an object with front/back properties,
     that you can use to switch between back and front camera */
  const currentDevice
    = (frontCamera && availableDevices?.front)
      ? availableDevices.front
      : availableDevices?.back

  const formats = useMemo<CameraDeviceFormat[]>(() => {
    if (currentDevice?.formats == null)
      return []
    return currentDevice.formats.sort(sortFormats)
  }, [currentDevice?.formats])
  const minZoom = currentDevice?.minZoom ?? 1
  const maxZoom = Math.min(currentDevice?.maxZoom ?? 1, 3)
  const [is60Fps, setIs60Fps] = useState(true)
  const fps = useMemo(() => {
    if (!is60Fps)
      return 30

    if (enableNightMode && !currentDevice?.supportsLowLightBoost) {
      // User has enabled Night Mode, but Night Mode is not natively supported, so we simulate it by lowering the frame rate.
      return 30
    }

    const supportsHdrAt60Fps = formats.some(f => f.supportsVideoHDR && f.frameRateRanges.some(r => frameRateIncluded(r, 60)))
    if (enableHdr && !supportsHdrAt60Fps) {
      // User has enabled HDR, but HDR is not supported at 60 FPS.
      return 30
    }

    const supports60Fps = formats.some(f => f.frameRateRanges.some(r => frameRateIncluded(r, 60)))
    if (!supports60Fps) {
      // 60 FPS is not supported by any format.
      return 30
    }
    // If nothing blocks us from using it, we default to 60 FPS.
    return 60
  }, [currentDevice?.supportsLowLightBoost, enableHdr, enableNightMode, formats, is60Fps])

  const onMediaCaptured = useCallback(
    (media: PhotoFile | VideoFile, type: 'photo' | 'video') => {
      /* eslint-disable-next-line   no-console */
      console.log(`Media captured! ${JSON.stringify(media)}`)
      navigate('Media', {
        path: media.path,
        type,
      })
    },
    [navigation],
  )

  const supportsCameraFlipping = useMemo(() => availableDevices.back != null && availableDevices.front != null, [availableDevices.back, availableDevices.front])
  const supportsFlash = currentDevice?.hasFlash ?? false
  const supportsHdr = useMemo(() => formats.some(f => f.supportsVideoHDR || f.supportsPhotoHDR), [formats])
  const supports60Fps = useMemo(() => formats.some(f => f.frameRateRanges.some(rate => frameRateIncluded(rate, 60))), [formats])
  const canToggleNightMode = enableNightMode
    ? true // it's enabled so you have to be able to turn it off again
    : ((currentDevice?.supportsLowLightBoost ?? false) || fps > 30) // either we have native support, or we can lower the FPS
  // #endregion

  const format = useMemo(() => {
    let result = formats
    if (enableHdr) {
      // We only filter by HDR capable formats if HDR is set to true.
      // Otherwise we ignore the `supportsVideoHDR` property and accept formats which support HDR `true` or `false`
      result = result.filter(f => f.supportsVideoHDR || f.supportsPhotoHDR)
    }

    // find the first format that includes the given FPS
    return result.find(f => f.frameRateRanges.some(r => frameRateIncluded(r, fps)))
  }, [formats, fps, enableHdr])

  const flipCamera = () => setFrontCamera(prevState => !prevState)
  const toggleTorch = () => setTorchActive(prevState => !prevState)

  useEffect(() => {
    async function getPermission() {
      try {
        const cameraPermission = await CameraVision.requestCameraPermission()
        const Audiostatus = await CameraVision.getMicrophonePermissionStatus()
        setPermissionResult(cameraPermission)
        setHasMicrophonePermission(Audiostatus === 'authorized')
      }
      catch (error) {
        Alert.alert(
          '相机',
          '无法从相机中获取权限。',
        )
      }
    }

    getPermission()
  }, [])
  const neutralZoom = currentDevice?.neutralZoom ?? 1
  useEffect(() => {
    // Run everytime the neutralZoomScaled value changes. (reset zoom when device changes)
    zoom.value = neutralZoom
  }, [neutralZoom, zoom])

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      if (torchActive)
        toggleTorch()
    })

    return () => {
      unsubscribe()
    }
  }, [navigation])

  const onTapEnd = useWorkletCallback(() => {
    isHolding.value = false
  }, [isHolding])
  const onCameraError = useCallback((error: CameraRuntimeError) => {
    /* eslint-disable-next-line   no-console */
    console.log(`${error.code}: ${error.message}`, error.cause)
  }, [])
  const onCameraInitialized = useCallback(() => {
    /* eslint-disable-next-line   no-console */
    console.log('Camera initialized!')
    setIsCameraInitialized(true)
  }, [])

  const setIsPressingButton = useCallback(
    (_isPressingButton: boolean) => {
      isPressingButton.value = _isPressingButton
    },
    [isPressingButton],
  )
  const onFrameProcessorSuggestionAvailable = useCallback((suggestion: FrameProcessorPerformanceSuggestion) => {
    /* eslint-disable-next-line   no-console */
    console.log(`Suggestion available! ${suggestion.type}: Can do ${suggestion.suggestedFrameProcessorFps} FPS`)
  }, [])

  // 点击手势
  const doubleTap = useMemo(() => (Gesture.Tap()
    .onEnd(onTapEnd)), [isHolding])

  // 捏合手势 控制相机缩放
  const pinchGesture = useMemo(() => (Gesture.Pinch()
    // .onUpdate((e) => {
    //   zoom.value = e.scale * savaZoom.value
    // })
    .onChange((e) => {
      'worklet'
      zoom.value *= e.scaleChange
    })
    .onEnd(() => {
      savaZoom.value = zoom.value
    })
    // .enabled(isActive)
  ), [zoom, isActive, savaZoom])

  const animatedProps = useAnimatedProps<Partial<CameraProps>>(
    () => ({ zoom: zoom.value }),
    [zoom, isActive, isHolding],
  )

  /* There is an additional check to prevent errors.
     Camera component needs a valid device prop,
     we need to stop rendering if the device is falsy value. */
  if (!currentDevice)
    return <View style={styles.blackscreen} />

  if (permissionResult === 'denied')
    return null
  /* eslint-disable-next-line   no-console */
  console.log(`Camera Device: ${currentDevice.name}`)
  return (
    <View style={styles.Container}>
      <GestureDetector gesture={pinchGesture}>
        <Reanimated.View style={StyleSheet.absoluteFill}>
          <GestureDetector gesture={Gesture.Exclusive(doubleTap)}>
            <ReanimatedCamera
              ref={camera}
              style={StyleSheet.absoluteFill}
              onError={onCameraError}
              device={currentDevice}
              format={format}
              isActive={isActive}
              hdr={enableHdr}
              photo={true}
              fps={fps}
              lowLightBoost={currentDevice.supportsLowLightBoost && enableNightMode}
              video={true}
              audio={hasMicrophonePermission}
              torch={torchActive ? 'on' : 'off'}
              enableZoomGesture={false}
              orientation="portrait"
              animatedProps={animatedProps}
              onInitialized={onCameraInitialized}
              frameProcessorFps={1}
              onFrameProcessorPerformanceSuggestionAvailable={
                onFrameProcessorSuggestionAvailable
              }
            />
          </GestureDetector>
        </Reanimated.View>
      </GestureDetector>
      <StatusBarBlurBackground />
      <CaptureButton
        style={styles.captureButton}
        camera={camera}
        onMediaCaptured={onMediaCaptured}
        cameraZoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        flash={supportsFlash ? 'on' : 'off'}
        enabled={isCameraInitialized && isActive}
        setIsPressingButton={setIsPressingButton}
      />
      <View style={{ ...styles.rightButtonRow, top: top + 15, right: right + 15 }}>
        {supportsCameraFlipping && (
          <TouchableOpacity style={styles.Button} onPress={flipCamera}>
            <MaterialIcons name={frontCamera ? 'camera-front' : 'camera-rear' } size={24} color="white" />
          </TouchableOpacity>
        )}
        {supportsFlash && (
          <TouchableOpacity style={styles.Button} onPress={toggleTorch} >
            <Ionicons name={torchActive ? 'flash' : 'flash-off'} color="white" size={24} />
          </TouchableOpacity>
        )}
        {supports60Fps && (
          <TouchableOpacity style={styles.Button} onPress={() => setIs60Fps(!is60Fps)}>
            <Text style={styles.text}>
              {is60Fps ? '60' : '30'}
              {'\n'}FPS
            </Text>
          </TouchableOpacity>
        )}
        {supportsHdr && (
          <TouchableOpacity style={styles.Button} onPress={() => setEnableHdr(h => !h)}>
            <MaterialIcons name={enableHdr ? 'hdr-on' : 'hdr-off'} color="white" size={24} />
          </TouchableOpacity>
        )}
        {canToggleNightMode && (
          <TouchableOpacity style={styles.Button} onPress={() => setEnableNightMode(!enableNightMode)}>
            <Ionicons name={enableNightMode ? 'moon' : 'moon-outline'} color="white" size={24} />
          </TouchableOpacity>
        )}
        <Text>{zoom.value}</Text>
      </View>
      <View style={{ ...styles.ButtonsLeft, top }}>
        <RectButton style={styles.ButtonFloating} onPress={() => { goBack() }}>
          <MaterialIcons name="arrow-back" size={24} color={isDark ? 'white' : 'black'} />
        </RectButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'black',
  },
  Buttons: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    right: 0,
    left: 0,
    bottom: 0,
    padding: 24,
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 60,
  },
  blackscreen: {
    flex: 1,
    backgroundColor: 'black',
  },
  Button: {
    width: 30,
    height: 30,
    borderRadius: 5,
    background: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  Photo: {
    height: 100,
    width: 100,
  },
  ButtonFloating: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonsFloatings: {
    position: 'absolute',
    right: 3,
  },
  ButtonsLeft: {
    position: 'absolute',
    left: 8,
  },
  rightButtonRow: {
    position: 'absolute',
    right: 40,
    top: 60,
  },
  text: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
