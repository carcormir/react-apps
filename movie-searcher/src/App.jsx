import './App.css'
import { useRef, useState } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

const API_KEY = 'f5d09063'

function App () {
  const { movies } = useMovies()
  const [query, setQuery] = useState()
  // const inputRef = useRef() // This is the useRef example, ref={inputRef} in the input element

  const handleSubmit = (event) => {
    event.preventDefault()

    // JS WAY using the DOM (not controlled way)
    // const {query} = Object.fromEntries(new window.FormData(event.target))

    // USEREF WAY
    // const inputEl = inputRef.current // This is the useRef example
    // const value = inputEl.value // This is the useRef example
  }

  // controlled way
  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div className='page'>
      <header>
        <h1>Movie Searcher</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={query} name='query' placeholder='Pick a movie!' />
          <button>Search</button>
        </form>
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
