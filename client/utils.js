import { redirect } from "react-router-dom"

export async function requireAuth(request) {
    // fake auth
    const isLoggedIn = localStorage.getItem("loggedIn")
    const pathname = new URL(request.url).pathname
    if (!isLoggedIn) {
        // workaround for issue with React Router 6 and MirageJS (not compatible)
        const response = redirect(`/login?message=You must log in first&redirectTo=${pathname}`)
        response.body = true
        throw response  
        // throw redirect('/login') doesn't work
    }
    return null
}