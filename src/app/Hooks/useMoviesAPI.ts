async function getMovie(movieName: string, isId: boolean): Promise<any> {
  const apiKey = process.env.APIKEY
  let apiResponse: any
  if (isId) {
    apiResponse = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieName}`)
  } else {
    apiResponse = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`)
  }
  const apiData = await apiResponse.json()
  return apiData
}

export default function useMoviesApi() {
  return { getMovie }
}
