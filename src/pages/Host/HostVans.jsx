import HostVan from "../../components/Host/HostVan"
import { useLoaderData } from "react-router-dom"

function HostVans() {
    // loader data
    const allHostVans = useLoaderData()

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