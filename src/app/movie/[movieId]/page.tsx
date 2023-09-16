"use client"
import MovieBox from '@/app/Components/MovieBox'
import useMoviesApi from '@/app/Hooks/useMoviesApi'
import React, { useEffect, useState } from 'react'

type Props = { params: { movieId: string } }

export default function Movie({ params: { movieId } }: Props) {
  // tt0482881 "77"
  // tt0137523 "fight club"
  return (
    <div>
      this is the movieId: {movieId}
      <MovieBox movieNameOrId={movieId} isId={true} />
    </div>
  )
}
