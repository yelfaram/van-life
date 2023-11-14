import { useState } from "react"
import { useLoaderData } from "react-router-dom"

function Login() {
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "" })

    // loader message for protected routes
    const message = useLoaderData()
    
    function handleChange(event) {
        // destructure the name and value of whatever event we capture
        const { name, value } = event.target
        setLoginFormData(prevLoginFormData => {
            return {
                ...prevLoginFormData,
                [name]: value
            }
        })
    }

    function handleFormSubmit(event) {
        // stop page from refreshing and add form data as query string in url
        event.preventDefault()
        console.log(loginFormData)
    }

    return (
        <div className="login--container">
            <h1>Sign in to your account</h1>
            { message && <h4 className="login--protected">{ message }</h4>}
            <form onSubmit={handleFormSubmit} className="login--form">
                <input 
                    type="email"
                    name="email"
                    placeholder="Email address"
                    onChange={handleChange}
                    value={loginFormData.email}
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={loginFormData.password}
                />
                <button>Sign in</button>
            </form>
        </div> 
    )   
}

export default Login