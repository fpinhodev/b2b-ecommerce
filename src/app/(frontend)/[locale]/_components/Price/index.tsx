import { ProductControllerType } from '../../_controllers/product'

const Price = ({
  price,
  onSale = false,
  salePrice,
  salePercentage,
  quantity = 1,
}: {
  price: ProductControllerType['price']
  onSale?: boolean
  salePercentage?: number
  salePrice?: ProductControllerType['salePrice']
  quantity?: number
}) => {
  if (onSale) {
    return (
      <div className="flex items-center gap-3 align-middle">
        <span className="line-through">{price.formatted}</span>
        <span className="text-red font-bold">{salePrice?.formatted}</span>
        <span className="font-bold italic text-green-700">{`${salePercentage}%`}</span>
      </div>
    )
  }

  if (quantity > 1 && price.raw) {
    return (
      <span className="font-bold">
        {(price.raw * quantity).toLocaleString('en-US', {
          style: 'currency',
          currency: 'EUR',
        })}
      </span>
    )
  }

  return <span className="font-bold">{price.formatted}</span>
}

export default Price
