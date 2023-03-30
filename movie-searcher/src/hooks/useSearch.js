import { useState, useRef, useEffect } from 'react'

export function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true) // used to avoid error message on initial loading of the site

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('Search is empty')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('Cannot look for movie titles with numbers')
      return
    }

    if (search.length < 3) {
      setError('Search must contain at least 3 characters')
      return
    }

    setError(null)
  }
  , [search])

  return { search, updateSearch, error }
}
