import React from "react"
import { Link, Await, useLoaderData } from "react-router-dom"
import { BsStarFill } from "react-icons/bs"
import HostVan from "../../components/Host/HostVan"
import Loading from "../../components/Loading"
import { isWithinLast30Days } from "../../../utils"

function Dashboard() {
    // defer promise
    const { allHostVans, hostRentedVans, hostReviews } = useLoaderData()

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

    function renderHostIncome(hostRentedVans) {
        const totalIncome  = hostRentedVans
            .filter(rentedVan => isWithinLast30Days(rentedVan, "placed_date"))
            .reduce((totalIncome, rentedVan) => totalIncome + rentedVan.total_cost, 0) || 0

        return (
            <div>
                <h2>Welcome!</h2>
                <p>Income last <span>30 days</span></p>
                <h1>${totalIncome}</h1>
            </div>
        )
    }

    function renderHostReview(hostReviews) {
        const overallRating = (hostReviews.reduce((sum, review) => sum + review.rating, 0) / hostReviews.length).toFixed(1)

        return (
            <>
                <h2>Review score</h2>
                <BsStarFill className="star" />
                <p>{overallRating}<span>/5</span></p>
            </>
        )
    }

    return (
        <>
            <section className="dashboard--income">
                <React.Suspense fallback={<Loading />}>
                    <Await resolve={hostRentedVans}>
                        {renderHostIncome}
                    </Await>
                </React.Suspense>
                <Link
                    to="income"
                >
                    Details
                </Link>
            </section>
            <section className="dashboard--reviews">
                <React.Suspense fallback={<Loading />}>
                    <Await resolve={hostReviews}>
                        {renderHostReview}
                    </Await>
                </React.Suspense>
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
        </>
    )
}

export default Dashboard