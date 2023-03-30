import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/getMovies'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const previousSearch = useRef(search)

  // This is function is created everytime there is a change in the search input
  // To avoid this useCallback
  // we pass the depencency as a parameter to avoid the continuous creation of the function
  // everytime there is a new search.

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return
    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // This is executed even if we dont need to sort!
  // To avoid this we use useMemo that will execute
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, loading, getMovies }
}
