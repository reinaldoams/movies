"use client"

import MovieBox from '@/components/MovieBox'
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
