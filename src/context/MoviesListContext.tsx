"use client"

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

interface MoviesListContextValues {
    favoritedMovies: string[] | null,
    setFavoritedMovies: Dispatch<SetStateAction<string[]>> | null
}

export const MoviesListContext = createContext<MoviesListContextValues>({
    favoritedMovies: null,
    setFavoritedMovies: null
})

export const MoviesListContextProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [favoritedMovies, setFavoritedMovies] = useState<string[]>([])
    const values: MoviesListContextValues = {
        favoritedMovies,
        setFavoritedMovies
    }

    return <MoviesListContext.Provider value={values}>
        {children}
    </MoviesListContext.Provider>
}

export function useMoviesListContext() {
    return useContext(MoviesListContext)
}