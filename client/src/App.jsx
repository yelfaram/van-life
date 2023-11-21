import About from "./pages/About"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import { action as loginAction } from "./pages/Login.action"
import { loader as loginLoader } from "./pages/Login.loader"
import Vans from "./pages/Vans/Vans"
import { loader as vansLoader } from "./pages/Vans/Vans.loader"
import VanDetail from "./pages/Vans/VanDetail"
import { loader as vanDetailLoader } from "./pages/Vans/VanDetail.loader"
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostVans from "./pages/Host/HostVans"
import { loader as hostVansLoader } from "./pages/Host/HostVans.loader"
import HostVanDetail from "./pages/Host/HostVanDetail"
import { loader as hostVanDetailLoader } from "./pages/Host/HostVanDetail.loader"
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
import { requireAuth } from "../utils"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} > 
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route 
                path="vans" 
                element={<Vans />}
                loader={vansLoader}
                errorElement={<Error />} 
            />
            <Route 
                path="vans/:id" 
                element={<VanDetail />} 
                loader={vanDetailLoader}
                errorElement={<Error />} 
            />
            <Route 
                path="login" 
                element={<Login />} 
                loader={loginLoader}
                action={loginAction}
            />
            
            <Route path="host" element={<HostLayout />}>
                <Route 
                    index 
                    element={<Dashboard />} 
                    loader={hostVansLoader}
                />
                <Route 
                    path="income" 
                    element={<Income />}
                    loader={async ({ request }) => await requireAuth(request)}
                />
                <Route 
                    path="vans" 
                    element={<HostVans />}
                    loader={hostVansLoader}
                    errorElement={<Error />}  
                />
                <Route 
                    path="reviews" 
                    element={<Reviews />}
                    loader={async ({ request }) => await requireAuth(request)}
                />
                <Route 
                    path="vans/:id" 
                    element={<HostVanDetail />}
                    loader={hostVanDetailLoader}
                    errorElement={<Error />} 
                >
                    <Route 
                        index 
                        element={<HostVanInfo />}
                        loader={async ({ request }) => await requireAuth(request)}
                    />
                    <Route 
                        path="pricing" 
                        element={<HostVanPricing />}
                        loader={async ({ request }) => await requireAuth(request)}
                    />
                    <Route 
                        path="photos" 
                        element={<HostVanPhotos /> }
                        loader={async ({ request }) => await requireAuth(request)}
                    />
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