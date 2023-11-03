import { useState, useEffect } from "react"
import Van from "../components/Van"

function Vans() {
    const [allVans, setAllVans] = useState([])

    useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setAllVans(data.vans))
    },[])

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