export function NavBar() {
    return (
        <div className="flex justify-between p-4">
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

            <div className="flex items-center space-x-6">
                <div className="relative flex items-center">
                    <form className="relative animate-in fade-in slide-in-from-right-4 duration-300">
                        <input
                            type="text"
                            placeholder="Search movies..."
                            autoFocus
                            className="bg-black/50 border border-gray-600 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:border-gray-700 transition-colors w-64"
                        />
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </form>
                </div>

                <button className="w-8 h-8 rounded-full overflow-hidden border border-gray-500">
                    <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                </button>
            </div>
        </div>
    )
}