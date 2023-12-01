import React from "react"
import { Await, useLoaderData } from "react-router-dom"
import Loading from "../components/Loading"
import Rental from "../components/Rentals/Rental"

function Rentals() {
    // defer promise
    const { rentals } = useLoaderData()

    function renderRentalsElements(rentals) {
        const rentalElements = rentals.map(rental => {
            return <Rental key={rental.rental_id} {...rental} />
        })

        return (
            <div className="rentals--container">
                {rentalElements}
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