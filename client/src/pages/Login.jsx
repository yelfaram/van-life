import { useLoaderData, Form, useActionData, useNavigation } from "react-router-dom"

function Login() {
    const error = useActionData();
    // loader message for protected routes
    const message = useLoaderData()
    // for navigation state
    const navigation = useNavigation();

    return (
        <div className="login--container">
            <h1>Sign in to your account</h1>
            { message && <h4 className="red">{ message }</h4>}
            <br />
            { error && <h4 className="red">{ error.message }</h4>}
            <Form 
                method="post" 
                className="login--form"
                replace
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
                <button disabled={navigation.state === "submitting"}>
                    {navigation.state === "submitting" ? "Signing in ..." : "Sign in"}
                </button>
            </Form>
        </div> 
    )   
}

export default Login