import React from "react"
import { useLoaderData, Await } from "react-router-dom"
import HostVan from "../../components/Host/HostVan"
import Loading from "../../components/Loading"

function HostVans() {
    // defer promise
    const { allHostVans } = useLoaderData()

    function renderHostVansElements(allHostVans) {
        const hostVanElements = allHostVans.map(hostVan => {
            return <HostVan key={hostVan.id} {...hostVan} isDashboard={false}/>
        })

        return (
            <div className="host-vans--container">
                {hostVanElements}
            </div>
        )
    }
    
    return (
        <div>
            <h1 className="host-vans--header">Your listed vans</h1>
            <React.Suspense fallback={<Loading />}>
                <Await resolve={allHostVans}>
                    {renderHostVansElements}
                </Await>
            </React.Suspense>
        </div>
    )
}

export default HostVans