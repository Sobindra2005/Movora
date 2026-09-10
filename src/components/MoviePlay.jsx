import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movieApi } from "../api";

export function MoviePlay() {
    const { id } = useParams()
    const [videoKey, setVideoKey] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                const response = await movieApi.get(`/movie/${id}/videos`)

                const video = response.data.results.find((vid)=>vid.site === "YouTube" && vid.type=== 'Trailer')
                setVideoKey(video.key)
            } catch (err) {
                console.log(err.message)
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchMovieDetails()
    }, [])


    return (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
            {/* Close Button */}
            <button
            onClick={()=>navigate(-1)}
                className="absolute top-6 right-8 text-white hover:text-gray-300 z-[110] bg-black/50 p-2 rounded-full"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            {isLoading ? (
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin "></div>
            ) : videoKey ? (
                <div className="w-full h-full max-w-[90vw] max-h-[90vh] aspect-video">
                    <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${videoKey}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            ) : (
                <div className="text-white text-xl">No video available for this movie.</div>
            )
            }
        </div >
    );
}