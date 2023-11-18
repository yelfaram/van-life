import PropTypes from 'prop-types';
import { BsStarFill } from "react-icons/bs"

function Review(props) {
    return (
        <div className="review--container">
            {Array.from({ length: props.rating }, (_, i) => (
                <BsStarFill className="review--star" key={i} />
            ))}
            <div className="review--info">
                <p className="review--name">{props.name}</p>
                <p className="review--date">{props.date}</p>
            </div>
            <p>{props.text}</p>
            <hr />
        </div>
    )
}

Review.propTypes = {
    rating: PropTypes.number,
    name: PropTypes.string,
    date: PropTypes.string,
    text: PropTypes.string,
}

export default Review