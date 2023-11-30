import React from "react"
import { Await, useLoaderData } from "react-router-dom"
import Loading from "../components/Loading"

function Rentals() {
    // defer promise
    const { rentals } = useLoaderData()

    function renderRentalsElements(rentals) {
        console.log(rentals)

        return (
            <div>
                Rental page here
            </div>
        )
    }

    return (
        <div>
            <React.Suspense fallback={<Loading />}>
                <Await resolve={rentals}>
                    {renderRentalsElements}
                </Await>
            </React.Suspense>
        </div>
    )
}

export default Rentals