import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../../api"
import { useAuth } from "../hooks/AuthContext"

function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm()
    

    async function onSubmit(data) {
        const { firstName, lastName, email, password, userType } = data
        
        setLoading(true);

        const defaultPath = userType === "host" ? "/host" : "/"
        const pathname = new URL(window.location.href).searchParams.get("redirectTo") || defaultPath

        try {
            const { success, message } = await registerUser({
                firstName,
                lastName,
                email,
                password,
                userType,
            })

            if (success) {
                // pass user type here to save globally
                login(userType) // updates global context state
                navigate(pathname)
            } else {
                setError(`Registration failed: ${message}`);
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="register--container">
            <h1>Create an account</h1>
            { error && <><h4 className="red">{ error }</h4><br /></>}
            {Object.keys(errors).map((key) => (
                <h4 key={key} className="red">{errors[key]?.message}</h4>
            ))}
            <form 
                className="register--form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="register--names">
                    <input 
                        type="text"
                        {...register("firstName", { required: "First name is required" })}
                        placeholder="First name"
                    />
                    <input 
                        type="text"
                        {...register("lastName", { required: "Last name is required" })}
                        placeholder="Last name"
                    />
                </div>
                <input 
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="Email address"
                />
                <div className="register--passwords">
                    <input 
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        placeholder="Password"
                    />
                    <input 
                        type="password"
                        name="confirmPassword"
                        {...register("confirmPassword", { 
                            required: true,
                            validate: value => value === getValues("password") || "Passwords do not match"
                        })}
                        placeholder="Confirm password"
                    />
                </div>
                <div className="register--types">
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
                        {...register('userType', { required: "User type is required"  })}
                        value="renter"
                        />
                    </label>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Creating account..." : "Create account"}
                </button>
            </form>
        </div>
    )
}

export default Register