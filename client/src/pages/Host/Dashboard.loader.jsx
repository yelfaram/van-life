import { requireAuth } from "../../../utils"
import { defer } from "react-router-dom"
import { getHostVans, getHostRentedVans } from "../../../api"

export async function loader({ request }) {
    await requireAuth(request)
    const allHostVansPromise = getHostVans()
    const hostRentedVansPromise = getHostRentedVans()
    return defer({ allHostVans: allHostVansPromise, hostRentedVans: hostRentedVansPromise })
}