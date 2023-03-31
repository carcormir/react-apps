// import { useCart } from '../../hooks/useCart'
// import { useFilters } from '../../hooks/useFilters'
import './styles.css'

export function Footer () {
  // const { filters } = useFilters()
  // const { cart } = useCart()
  return (
    <footer className='footer'>
      {/* {
        JSON.stringify(filters, null, 2)
      }
      {
        JSON.stringify(cart, null, 2)
      } */}
      <h4>E-commerce like app</h4>
      <span>carcormir@gmail.com</span>
      <h5>Usage of context and reducer</h5>
    </footer>
  )
}
