import { useReducer, createContext, useState } from 'react'
import { cartReducer, cartInitialState, CART_ACTION_TYPES } from '../reducers/cartReducer'

export const CartContext = createContext()

function useReducerCart () {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCart = product => dispatch({
    type: 'CLEAR_CART'
  })

  return { state, addToCart, removeFromCart, clearCart }
}

export function CartContextProvider ({ children }) {
  const { state, addToCart, removeFromCart, clearCart } = useReducerCart()

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      clearCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}
