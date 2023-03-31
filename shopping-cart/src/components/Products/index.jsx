import { useCart } from '../../hooks/useCart'
import { Cart } from '../Cart'
import { AddToCartIcon, RemoveFromCartIcon } from '../Icons'
import './styles.css'

export function Products ({ products }) {
  const { cart, addToCart, removeFromCart } = useCart()

  // const handleAddToCart = (product) => {
  //   addToCart(product)
  // }
  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }

  return (
    <main className='products'>
      <ul>
        {
          products.slice(0, 10).map(product => {
            const isProductInCart = checkProductInCart(product)
            return (
              <li key={product.id}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                />
                <div>
                  <strong>{product.title}</strong> - ${product.price}
                </div>
                <div>
                  <button
                    style={{
                      backgroundColor: isProductInCart ? 'red' : 'blue'
                    }}
                    onClick={() => isProductInCart
                      ? removeFromCart(product)
                      : addToCart(product)}
                  >
                    {
                      isProductInCart
                        ? <RemoveFromCartIcon />
                        : <AddToCartIcon />
                    }
                  </button>
                </div>
              </li>
            )
          })
        }
      </ul>
    </main>
  )
}
