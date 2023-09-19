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
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <div className="!z-5 relative flex flex-col rounded-[20px] max-w-[300px] md:max-w-[400px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full !p-6 3xl:p-![18px] bg-white undefined">
        <div className="mb-3">
          <label htmlFor="searchTermInput" className="text-sm text-navy-700 dark:text-white font-bold">Search a movie:</label>
          <input type="text" id="searchTermInput" placeholder="Search a movie..."
            className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
            onChange={e => setSearchTermInput(e.target.value)} />
        </div>
        <MovieBox movieNameOrId={searchTerm} favoritable />
      </div>
    </div>
  )
}
