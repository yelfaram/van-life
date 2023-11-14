import { getHostVanById } from "../../../api"
import { requireAuth } from "../../../utils"

export async function loader({ params }) {
    await requireAuth()
    return getHostVanById(params.id)
}