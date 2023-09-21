"use client"
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import MovieBox from '@/components/MovieBox'
import { useMoviesListContext } from '@/context/MoviesListContext'
import useMoviesApi from '@/hooks/useMoviesApi'

type Props = {}

export default function page({ }: Props) {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('s')
  const { favoritedMovies } = useMoviesListContext()
  const { getMovie } = useMoviesApi()

  return (
    <div>
      {favoritedMovies ? (favoritedMovies.map(movieId => (
        movieId ? <MovieBox movieNameOrId={movieId} isId={true} /> : <></>
      ))) : <></>}
    </div>
  )
}