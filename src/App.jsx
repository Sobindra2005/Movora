import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NavBar } from "./components/navbar"
import { Home } from "./pages/home"

function App() {

  return (
    <main className="border h-dvh bg-[#030712]">
      <BrowserRouter>
        <NavBar />
        <div className="h-full">
          <Routes>
            <Route path='/' element={<Home/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  )
}

export default App
