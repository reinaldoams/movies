"use client"
import useMoviesApi from '@/app/Hooks/useMoviesAPI'
import React, { useEffect, useState } from 'react'

type Props = { params: { movieId: string } }

export default function Movie({ params: { movieId } }: Props) {
  // tt0482881 "77"
  // tt0137523 "fight club"
  const [movieObj, setMovieObj] = useState<any>(undefined)
  const { getMovie } = useMoviesApi()
  useEffect(() => {
    async function fetchMovie() {
      const movieRes = await getMovie(movieId, false)
      const { Actors, Country, Director, Genre, Language, Runtime, Title, Year, imdbID, imdbRating, imdbVotes } = movieRes
      const movieObjForState = { Actors, Country, Director, Genre, Language, Runtime, Title, Year, imdbID, imdbRating, imdbVotes }
      setMovieObj(movieObjForState)
      console.log(movieObj)
    }
    fetchMovie()
  }, [])
  console.log(movieObj)
  return (
    <div>MovieId: {movieId}</div>
  )
}
