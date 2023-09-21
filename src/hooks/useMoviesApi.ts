async function getMovie(movieNameOrId: string, isId: boolean): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_MOVIES_API_KEY
  let apiResponse: any
  if (isId) {
    apiResponse = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieNameOrId}`)
  } else {
    apiResponse = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${movieNameOrId}`)
  }
  const apiData = await apiResponse.json()
  const { Actors, Country, Director, Genre, Language, Runtime, Title, Year, imdbID, imdbRating, imdbVotes } = apiData
  return { Actors, Country, Director, Genre, Language, Runtime, Title, Year, imdbID, imdbRating, imdbVotes }
}

async function getImage(searchTerm: string): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_IMAGES_API_KEY || ''
  const headers = new Headers()
  headers.set('Authorization', apiKey)
  headers.set('Content-Type', 'application/json')
  try {
    const apiResponse = await fetch(`https://api.pexels.com/v1/search?query=${searchTerm}&per_page=1&orientation=square&size=medium`, {
      headers
    })
    const apiData = apiResponse && await apiResponse.json()
    const imageUrl = apiData?.photos?.[0]?.src?.medium
    const imageAlt = apiData?.photos?.[0]?.alt
    if (!imageUrl) throw Error('Error getting api response')
    return { imageUrl, imageAlt }
  } catch (error) {
    return { error }
  }
}

export default function useMoviesApi() {
  return { getMovie, getImage }
}
