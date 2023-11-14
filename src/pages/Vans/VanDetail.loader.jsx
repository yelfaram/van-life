import { getVanById } from "../../../api"

export function loader({ params }) {
    return getVanById(params.id)
}