import './App.css'
import { useRef, useState, useEffect, useCallback } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  // const inputRef = useRef() // This is the useRef example, ref={inputRef} in the input element

  const debouncedGetMovies = useCallback(debounce(search => {
    getMovies({ search })
  }, 300), [])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })

    // JS WAY using the DOM (not controlled way)
    // const {query} = Object.fromEntries(new window.FormData(event.target))

    // USEREF WAY
    // const inputEl = inputRef.current // This is the useRef example
    // const value = inputEl.value // This is the useRef example
  }

  // controlled way
  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    // automatic search when typing
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Movie Searcher</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='search' placeholder='Pick a movie!' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button>Search</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loading
            ? <p>Loading ...</p>
            : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
