export async function getVans() {
    const res = await fetch("/api/vans")
    if (!res.ok) {
        const error = {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status,
        }
        console.error("Error in getVans:", error)
        throw error
    }
    const data = await res.json()
    return data.vans
}

export async function getVanById(id) {
    const res = await fetch(`/api/vans/${id}`)
    if (!res.ok) {
        const error = {
            message: `Failed to fetch van by id: ${id}`,
            statusText: res.statusText,
            status: res.status,
        }
        console.error("Error in getVanById:", error)
        throw error
    }
    const data = await res.json()
    return data.vans
}