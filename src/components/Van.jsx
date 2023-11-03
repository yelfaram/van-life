import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

function Van(props) {
    let styles
    switch (props.type) {
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
        <div className="van--container">
            <Link to={`/vans/${props.id}`} className="van--link">
                <img className="van--img" src={props.imageUrl} />

                <div className="van--info">
                    <h3 className="van--name">{props.name}</h3>
                    <p className="van--price">
                        {props.price}<span>/day</span>
                    </p>
                </div>
                <h3 className="van--type" style={styles}>{props.type}</h3>
            </Link>
        </div>
    )
}

Van.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    type: PropTypes.string,
}

export default Van