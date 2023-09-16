async function getMovie(movieNameOrId: string, isId: boolean): Promise<any> {
  const apiKey = process.env.APIKEY
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

export default function useMoviesApi() {
  return { getMovie }
}
