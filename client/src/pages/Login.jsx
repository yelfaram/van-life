import { useState } from "react"
import { useLoaderData, Form, useNavigate } from "react-router-dom"
import { loginUser } from "../../api"
import { useAuth } from "../../AuthContext"


function Login() {
    // loader message for protected routes
    const message = useLoaderData()

    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)

    async function handleFormSubmit(e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const email = formData.get("email")
        const password = formData.get("password")

        if (!email || !password) {
            setError("Please enter both an email and password.");
            return;
        }

        setLoading(true)

        const pathname = new URL(window.location.href).searchParams.get("redirectTo") || "/host"

        try {
            const { success, message } = await loginUser({ email, password })

            if (success) {
                login()
                navigate(pathname)
            } else {
                console.error("Login failed:", message);
                setError(`Login failed: ${message}`)
                return new Response(`Login failed: ${message}`, { status: 401 });
            }
        } catch (err) {
            setError(err.message)
            console.error("Error:", err);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login--container">
            <h1>Sign in to your account</h1>
            { message && <h4 className="red">{ message }</h4>}
            <br />
            { error && <h4 className="red">{ error }</h4>}
            <Form 
                method="post" 
                className="login--form"
                replace
                onSubmit={handleFormSubmit}
            >
                <input 
                    type="email"
                    name="email"
                    placeholder="Email address"
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                <button disabled={loading}>
                    {loading ? "Signing in ..." : "Sign in"}
                </button>
            </Form>
        </div> 
    )   
}

export default Login