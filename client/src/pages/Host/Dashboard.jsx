import React from "react"
import { Outlet, Link, Await, useLoaderData } from "react-router-dom"
import { BsStarFill } from "react-icons/bs"
import HostVan from "../../components/Host/HostVan"
import Loading from "../../components/Loading"

function Dashboard() {
    // defer promise
    const { allHostVans } = useLoaderData()

    function renderHostVansElements(allHostVans) {
        const hostVanElements = allHostVans.map(hostVan => {
            return <HostVan key={hostVan.van_id} {...hostVan} isDashboard={true}/>
        })

        return (
            <div className="dashboard--vans--container">
                {hostVanElements}
            </div>
        )
    }

    return (
        <>
            <section className="dashboard--income">
                <div>
                    <h2>Welcome!</h2>
                    <p>Income last <span>30 days</span></p>
                    <h1>$2,260</h1>
                </div>
                <Link
                    to="income"
                >
                    Details
                </Link>
            </section>
            <section className="dashboard--reviews">
                <h2>Review score</h2>
                <BsStarFill className="star" />
                <p>5.0<span>/5</span></p>
                <Link
                    to="reviews"
                >
                    Details
                </Link>
            </section>
            <section className="dashboard--vans">
                <div>
                    <h2>Your listed vans</h2>
                    <Link
                        to="vans"
                    >
                        View all
                    </Link>
                </div>
                <React.Suspense fallback={<Loading />}>
                    <Await resolve={allHostVans}>
                        {renderHostVansElements}
                    </Await>
                </React.Suspense>
            </section>

            <Outlet />
        </>
    )
}

export default Dashboard