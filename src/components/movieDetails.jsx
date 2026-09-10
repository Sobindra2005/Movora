import { useParams } from "react-router-dom"
import { movieApi } from "../api"
import { useEffect, useState } from "react"

export function MovieDetails() {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                const response = await movieApi.get(`/movie/${id}`)
                setMovie(response.data)
                console.log(response.data)
            } catch (err) {
                console.log(err.message)
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchMovieDetails()
    }, [])

    const formatRuntime = (minutes) => {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    if (isLoading) return null
    else return (
        <div className="w-full h-full overflow-y-auto relative">
            <div className="fixed inset-0 z-0">
                <img
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover opacity-30 blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030712]/20 to-[#030712]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/20 to-transparent"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-24 min-h-full flex flex-col md:flex-row gap-12 items-center md:items-start">
                <div className="w-64 md:w-80 shrink-0 mt-8 md:mt-0 perspective-1000">
                    <div className="rounded-2xl overflow-hidden shadow-2xl shadow-[#a855f7]/20 border border-white/10 group transform transition-transform duration-500 hover:scale-[1.02] hover:-rotate-1">
                        <img
                            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
                <div className="flex-1 text-white pt-4 md:pt-12">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
                        {movie.title || movie.original_title}
                    </h1>

                    {movie.tagline && (
                        <p className="text-xl md:text-2xl text-gray-400 italic mb-6 font-light">
                            "{movie.tagline}"
                        </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 mb-8 text-sm md:text-base font-medium">
                        <span className="flex items-center text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            {movie.vote_average?.toFixed(1)} Rating
                        </span>
                        <span className="text-gray-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                            {movie.release_date?.split('-')[0]}
                        </span>
                        <span className="text-gray-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                            {formatRuntime(movie.runtime)}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {movie.genres?.map(genre => (
                            <span key={genre.id} className="px-4 py-1.5 text-sm bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30 backdrop-blur-sm">
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <div className="mb-10">
                        <h3 className="text-xl font-semibold mb-3 text-white">Overview</h3>
                        <p className="text-gray-300 leading-relaxed text-lg max-w-3xl">
                            {movie.overview}
                        </p>
                    </div>

                    <button
                        className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#a855f7] to-[#8b5cf6] hover:from-[#9333ea] hover:to-[#7c3aed] text-white font-bold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        <span className="text-lg tracking-wider">PLAY PREVIEW</span>
                    </button>
                </div>
            </div>

        </div>
    )
}