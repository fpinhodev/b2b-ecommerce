import React from 'react'

const Price = ({
  price,
  onSale = false,
  salePrice,
  salePercentage,
}: {
  price: Promise<string> | React.ReactElement<string>
  onSale?: boolean
  salePercentage?: number
  salePrice?: Promise<string> | React.ReactElement<string>
}) => {
  if (onSale && salePrice) {
    return (
      <div className="flex items-center gap-3 align-middle">
        <span className="line-through">{price}</span>
        <span className="text-red font-bold">{salePrice}</span>
        <span className="font-bold italic text-red-600">{`${salePercentage}%`}</span>
      </div>
    )
  }

  return <span className="font-bold">{price}</span>
}

export default Price
