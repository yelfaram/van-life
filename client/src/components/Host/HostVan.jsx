import { useState } from "react"
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Modal from "../../components/Host/Edit/Modal"

function HostVan(props) {
    // for modal add form
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

            {!props.isDashboard && (
                <div className="host-van--actions">
                    <button className="host-van--edit-btn" onClick={handleOpen}>
                        <FaEdit />
                    </button>
                    <Modal 
                        open={open} 
                        handleClose={handleClose}
                        van_id={props.van_id} 
                        name={props.name}
                        type={props.type}
                        price={props.price}
                        description={props.description}
                        image_url={props.image_url}
                    />
                    <button className="host-van--delete-btn" onClick={() => handleVanDelete(props.van_id)}>
                        <FaTrash />
                    </button>
                </div>
            )}
        </div>
    )
}

HostVan.propTypes = {
    van_id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    type: PropTypes.string,
    description: PropTypes.string,
    image_url: PropTypes.string,
    isDashboard: PropTypes.bool,
}

export default HostVan