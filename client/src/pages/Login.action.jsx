import { redirect } from "react-router-dom"
import { loginUser } from "../../api"

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")

    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"
 
    try {
        await loginUser({ email, password })
        localStorage.setItem("loggedIn", true)
        
        // workaround for issue with React Router 6 and MirageJS (not compatible)
        const response = redirect(pathname)
        response.body = true
        return response
    } catch (err) {
        return err
    }

    
}