import { useEffect, useState } from 'react'
import './App.css'
import { CAT_PREFIX_IMAGE_URL } from './constants'
import { useCatFact } from './hooks/useCatFact'

export function App () {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  const handleClick = async () => {
    refreshFact()
  }

  return (
    <main>
      <h1>Cats app</h1>
      <button onClick={handleClick}>Get new fact</button>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the first word of ${fact}`} />}
      </section>
    </main>
  )
}
