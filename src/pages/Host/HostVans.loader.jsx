import { getHostVans } from "../../../api"
import { requireAuth } from "../../../utils"

export async function loader() {
    await requireAuth()
    return getHostVans()
}