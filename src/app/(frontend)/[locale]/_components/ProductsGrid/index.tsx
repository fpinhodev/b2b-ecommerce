import { Product } from '@/payload-types'
import { productController } from '../../_controllers/product'
import ProductCard from '../ProductCard'

export const ProductsGrid = ({
  products,
  isLoggedIn,
}: {
  products: Product[]
  isLoggedIn: boolean
}) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            data={productController(product)}
            product={product}
            isLoggedIn={isLoggedIn}
          />
        ))
      ) : (
        <div>No products found.</div>
      )}
    </div>
  )
}

export default ProductsGrid
