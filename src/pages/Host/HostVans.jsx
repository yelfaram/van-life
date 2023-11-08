import { useState, useEffect } from "react"
import HostVan from "../../components/Host/HostVan"

function HostVans() {
    const [allHostVans, setAllHostVans] = useState([])

    useEffect(() => {
        fetch("/api/host/vans")
            .then(res => res.json())
            .then(data => setAllHostVans(data.vans))
    },[])

    if (!allHostVans.length > 0) {
        return <div className="loading"><h2>Loading...</h2></div>
    }

    const hostVanElements = allHostVans.map(hostVan => {
        return <HostVan key={hostVan.id} {...hostVan} />
    })
    
    return (
        <div>
            <h1 className="host-vans--header">Your listed vans</h1>
            <div className="host-vans--container">
                {hostVanElements}
            </div>
        </div>
    )
}

export default HostVans