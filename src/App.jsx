import About from "./pages/About"
import Home from "./pages/Home"
import Vans from "./pages/Vans"
import VanDetail from "./pages/VanDetail"
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "../server"

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/vans" element={<Vans />} />
                <Route path="/vans/:id" element={<VanDetail />} />
            </Routes>
        </BrowserRouter>
    )
}


export default App