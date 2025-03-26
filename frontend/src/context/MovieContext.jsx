import { createContext, useState, useContext, useEffect} from "react";

const MovieContext = createContext();

export const useMoviesContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        try {
            const storedFavs = localStorage.getItem("favorites");
    
            // Check if storedFavs is valid before parsing
            if (storedFavs && storedFavs !== "undefined" && storedFavs !== "null") {
                setFavorites(JSON.parse(storedFavs));
            } else {
                setFavorites([]); // Fallback to empty array
            }
        } catch (error) {
            console.error("Error parsing favorites from localStorage:", error);
            setFavorites([]); // Fallback in case of parsing errors
        }
    }, []);
    
    

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie]);
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}