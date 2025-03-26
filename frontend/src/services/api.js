const API_KEY= "11b5226b7891d34f2e154b63d22a5c09";
const BASE_URL= " https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results
};

export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&query=${encodeURIComponent(
            query
        )}`
    );
    const data = await response.json();
    return data.results
};