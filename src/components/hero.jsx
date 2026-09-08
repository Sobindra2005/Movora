export function Hero() {
    return (
        <div className="relative h-[77vh] w-full  bg-black flex items-center overflow-hidden">
            {/* Background Image */}
            <div className=" w-full inset-0">
                <img
                    src={'https://occ-0-2794-2218.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABaQuWMREKSXwTSiOqfUu0CziFXajGu9ItZpeIqSe7nzlDcELLq4PjDvoRmIzdd2i_NDidqbx-V1waWRUcPXiH90wHMWQyQquSFpd.jpg?r=dff'}

                    className="w-full h-full object-cover opacity-80"
                />
                {/* Gradients to blend with background and text */}
                <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/40 to-transparent border-2 border-white"></div>
                <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className="absolute z-10 px-12 max-w-2xl">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight uppercase">
                    movie title
                </h1>

                <div className="flex items-center space-x-4 mb-8 text-sm font-medium">
                    <span className="text-gray-300">A Original Film</span>
                    <span className="text-green-500 font-bold">
                        98% Match
                    </span>
                    <span className="text-gray-300">
                        28 sept
                    </span>
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        className="flex items-center justify-center bg-[#a855f7] hover:bg-[#9333ea] text-white font-bold py-3 px-10 rounded-full transition-colors"
                    >
                        PLAY
                    </button>

                    <button className="flex items-center justify-center border-2 border-gray-400 rounded-full w-12 h-12 text-gray-300 hover:text-white hover:border-white transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}