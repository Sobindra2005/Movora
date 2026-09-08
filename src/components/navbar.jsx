export function NavBar() {
    return (
        <div>
            <div className="flex items-center space-x-8">
                <a href="#" className="flex items-center">
                    <img src="/logo.png" alt="MOVORA Logo" className="h-8 object-contain" />
                </a>
                <a href="#" className="text-white text-sm font-semibold tracking-wider hover:text-gray-300 transition-colors">
                    MOVIES
                </a>
                <a href="#" className="text-white text-sm font-semibold tracking-wider hover:text-gray-300 transition-colors">
                    SERIES
                </a>
                <a href="#" className="text-white text-sm font-semibold tracking-wider hover:text-gray-300 transition-colors">
                    KIDS
                </a>
                <a href="#" className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600 text-sm font-bold tracking-wider hover:from-purple-300 hover:to-pink-500 transition-colors  ml-4">
                    AI MATCHMAKER
                </a>
            </div>
        </div>
    )
}