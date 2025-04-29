import { Product } from '@/payload-types'
import React from 'react'
import ProductCard from '../../_components/ProductCard'
import './index.scss'

type ProductGridProps = {
  products: Product[]
  className?: string
  showCategories?: boolean
  limit?: number
  enableQuickAdd?: boolean
  isLoading?: boolean
  isLoggedIn: boolean
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  className,
  showCategories = true,
  limit,
  enableQuickAdd = true,
  isLoading = false,
  isLoggedIn,
}) => {
  const displayProducts = limit ? products.slice(0, limit) : products

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: limit || 6 }).map((_, i) => (
          <div key={i}>
            {/* <LoadingShimmer /> */}
            Loading...
          </div>
        ))}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return <div>No products found.</div>
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {displayProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          showCategories={showCategories}
          enableQuickAdd={enableQuickAdd}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </div>
  )
}
