import { redirect } from "react-router-dom"

export async function requireAuth() {
    // fake auth
    const isLoggedIn = false
    if (!isLoggedIn) {
        // workaround for issue with React Router 6 and MirageJS (not compatible)
        const response = redirect("/login?message=You must log in first")
        response.body = true
        throw response  
        // throw redirect('/login') doesn't work
    }
    return null
}