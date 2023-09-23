export interface movieObject {
  Actors: string
  Country: string
  Director: string
  Genre: string
  Language: string
  Runtime: string
  Title: string
  Year: string
  imdbID: string
  imdbRating: string
  imdbVotes: string
}

export interface imageObj {
  imageUrl: string
  imageAlt: string
  imgError: any
}


async function getMovie(movieNameOrId: string, isId: boolean): Promise<movieObject> {
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

async function getImage(searchTerm: string): Promise<imageObj> {
  const apiKey = process.env.NEXT_PUBLIC_IMAGES_API_KEY || ''
  const headers = new Headers()
  headers.set('Authorization', apiKey)
  headers.set('Content-Type', 'application/json')
  try {
    const apiResponse = await fetch(`https://api.pexels.com/v1/search?query=${searchTerm}&per_page=1&orientation=square&size=medium`, {
      headers
    })
    const apiData = apiResponse && await apiResponse.json()
    console.log(apiResponse)
    console.log(apiData)
    const imageUrl = apiData?.photos?.[0]?.src?.medium || apiData?.url
    console.log(imageUrl)
    const imageAlt = apiData?.photos?.[0]?.alt
    if (!imageUrl) throw Error('Error getting api response')
    return { imageUrl, imageAlt, imgError: false }
  } catch (imgError) {
    return { imageUrl: '', imageAlt: '', imgError }
  }
}

export default function useMoviesApi() {
  return { getMovie, getImage }
}
