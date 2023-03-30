export function ListOfMovies ({ movies }) {
  return (
    <ul className='movies'>
      {
      movies.map(movie => (
        <li className='movie' key={movie.id}>
          <div className='movie-header'>
            <span>{movie.title}</span>
            <p>{movie.year}</p>
          </div>
          <img src={movie.poster} alt={movie.title} />
        </li>
      ))
    }
    </ul>
  )
}

export function NoMoviesResult () {
  return (
    (
      <p>
        No movies found for the given search
      </p>
    )
  )
}

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0

  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMoviesResult />

  )
}
