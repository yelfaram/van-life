import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form";
import { loginUser } from "../../api"
import { useAuth } from "../hooks/AuthContext"


function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    // message for protected routes
    useEffect(() => {
        const message = new URL(window.location.href).searchParams.get("message")
        if (message) setMessage(message)
    }, [message])

    async function onSubmit(data) {
        const { email, password, userType } = data

        setLoading(true)

        const defaultPath = userType === "host" ? "/host" : "/"
        const pathname = new URL(window.location.href).searchParams.get("redirectTo") || defaultPath

        try {
            const { success, message } = await loginUser({ email, password, userType })

            if (success) {
                // pass user type here to save globally
                login(userType) // updates global context state
                navigate(pathname) // redirect user back to host or whatever protected page he accessed
            } else {
                setError(`Login failed: ${message}`)
                return new Response(`Login failed: ${message}`, { status: 401 });
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login--container">
            <h1>Sign in to your account</h1>
            { message && <><h4 className="red">{ message }</h4><br /></>}
            {Object.keys(errors).map((key) => (
                <h4 key={key} className="red">{errors[key]?.message}</h4>
            ))}
            { error && <><br /><h4 className="red">{ error }</h4></>}
            <form
                className="login--form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <input 
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="Email address"
                />
                <input 
                    type="password"
                    {...register("password", { required: "Password is required" })}
                    placeholder="Password"
                />
                <div className="login--types">
                    <label>
                        Host
                        <input
                        type="radio"
                        {...register("userType", { required: "User type is required" })}
                        value="host"
                        />
                    </label>
                    <label>
                        Renter
                        <input
                        type="radio"
                        {...register('userType', { required: "User type is required" })}
                        value="renter"
                        />
                    </label>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Signing in ..." : "Sign in"}
                </button>
            </form>
            <div className="login--create">
                <p>
                    Don&#39;t have an account? <Link to="/register">Create one now</Link>
                </p>
            </div>
        </div> 
    )   
}

export default Login