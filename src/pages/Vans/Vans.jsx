import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom";
import Van from "../../components/Vans/Van"

function Vans() {
    const [allVans, setAllVans] = useState([])
    // for filtering
    const [searchParams, setSearchParams] = useSearchParams()

    const typeFilter = searchParams.get("type")

    useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setAllVans(data.vans))
    },[])

    if (!allVans.length > 0) {
        return <div className="loading"><h2>Loading...</h2></div>
    }

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            (value === null) ? prevParams.delete(key) : prevParams.set(key, value)
            return prevParams
        })
    }

    const filteredVans = typeFilter ? allVans.filter(van => van.type === typeFilter) : allVans

    const vanElements = filteredVans.map(van => {
        return <Van key={van.id} {...van} searchParams={`?${searchParams.toString()}`} typeFilter={typeFilter}/>
    })

    return (
        <div>
            <h1 className="vans--header">Explore our van options</h1>
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
        </div>
    )
}

export default Vans