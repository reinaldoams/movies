"use client"
import React, { useEffect, useState } from 'react'
import MovieBox from './MovieBox'

export default function MovieSearchBox() {
  const [searchTermInput, setSearchTermInput] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [setTimeOutId, setSetTimeOutId] = useState<any>()

  useEffect(() => {
    clearTimeout(setTimeOutId)
    const id = setTimeout(updateSearchTerm, 1500)
    setSetTimeOutId(id)
    function updateSearchTerm() {
      setSearchTerm(searchTermInput)
    }
  }, [searchTermInput])

  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <label htmlFor="searchTermInput">Search a movie:</label>
        <input id="searchTermInput" value={searchTermInput} onChange={e => setSearchTermInput(e.target.value)} />
      </form>
      <MovieBox movieNameOrId={searchTerm} />
    </div>
  )
}
