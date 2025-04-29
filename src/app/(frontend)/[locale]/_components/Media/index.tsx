import type { Media as MediaType } from '@/payload-types'
import cn from '@/utils/tailwindMerge'
import Image, { ImageProps } from 'next/image'
import React, { ElementType } from 'react'

type MediaProps = {
  resource: MediaType | null
  alt?: string
  url?: string
  priority?: boolean
  fill?: boolean
  className?: string
  imgClassName?: string
  sizes?: string
  width?: number
  height?: number
  onClick?: () => void
  onLoad?: () => void
  wrapperElement?: ElementType
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)

const Media: React.FC<MediaProps> = ({
  resource,
  alt,
  url,
  priority,
  fill,
  className = '',
  imgClassName,
  sizes,
  width,
  height,
  onClick,
  onLoad,
  wrapperElement: WrapperElement = 'div',
}) => {
  // Common image props
  const imageAttributes: ImageProps = {
    src: url || resource?.url || '',
    alt: alt || resource?.alt || `Image ${resource?.id}`,
    placeholder: `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`,
  }

  // Add conditional props
  if (fill) imageAttributes.fill = true
  if (width && !fill) imageAttributes.width = width
  if (height && !fill) imageAttributes.height = height
  if (sizes) imageAttributes.sizes = sizes
  if (priority) imageAttributes.priority = true
  if (imgClassName || fill)
    imageAttributes.className = cn(
      {
        'object-cover origin-center': fill,
      },
      imgClassName,
    )

  return (
    <WrapperElement
      className={className || undefined}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {imageAttributes.src ? <Image {...imageAttributes} /> : 'No image'}
    </WrapperElement>
  )
}

export default Media
