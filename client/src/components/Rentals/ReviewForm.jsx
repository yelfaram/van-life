import { useState } from "react"
import { useForm } from "react-hook-form";
import { Rating } from '@mui/material';
import PropTypes from 'prop-types';
import { postUserReview } from "../../../api"


function ReviewForm(props) {
    const [error, setError] = useState(null);

    // react-hook-form
    const {
        register,
        handleSubmit,
        setValue,
    } = useForm()

    const [rating, setRating] = useState(0);

    async function onSubmit(data) {
        const { rating, description } = data
        
        try {
            const { success, message } = await postUserReview(props.email, props.vanId, rating, description)

            if (success) {
                console.log("postUserReview()", message);

                props.handleClose()
            } else {
                console.error("postUserReview() error", message);
            }
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="review-form--container">
            { error && <><br /><h4 className="red">{ error }</h4></>}
            <form
                className="review--form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Rating
                    name="simple-controlled"
                    value={rating}
                    size="large"
                    onChange={(event, newValue) => {
                        setValue("rating", newValue),
                        setRating(newValue);
                    }}
                />
                <textarea
                    rows={4}
                    placeholder="Share details of your own experience"
                    {...register("description", { required: true })}
                />
                <button type="submit">Post</button>
            </form>
        </div>
    )
}

ReviewForm.propTypes = {
    vanId: PropTypes.number,
    email: PropTypes.string,
    handleClose: PropTypes.func,
}

export default ReviewForm