"use client"
import React, { useEffect, useState } from 'react'
import useMoviesApi from '../hooks/useMoviesApi'
import Image from 'next/image'
import { useMoviesListContext } from '@/context/MoviesListContext'

type Props = { movieNameOrId: string, isId?: boolean, favoritable?: boolean, favorite?: boolean }

export default function MovieBox({ movieNameOrId, isId, favoritable }: Props) {
  const [movieObj, setMovieObj] = useState<any>()
  const [imageObj, setImageObj] = useState<{ imageUrl: string, imageAlt: string }>({ imageUrl: '', imageAlt: '' })
  const { getMovie, getImage } = useMoviesApi()
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  const {favoritedMovies, setFavoritedMovies} = useMoviesListContext()
  function handleHeartClick (title: string) {
    setFavoritedMovies && favoritedMovies && setFavoritedMovies([...favoritedMovies, title])
  }

  useEffect(() => {
    async function fetchMovie() {
      const movieObjForState = await getMovie(movieNameOrId || '', isId || false)
      const imageObjFromFetch = await getImage(movieNameOrId || 'movie')
      setMovieObj(movieObjForState)
      setImageObj(imageObjFromFetch)
    }
    fetchMovie()

    if (movieObj?.Title && favoritedMovies?.indexOf(movieObj.Title) !== -1) {
      setIsFavorite(true)
    } else {
      setIsFavorite(false)
    }
  }, [movieNameOrId, favoritedMovies])

  return (
    <div className='flex items-center justify-center from-[#F9F5F3] via-[#F9F5F3] to-[#F9F5F3] bg-gradient-to-br'>
      <div className='w-full max-w-md  mx-auto bg-white rounded-3xl shadow-xl overflow-hidden'>
        <div className='max-w-md mx-auto'>
          {imageObj?.imageUrl ? <div className='h-[236px]' style={{
            backgroundImage: `url(${imageObj?.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            {favoritable && movieObj?.Title ? (
              <>
              {isFavorite ? <span className="flex justify-end p-4 text-4xl" onClick={() => handleHeartClick(movieObj.Title)}>💙</span> : <span className="flex justify-end p-4 text-4xl">🤍</span>}
              </>
            ) : <></>}
      </div> : <></>}
      <div className='p-4 sm:p-6'>
        <p className='font-bold text-gray-700 text-[22px] leading-7 mb-1'>{movieObj?.Title || 'Search a movie!'}</p>
        {movieObj?.Director !== 'N/A' ? <div className='flex flex-row'>
          <p className='text-[17px] font-bold text-[#0FB478]'>{movieObj?.Director}</p>
        </div> : <></>}
        {(movieObj?.Runtime || movieObj?.Genre || movieObj?.Language || movieObj?.Country) ? <>
          <p className="text-[17px] font-bold text-[#0FB478]">Runtime: {movieObj?.Runtime}</p>
          <p className="text-[17px] font-bold text-[#0FB478]">Genre: {movieObj?.Genre}</p>
          <p className="text-[17px] font-bold text-[#0FB478]">Language: {movieObj?.Language}</p>
          <p className="text-[17px] font-bold text-[#0FB478]">Country: {movieObj?.Country}</p>
        </> : <></>}
        {movieObj?.Actors ? <ul className="text-[17px] font-bold text-black">Actors: {movieObj?.Actors.split(', ').map((actor: string) => (
          <li className="text-[17px] font-bold text-[#0FB478]" key={actor}>{actor}</li>
        ))}</ul> : <></>}
      </div>
    </div>
      </div >
    </div >
  )

  return (
    <div>
      {movieObj ? (<>
        {imageObj?.imageUrl ? <Image src={imageObj?.imageUrl || ''} alt='image search result' width={350} height={350} /> : <></>}
        <h2>{movieObj?.Title}{movieObj?.imdbRating ? ` - ${movieObj?.imdbRating} ☆ ${movieObj?.imdbVotes ? `(${movieObj?.imdbVotes})` : ''}` : ''}</h2>
        <h3>{movieObj?.Director}</h3>
        <p>Runtime: {movieObj?.Runtime}</p>
        <p>Genre: {movieObj?.Genre}</p>
        <p>Language: {movieObj?.Language}</p>
        <p>Country: {movieObj?.Country}</p>
        {movieObj?.Actors ? <ul>Actors: {movieObj?.Actors.split(', ').map((actor: string) => (
          <li key={actor}>{actor}</li>
        ))}</ul> : <></>}
      </>) : <></>}
    </div>
  )
}
