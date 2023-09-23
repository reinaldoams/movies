"use client"
import React, { useEffect, useState } from 'react'
import useMoviesApi, { imageObj, movieObject } from '../hooks/useMoviesApi'
import { useMoviesListContext } from '@/context/MoviesListContext'

type Props = { movieNameOrId: string, isId?: boolean, favoritable?: boolean, favorite?: boolean }

export default function MovieBox({ movieNameOrId, isId, favoritable }: Props) {
  const [movieObj, setMovieObj] = useState<movieObject>()
  const [imageObj, setImageObj] = useState<imageObj>({ imageUrl: '', imageAlt: '', imgError: false })
  const { getMovie, getImage } = useMoviesApi()
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  const { favoritedMovies, setFavoritedMovies } = useMoviesListContext()
  function handleHeartClick(title: string, isFavorite: boolean) {
    if (!isFavorite) {
      setFavoritedMovies && favoritedMovies && setFavoritedMovies([...favoritedMovies, title])
    } else {
      const filteredFavoritedMovies = favoritedMovies && [...favoritedMovies].filter(movieName => {
        return movieName !== title
      })
      setFavoritedMovies && filteredFavoritedMovies && setFavoritedMovies(filteredFavoritedMovies)
    }
  }

  useEffect(() => {
    async function fetchMovie() {
      const movieObjForState = await getMovie(movieNameOrId || '', isId || false)
      const imageObjFromFetch = await getImage(movieNameOrId || 'movie')
      setMovieObj(movieObjForState)
      setImageObj(imageObjFromFetch)
    }
    if (movieNameOrId) fetchMovie()
    if (movieObj?.Title && favoritedMovies?.indexOf(movieObj?.imdbID) !== -1) {
      setIsFavorite(true)
    } else {
      setIsFavorite(false)
    }
  }, [movieNameOrId, favoritedMovies])

  return (
    <div className='flex items-center justify-center from-[#F9F5F3] via-[#F9F5F3] to-[#F9F5F3] bg-gradient-to-br'>
      <div className='w-full max-w-md  mx-auto bg-white rounded-3xl shadow-xl overflow-hidden'>
        <div className='max-w-md mx-auto'>
          {imageObj?.imageUrl ? <a href={`/movies/${movieObj?.imdbID}`}><div className='h-[236px]' style={{
            backgroundImage: `url(${imageObj?.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            {favoritable && movieObj?.Title ? (
              <>
                <span className="flex justify-end p-4 text-4xl" onClick={() => handleHeartClick(movieObj.imdbID, isFavorite)}>
                  <span className="cursor-pointer">{isFavorite ? '💙' : '🤍'}</span>
                </span>
              </>
            ) : <></>}
          </div></a> : <></>}
          <div className='p-4 sm:p-6'>
            <a href={`/movies/${movieObj?.imdbID}`}>
              <p className='font-bold text-gray-700 text-[22px] leading-7 mb-1'>{movieObj?.Title || 'Search a movie!'}</p>
            </a>
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
}
