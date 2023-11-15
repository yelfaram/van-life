import React from "react"
import { useLoaderData, useSearchParams, Await } from "react-router-dom";
import Van from "../../components/Vans/Van"
import Loading from "../../components/Loading"

function Vans() {
    // for filtering
    const [searchParams, setSearchParams] = useSearchParams()
    const typeFilter = searchParams.get("type")

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            (value === null) ? prevParams.delete(key) : prevParams.set(key, value)
            return prevParams
        })
    }

    // defer promise
    const { allVans } = useLoaderData()

    function renderVansElements(allVans) {
        const filteredVans = typeFilter ? allVans.filter(van => van.type === typeFilter) : allVans
        const vanElements = filteredVans.map(van => {
            return <Van key={van.id} {...van} searchParams={`?${searchParams.toString()}`} typeFilter={typeFilter}/>
        })
        return (
            <>
                <div className="vans--filter">
                    <button 
                        onClick={() => handleFilterChange("type", "simple")}
                        className={`vans--filter-type simple ${typeFilter === "simple" ? "selected" : ""}`}
                    >
                        Simple
                    </button>
                    <button 
                        onClick={() => handleFilterChange("type", "luxury")}
                        className={`vans--filter-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}
                    >
                        Luxury
                    </button>
                    <button 
                        onClick={() => handleFilterChange("type", "rugged")}
                        className={`vans--filter-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}
                    >
                        Rugged
                    </button>
                    {typeFilter && (<button 
                        onClick={() => handleFilterChange("type", null)}
                        className="vans--filter-clear"
                    >
                        Clear filters
                    </button>)}
                </div>
                <div className="vans--container">
                    {vanElements}
                </div>
            </>
        )
    }

    return (
        <div>
            <h1 className="vans--header">Explore our van options</h1>
            <React.Suspense fallback={<Loading />}>
                <Await resolve={allVans}>
                    {renderVansElements}
                </Await>
            </React.Suspense>
        </div>
    )
}

export default Vans