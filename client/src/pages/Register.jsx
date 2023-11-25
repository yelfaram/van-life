import { useState } from "react"
import { Form, useNavigate } from "react-router-dom";
import { registerUser } from "../../api"
import { useAuth } from "../hooks/AuthContext"

function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    

    async function handleFormSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        const pathname = new URL(window.location.href).searchParams.get("redirectTo") || "/"

        try {
            const { success, message } = await registerUser({
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
            })

            if (success) {
                login()
                navigate(pathname)
            } else {
                setError(`Registration failed: ${message}`);
                console.error("Registration failed:", message);
            }
        } catch (err) {
            setError(err.message)
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="register--container">
            <h1>Create an account</h1>
            { error && <h4 className="red">{ error }</h4>}
            <Form 
                method="post" 
                className="register--form"
                replace
                onSubmit={handleFormSubmit}
            >
                <div className="register--names">
                    <input 
                        type="text"
                        name="firstName"
                        placeholder="First name"
                    />
                    <input 
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                    />
                </div>
                <input 
                    type="email"
                    name="email"
                    placeholder="Email address"
                />
                <div className="register--passwords">
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    <input 
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                    />
                </div>
                <button disabled={loading}>
                    {loading ? "Creating account..." : "Create account"}
                </button>
            </Form>
        </div>
    )
}

export default Register