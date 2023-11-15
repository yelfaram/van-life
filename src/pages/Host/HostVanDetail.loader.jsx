import { getHostVanById } from "../../../api"
import { requireAuth } from "../../../utils"

export async function loader({ params, request }) {
    await requireAuth(request)
    return getHostVanById(params.id)
}