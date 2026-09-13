import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NavBar } from "./components/navbar"
import { Home } from "./pages/home"
import { MovieDetails } from "./pages/movieDetails"
import { MoviePlay } from "./pages/MoviePlay"
import { SearchMovies } from "./pages/SearchMovies"

function App() {

  return (
    <main className="border h-dvh bg-[#030712]">
      <BrowserRouter>
        <NavBar />
        <div className="h-full">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/search" element={<SearchMovies />} />
            <Route path='/movie/:id' element={<MovieDetails />} />
            <Route path='/movie/play/:id' element={<MoviePlay />} />
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  )
}

export default App
