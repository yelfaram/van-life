import { useState, useEffect } from "react"
import Van from "../../components/Vans/Van"

function Vans() {
    const [allVans, setAllVans] = useState([])

    useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setAllVans(data.vans))
    },[])

    if (!allVans.length > 0) {
        return <div className="loading"><h2>Loading...</h2></div>
    }

    const vanElements = allVans.map(van => {
        return <Van key={van.id} {...van} />
    })

    return (
        <div>
            <h1 className="vans--filter-header">Explore our van options</h1>
            <div className="vans--container">
                {vanElements}
            </div>
        </div>
    )
}

export default Vans