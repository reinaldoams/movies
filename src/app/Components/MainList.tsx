"use client"
import React, { useEffect, useState } from 'react'
import useMoviesAPI from '../Hooks/useMoviesAPI'

type Props = {}

export default function MainList({ }: Props) {
  const [movie, setMovie] = useState<string>('')
  const { getMovie } = useMoviesAPI()

  useEffect(() => {
    const fightClubRes = getMovie('fightClub')
    async function gettingMovie(movieName: string) {
      const fightClubRes = await getMovie(movieName)
      console.log(fightClubRes)
    }
    gettingMovie('fightClub')
  }, [])

  return (
    <div>
      This is the main list
      This is the movie: {movie}
    </div>
  )
}
