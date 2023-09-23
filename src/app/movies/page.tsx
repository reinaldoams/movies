"use client"
import React from 'react'
import MovieBox from '@/components/MovieBox'
import { useMoviesListContext } from '@/context/MoviesListContext'

type Props = {}

export default function page({ }: Props) {
  const { favoritedMovies } = useMoviesListContext()

  return (
    <div>
      {favoritedMovies ? (favoritedMovies.map(movieId => (
        movieId ? <MovieBox movieNameOrId={movieId} isId={true} /> : <></>
      ))) : <></>}
    </div>
  )
}