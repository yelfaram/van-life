import { useState } from "react"
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';

function EditForm(props) {
    const [message, setMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: props.name,
            type: props.type,
            price: props.price,
            description: props.description,
            imageURL: props.image_url,
        }
    })


    async function onSubmit(data) {
        console.log(data)
    }

    return (
        <div className="edit-form--container">
            { message && <><h4 className="red">{ message }</h4><br /></>}
            {Object.keys(errors).map((key) => (
                <h4 key={key} className="red">{errors[key]?.message}</h4>
            ))}
            {errors && Object.keys(errors).length > 0 && <br />}
            <form 
                className="edit--form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <input 
                    type="text"
                    {...register("name", { required: "van name is required" })}
                    placeholder="Name"
                />
                <select {...register("type", { required: "van type is required" })}>
                    <option value="" disabled selected hidden>Select Van Type</option>
                    <option value="simple">Simple</option>
                    <option value="rugged">Rugged</option>
                    <option value="luxury">Luxury</option>
                </select>
                <input 
                    type="number"
                    {...register("price", { 
                        required: "van price is required",
                        min: {
                            value: 0,
                            message: "min van price is 0"
                        }
                    })}
                    min={0}
                    placeholder="Rate per day"
                />
                <textarea
                    {...register("description", { required: "van description is required" })}
                    placeholder="Include a van description"
                    rows={4} 
                />
                <input 
                    type="text"
                    {...register("imageURL", { 
                        required: "van imageURL is required",
                        pattern: {
                            value: /^(ftp|http|https):\/\/[^ "]+$/,
                            message: "Please enter a valid URL for the van image"
                        }
                    })}
                    placeholder="Paste image URL"
                />
                <button type="submit">Edit</button>
            </form>
        </div>
    )
}

EditForm.propTypes = {
    van_id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.string,
    description: PropTypes.string,
    image_url: PropTypes.string,
}

export default EditForm