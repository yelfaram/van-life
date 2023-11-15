import { getHostVans } from "../../../api"
import { requireAuth } from "../../../utils"

export async function loader({ request }) {
    await requireAuth(request)
    return getHostVans()
}