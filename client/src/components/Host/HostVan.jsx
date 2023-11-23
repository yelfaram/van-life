import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

function HostVan(props) {
    return (
        <div className="host-van--container">
            <Link to={props.isDashboard ? `vans/${props.van_id.toString()}` : props.van_id.toString()} className="host-van--link">
                <img className="host-van--img" src={props.image_url} />


                <div className="host-van--info">
                    <h3 className="host-van--name">{props.name}</h3>
                    <p className="host-van--price">
                        ${props.price}<span>/day</span>
                    </p>
                </div>
            </Link>
        </div>
    )
}

HostVan.propTypes = {
    van_id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    image_url: PropTypes.string,
    isDashboard: PropTypes.bool,
}

export default HostVan