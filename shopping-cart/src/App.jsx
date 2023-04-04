import './App.css'
import { products as initialProducts } from './mocks/products.json'
import { Products } from './components/Products'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { IS_DEVELOPMENT } from './config'
import { useFilters } from './hooks/useFilters'
import { Cart } from './components/Cart'
import { CartContextProvider } from './context/CartContext'

function App () {
  const { filterProducts } = useFilters()
  const filteredProducts = filterProducts(initialProducts)

  return (
    <CartContextProvider>
      <section className='top-section-container'>
        <Header />
        <Cart />
      </section>
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </CartContextProvider>
  )
}

export default App
