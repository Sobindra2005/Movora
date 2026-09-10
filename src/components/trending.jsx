import { useRef } from "react";
import { MovieCard, SkeletonMovieCard } from "./movieCard";

export function Trending({ movies, isLoading }) {
    const ScrollContainerRef = useRef(null)

    function Scroll(direction) {
        const { clientWidth, scrollLeft } = ScrollContainerRef.current
        const scrollOffset = direction === 'left' ? scrollLeft- clientWidth : scrollLeft + clientWidth
        ScrollContainerRef.current.scrollTo({ left: scrollOffset })
    }

    return (
        <div className="py-6 px-12 relative">
            <h2 className="text-white text-xl font-bold mb-4 tracking-wider uppercase">
                TRENDING NOW
            </h2>

            <div className="group relative">
                <button
                    onClick={() => Scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden md:block -ml-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>

                <div
                    ref={ScrollContainerRef}
                    className="flex space-x-4  overflow-x-auto scrollbar-hide snap-x scroll-smooth pb-4"
                >
                    {
                        isLoading ?
                            Array.from({ length: 14 }, (_, index) => <SkeletonMovieCard key={index} />)
                            :
                            movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))
                    }
                </div>

                <button
                    onClick={() => Scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden md:block -mr-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
            </div>

        </div>
    )
}