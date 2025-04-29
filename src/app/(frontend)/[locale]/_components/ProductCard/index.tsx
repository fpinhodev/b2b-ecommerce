import { Product } from '@/payload-types'
import Link from 'next/link'
import Media from '../../_components/Media'
import { ProductControllerType } from '../../_controllers/product'
import Price from '../Price'
import { AddCartButton } from './AddCartButton'
import './styles.css'

const ProductCard = ({
  data: { name, slug, images, onSale, price, salePrice, salePercentage },
  product,
  isLoggedIn,
}: {
  data: ProductControllerType
  product: Product
  isLoggedIn: boolean
}) => {
  const categories = [{ title: 'category' }]

  return (
    <div className="product-card">
      <Link
        href={slug}
        className="relative w-full overflow-hidden pt-[100%]"
      >
        <Media
          resource={images}
          fill
          width={300}
          height={300}
          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
          priority
        />
        {categories.length > 0 && (
          <div className="absolute left-2 top-2 z-10 flex gap-1">
            {categories.map(({ title }, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium"
              >
                {title}
              </span>
            ))}
          </div>
        )}
      </Link>
      <div className="grow-1 flex flex-col gap-3 p-4">
        <h3 className="group font-bold">
          <Link
            href={slug}
            className="group-hover:underline"
          >
            {name}
          </Link>
        </h3>
        <Price
          onSale={onSale}
          price={price}
          salePrice={salePrice}
          salePercentage={salePercentage}
        />
        {isLoggedIn && <AddCartButton product={product} />}
      </div>
    </div>
  )
}

export default ProductCard
