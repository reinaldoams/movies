"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import useMoviesApi from '../Hooks/useMoviesAPI'

type Props = {}

export default function page({ }: Props) {
  const [movieObj, setMovieObj] = useState()
  const { getMovie } = useMoviesApi()
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('searchTerm')
  useEffect(() => {
    const movieRes = await getMovie(searchTerm, false)
    const { Actors, Country, Director, Genre, Language, Runtime, Title, Year, imdbID, imdbRating, imdbVotes } = movieRes
    const movieObjForState = { Actors, Country, Director, Genre, Language, Runtime, Title, Year, imdbID, imdbRating, imdbVotes }
    setMovieObj(movieObjForState)
    console.log(movieObj)
  }, [])
  return (
    <div>page</div>
  )
}
