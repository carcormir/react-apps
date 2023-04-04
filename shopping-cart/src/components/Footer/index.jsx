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
      <div className='footer-initial'>
        ?
      </div>
      <div className='footer-hovered'>
        <h4>E-commerce like app</h4>
        <span>carcormir@gmail.com</span>
        <h5>Usage of useContext and useReducer</h5>
      </div>
    </footer>
  )
}
