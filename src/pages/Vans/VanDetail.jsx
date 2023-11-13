import { Link, useLocation, useLoaderData } from "react-router-dom"

function VanDetail() {
    const { state } = useLocation()
    
    const van = useLoaderData()

    if (!van) {
        return <div className="loading"><h2>Loading...</h2></div>
    }

    let styles
    switch (van.type) {
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

    // similar to saying "state && state.searchParams" (kind of like conditional rendering)
    // if state exists we take value of state.searchParams if not just empty string
    const searchParams = state?.searchParams || ""
    const type = state?.typeFilter || "all"

    return (
        <section>
            <Link
                to={`..${searchParams}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span>
            </Link>
            <div className="van-detail--container">
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <h2 style={styles}>{van.type}</h2>
                    <h1>{van.name}</h1>
                    <p className="van-detail--price">
                        ${van.price}<span>/day</span>
                    </p>
                    <p className="van-detail--description">{van.description} </p>

                    <button className="van-detail--rent">Rent this van</button>
                </div>    
            </div>
        </section>
    )
}

export default VanDetail