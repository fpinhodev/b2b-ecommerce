import gql from 'graphql-tag'

export const MediaSizes = gql`
  fragment MediaSizes on Media_Sizes {
    thumbnail {
      url
      width
      height
      mimeType
      filesize
      filename
    }
    square {
      url
      width
      height
      mimeType
      filesize
      filename
    }
    small {
      url
      width
      height
      mimeType
      filesize
      filename
    }
    medium {
      url
      width
      height
      mimeType
      filesize
      filename
    }
    large {
      url
      width
      height
      mimeType
      filesize
      filename
    }
    xlarge {
      url
      width
      height
      mimeType
      filesize
      filename
    }
    og {
      url
      width
      height
      mimeType
      filesize
      filename
    }
  }
`

export const Media = gql`
  fragment Media on Media {
    id
    alt
    updatedAt
    createdAt
    url
    thumbnailURL
    filename
    mimeType
    filesize
    width
    height
    focalX
    focalY
    sizes {
      ...MediaSizes
    }
  }
  ${MediaSizes}
`
