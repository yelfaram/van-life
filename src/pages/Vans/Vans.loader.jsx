import { getVans } from "../../../api"

export function loader() {
    return getVans()
}