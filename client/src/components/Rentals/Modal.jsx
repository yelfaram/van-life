import { Dialog } from "@mui/material"
import PropTypes from 'prop-types';
import ReviewForm from "./ReviewForm";

function Modal(props) {
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <ReviewForm vanId={props.vanId} email={props.email}/>
        </Dialog>
    )
}

Modal.propTypes = {
    vanId: PropTypes.number,
    email: PropTypes.string,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default Modal