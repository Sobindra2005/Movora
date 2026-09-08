import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NavBar } from "./components/navbar"


function App() {

  return (
    <main className="border h-dvh bg-[#030712]">
      <BrowserRouter>
        <NavBar />
        <div>
          <Routes>
            <Route path='' element={<div className="text-white">here we go</div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  )
}

export default App
