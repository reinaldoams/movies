"use client"
import React, { useEffect, useState } from 'react'
import useMoviesApi from '../Hooks/useMoviesApi'

type Props = { movieNameOrId: string, isId?: boolean }

export default function MovieBox({ movieNameOrId, isId }: Props) {
  const [movieObj, setMovieObj] = useState<any>()
  const { getMovie } = useMoviesApi()
  useEffect(() => {
    async function fetchMovie() {
      const movieObjForState = await getMovie(movieNameOrId, isId || false)
      setMovieObj(movieObjForState)
    }
    fetchMovie()
  }, [])
  return (
    <div>
      This is the movie: {JSON.stringify(movieObj)}
      {movieObj ? (<>
        <h2>{movieObj.Title}{movieObj.imdbRating ? ` - ${movieObj.imdbRating} ☆ ${movieObj.imdbVotes ? `(${movieObj.imdbVotes})` : ''}` : ''}</h2>
        <h3>{movieObj.Director}</h3>
        <p>Runtime: {movieObj.Runtime}</p>
        <p>Genre: {movieObj.Genre}</p>
        <p>Language: {movieObj.Language}</p>
        <p>Country: {movieObj.Country}</p>
        {movieObj.Actors ? <ul>Actors: {movieObj.Actors.split(', ').map((actor: string) => (
          <li>{actor}</li>
        ))}</ul> : <></>}
      </>) : <></>}
    </div>
  )
}
