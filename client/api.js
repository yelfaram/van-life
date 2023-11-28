export async function getVans() {
    const res = await fetch("http://localhost:3000/vans", { credentials: "include" })
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
    const res = await fetch(`http://localhost:3000/vans/${id}`, { credentials: "include" })
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
    return data.van
}

export async function getHostVans() {
    const res = await fetch("http://localhost:3000/host/vans", { credentials: "include" })
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
    return data.hostVans
}

export async function getHostVanById(id) {
    const res = await fetch(`http://localhost:3000/host/vans/${id}`, { credentials: "include" })
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
    return data.hostVan
}

export async function registerUser(creds) {
    const res = await fetch("http://localhost:3000/register",
    {
        method: "POST",
        body: JSON.stringify(creds),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    const data = await res.json();
    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }
    return data
}

export async function loginUser(creds) {
    const res = await fetch("http://localhost:3000/login", 
        { 
            method: "POST", 
            body: JSON.stringify(creds),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        }
    )
    const data = await res.json();
    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }
    return data
}

export async function logoutUser() {
    const res = await fetch("http://localhost:3000/logout", { credentials: "include" })
    const data = await res.json();
    console.log("LogoutUser was called", data)
    if (!res.ok) {
        throw new Error(`Logout failed: ${data.message}`);
    }
    return data
}

export async function rentVan(id, startDate, endDate) {
    const res = await fetch(`http://localhost:3000/vans/${id.toString()}/rent`,
        {
            method: 'POST',
            body: JSON.stringify({ startDate, endDate }),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        } 
    )
    const data = await res.json();
    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }
    return data
}