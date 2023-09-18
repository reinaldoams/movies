"use client"
import React, { useEffect, useState } from 'react'
import useMoviesApi from '../Hooks/useMoviesApi'
import Image from 'next/image'

type Props = { movieNameOrId: string, isId?: boolean }

export default function MovieBox({ movieNameOrId, isId }: Props) {
  const [movieObj, setMovieObj] = useState<any>()
  const [imageObj, setImageObj] = useState<{ imageUrl: string, imageAlt: string }>({ imageUrl: '', imageAlt: '' })
  const { getMovie, getImage } = useMoviesApi()

  useEffect(() => {
    async function fetchMovie() {
      const movieObjForState = await getMovie(movieNameOrId, isId || false)
      const imageObjFromFetch = await getImage(movieNameOrId)
      setMovieObj(movieObjForState)
      setImageObj(imageObjFromFetch)
    }
    fetchMovie()
  }, [movieNameOrId])

  if (!movieNameOrId) return <div>Component waiting for name</div>

  return (
    <div>
      {movieObj ? (<>
        {imageObj?.imageUrl ? <Image src={imageObj?.imageUrl || ''} alt='image search result' width={350} height={350} /> : <></>}
        <h2>{movieObj.Title}{movieObj.imdbRating ? ` - ${movieObj.imdbRating} ☆ ${movieObj.imdbVotes ? `(${movieObj.imdbVotes})` : ''}` : ''}</h2>
        <h3>{movieObj.Director}</h3>
        <p>Runtime: {movieObj.Runtime}</p>
        <p>Genre: {movieObj.Genre}</p>
        <p>Language: {movieObj.Language}</p>
        <p>Country: {movieObj.Country}</p>
        {movieObj.Actors ? <ul>Actors: {movieObj.Actors.split(', ').map((actor: string) => (
          <li key={actor}>{actor}</li>
        ))}</ul> : <></>}
      </>) : <></>}
    </div>
  )
}
