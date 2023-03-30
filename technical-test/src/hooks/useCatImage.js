import { useState, useEffect } from 'react'

export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()
  // this use effect updates when there is a new fact (dependency)
  useEffect(() => {
    if (!fact) return

    const threeWord = fact.split(' ').slice(0, 3).join(' ')

    fetch(`https://cataas.com/cat/says/${threeWord}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(data => {
        const { url } = data
        setImageUrl(url)
      })
  }, [fact])

  return { imageUrl }
}
