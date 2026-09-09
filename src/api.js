import axios from "axios";

const baseUrl = 'https://api.themoviedb.org/3';
const tmdbApi = import.meta.env.VITE_TMDB_API_KEY

export const movieApi = axios.create({
    baseURL: baseUrl,
    params: {
        api_key: tmdbApi
    }
})