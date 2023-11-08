import { Outlet } from "react-router-dom"

function Dashboard() {
    return (
        <>
            <h1>Host Dashboard here</h1>

            <Outlet />
        </>
    )
}

export default Dashboard