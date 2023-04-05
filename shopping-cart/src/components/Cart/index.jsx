import { useId } from 'react'
import { CartIcon, ClearCartIcon, BurgerIcon, UserIcon, BagIcon } from '../Icons'
import './styles.css'
import { useCart } from '../../hooks/useCart'

function CartItem ({ thumbnail, price, title, quantity, addToCart }) {
  return (
    <li>
      <img
        src={thumbnail}
        alt={title}
      />
      <div>
        <strong>{title}</strong> - $ {price}
      </div>
      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}
export function Cart () {
  const cartCheckboxId = useId()
  const { cart, clearCart, addToCart } = useCart()

  return (
    <>
      <div className='page-header'>
        <button className='user-button'><UserIcon /></button>
        <button className='burger-button'><BurgerIcon /></button>
        <label className='cart-button' htmlFor={cartCheckboxId}>
          <BagIcon />
        </label>
        <input id={cartCheckboxId} type='checkbox' hidden />
        <aside className='cart'>
          <br />
          {
            cart.length > 0
              ? <span>This is your current shopping cart:</span>
              : <span>You shopping cart is empty </span>
          }

          <ul>
            {
              cart.map(product => (
                <CartItem
                  key={product.id}
                  addToCart={() => addToCart(product)}
                  {...product}
                />
              ))
              }
          </ul>
          <button className='clear-button' onClick={clearCart}><ClearCartIcon /></button>
        </aside>
      </div>
    </>
  )
}
