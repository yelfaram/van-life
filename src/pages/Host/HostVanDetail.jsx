import { Link, Outlet, useLoaderData } from "react-router-dom"
import HostVanDetailNavbar from "../../components/Host/HostVanDetailNavbar"

function HostVanDetail() {
    // loader data
    const hostVan = useLoaderData()

    let styles
    switch (hostVan.type) {
        case "simple":
            styles = { backgroundColor: "#E17654"}
            break;
        case "rugged":
            styles = { backgroundColor: "#115E59" }
            break;
        case "luxury":
            styles = { backgroundColor: "#161616" }
            break;
    }

    return (
        <section>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span>
            </Link>
            <div className="host-van-detail--container">
                <div className="host-van-detail">
                    <img src={hostVan.imageUrl} />

                    <div className="host-van-detail--info">
                        <h2 style={styles}>{hostVan.type}</h2>
                        <h1>{hostVan.name}</h1>
                        <p className="host-van-detail--price">
                            ${hostVan.price}<span>/day</span>
                        </p>
                    </div>
                </div>
                <HostVanDetailNavbar />

                <Outlet context={[hostVan]}/>
            </div>
        </section>
    )
}

export default HostVanDetail