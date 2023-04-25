import type { FastImageProps } from 'react-native-fast-image'
import NImage from 'react-native-fast-image'
import { styled } from 'nativewind'
import * as React from 'react'

const SImage = styled(NImage)
export type ImgProps = FastImageProps & {
  className?: string
}

export function Image({
  style,
  className,
  ...props
}: ImgProps) {
  return (
    <SImage
      className={className}
      style={style}
      {...props}
    />
  )
}
