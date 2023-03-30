import { CAT_ENDPOINT_RANDOM_FACT } from '../constants'

export const getRandomFact = () => {
  return fetch(CAT_ENDPOINT_RANDOM_FACT)
    .then(res => {
      if (!res.ok) {
        throw new Error('Error fetching fact')
      }
      return res.json()
    })
    .then(data => {
      const { fact } = data
      return fact
    })
    .catch((err) => {
      console.error(err)
    // comes here if there is an issue with the response
    // comes here if they is an issue with the request
    })
}
