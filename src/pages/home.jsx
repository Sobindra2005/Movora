import { useEffect, useState } from "react";
import { Hero } from "../components/hero";
import { Trending } from "../components/trending";
import { movieApi } from "../api";

export function Home() {
    const [TrendingMovies, setTrendingMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchTrendingMovies() {
            try {
                const response = await movieApi.get('/trending/movie/week')
                setTrendingMovies(response.data.results)
            } catch (err) {
                console.log(err.message)
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchTrendingMovies()
    }, [])

    return (
        <div className="h-full overflow-hidden">
            <Hero movie={TrendingMovies[0]} isLoading={isLoading} />
            <div className="-mt-32">
                <Trending movies={TrendingMovies.slice(1,TrendingMovies.length)} isLoading={isLoading} />
            </div>
        </div>
    )
}