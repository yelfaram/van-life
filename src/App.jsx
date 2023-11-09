import About from "./pages/About"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Vans from "./pages/Vans/Vans"
import VanDetail from "./pages/Vans/VanDetail"
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostVans from "./pages/Host/HostVans"
import HostVanDetail from "./pages/Host/HostVanDetail"
import HostVanInfo from "./pages/Host/HostVanInfo"
import HostVanPhotos from "./pages/Host/HostVanPhotos"
import HostVanPricing from "./pages/Host/HostVanPricing"
import Layout from "./components/Layout"
import HostLayout from "./components/Host/HostLayout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "../server"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* rendering nested routes to allow resuability of navbar/footer */}
                <Route path="/" element={<Layout />}> 
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="vans" element={<Vans />} />
                    <Route path="vans/:id" element={<VanDetail />} />
                    
                    <Route path="host" element={<HostLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="income" element={<Income />} />
                        <Route path="vans" element={<HostVans />} />
                        <Route path="reviews" element={<Reviews />} />
                        {/* nested route for van details */}
                        <Route path="vans/:id" element={<HostVanDetail />}>
                            <Route index element={<HostVanInfo />}/>
                            <Route path="pricing" element={<HostVanPricing />} />
                            <Route path="photos" element={<HostVanPhotos /> } />
                        </Route>
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}


export default App