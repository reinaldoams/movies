"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import MovieBox from '../Components/MovieBox'

type Props = {}

export default function page({ }: Props) {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('s')
  return (
    <div>
      {searchTerm ? <MovieBox movieNameOrId={searchTerm} isId={false} /> : <></>}
    </div>
  )
}
