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

export async function getHostVans() {
    const res = await fetch("/api/host/vans")
    if (!res.ok) {
        const error = {
            message: "Failed to fetch host vans",
            statusText: res.statusText,
            status: res.status,
        }
        console.error("Error in getHostVans:", error)
        throw error
    }
    const data = await res.json()
    return data.vans
}

export async function getHostVanById(id) {
    const res = await fetch(`/api/host/vans/${id}`)
    if (!res.ok) {
        const error = {
            message: `Failed to fetch host van by id: ${id}`,
            statusText: res.statusText,
            status: res.status,
        }
        console.error("Error in getHostVanById:", error)
        throw error
    }
    const data = await res.json()
    return data.vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}