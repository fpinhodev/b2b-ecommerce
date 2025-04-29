'use client'

import React from 'react'
import './index.scss'
type ShimmerProps = {
  numberOfLines?: number
  className?: string
  aspectRatio?: number
}

export const LoadingShimmer: React.FC<ShimmerProps> = ({
  numberOfLines = 3,
  className,
  aspectRatio,
}) => {
  return (
    <div
      className="shimmer"
      style={aspectRatio ? { paddingBottom: `${aspectRatio * 100}%` } : undefined}
    >
      <div className="shimmerInner">
        {aspectRatio ? (
          <div className="mediaShimmer"></div>
        ) : (
          <>
            <div className="line" style={{ width: '100%' }}></div>
            {Array.from({ length: numberOfLines - 1 }).map((_, i) => (
              <div
                key={i}
                className="line"
                style={{ width: `${Math.floor(Math.random() * 50) + 50}%` }}
              ></div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
