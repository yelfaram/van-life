import { getVanById } from "../../../api"

export function loader(id) {
    return getVanById(id)
}