import About from "./pages/About"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Vans from "./pages/Vans/Vans"
import { loader as VansLoader } from "./pages/Vans/Vans.loader"
import VanDetail from "./pages/Vans/VanDetail"
import { loader as VanDetailLoader } from "./pages/Vans/VanDetail.loader"
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostVans from "./pages/Host/HostVans"
import HostVanDetail from "./pages/Host/HostVanDetail"
import HostVanInfo from "./pages/Host/HostVanInfo"
import HostVanPhotos from "./pages/Host/HostVanPhotos"
import HostVanPricing from "./pages/Host/HostVanPricing"
import Layout from "./components/Layout"
import Error from "./components/Error"
import HostLayout from "./components/Host/HostLayout"
import { 
    RouterProvider, 
    createBrowserRouter, 
    createRoutesFromElements,  
    Route 
} from "react-router-dom"
import "../server"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<Error />} > 
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route 
                path="vans" 
                element={<Vans />}
                loader={VansLoader}
            />
            <Route 
                path="vans/:id" 
                element={<VanDetail />} 
                loader={({ params }) => VanDetailLoader(params.id)}
            />
            
            <Route path="host" element={<HostLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="income" element={<Income />} />
                <Route path="vans" element={<HostVans />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="vans/:id" element={<HostVanDetail />}>
                    <Route index element={<HostVanInfo />}/>
                    <Route path="pricing" element={<HostVanPricing />} />
                    <Route path="photos" element={<HostVanPhotos /> } />
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Route>
    )
)

function App() {
    return (
        <RouterProvider 
            router={router}
            fallbackElement={<div className="loading"><h2>Loading...</h2></div>}
        />
    )
}


export default App