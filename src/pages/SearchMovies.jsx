import { useEffect, useState } from "react"
import { movieApi } from "../api"
import { MovieCard, SkeletonMovieCard } from "../components/movieCard"
import { useLocation, useSearchParams } from "react-router-dom"

export function SearchMovies() {
    const [movieList, setMovieList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchParams] = useSearchParams()

    const query = searchParams.get('movie')
    const location = useLocation();

    console.log(location.state)

    useEffect(() => {
        async function FetchSearchMovie() {
            try {
                setError(null)
                setIsLoading(true)
                const response = await movieApi.get('/search/movie', {
                    params: {
                        query: query
                    }
                })
                setMovieList(response.data.results)
            } catch (err) {
                console.log(err.message)
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }
        FetchSearchMovie()
    }, [])

    return (
        <main className="min-h-screen mt-10 bg-slate-950 px-6 py-10 text-white sm:px-10">
            <section className="mx-auto max-w-6xl">
                <header className="mb-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">TMDB search</p>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Movie search</h1>
                </header>

                {
                    isLoading && <div className=" grid gap-4 grid-cols-6">
                        {Array.from({ length: 18 }, (_, index) => <SkeletonMovieCard key={index} />)}
                    </div>
                }

                {
                !isLoading && error && (
                    <p className="rounded-md border border-red-400/30 bg-red-950/40 p-4 text-red-200" role="alert">
                        {error}
                    </p>
                )}

                {!isLoading && movieList.length === 0 && (
                    <p className="text-slate-300">No movies were found.</p>
                )}

                {!isLoading && movieList.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
                        {movieList.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
                    </div>
                )}
            </section>
        </main>
    )
}