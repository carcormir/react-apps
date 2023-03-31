import { useContext } from 'react'
import { FiltersContext } from '../context/FiltersContext'

export function useFilters () {
  const { filters, setFilters } = useContext(FiltersContext)

  if (filters === 'undefined' || setFilters === 'undefined') {
    throw new Error('useFilters must be used within a FiltersProvider')
  }

  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice &&
        (
          filters.category === 'all' ||
          product.category === filters.category
        )
      )
    })
  }

  return { filters, filterProducts, setFilters }
}
