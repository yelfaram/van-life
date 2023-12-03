import { useState } from "react"
import { useForm } from "react-hook-form";
import { addVan } from "../../../../api"
import PropTypes from 'prop-types';

function AddForm(props) {
    const [error, setError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()


    async function onSubmit(data) {
        const { name, type, price, description, imageURL } = data

        try {
            const { success, message } = await addVan(name, type, price, description, imageURL)

            if (success) {
                console.log("Van successfully inserted", message);

                props.handleClose()

                // Reload the page after a successful insertion
                window.location.reload()
            } else {
                setError(`Van insert failed: ${message}`);
            }
        } catch (err) {
            setError(err.message)
        }
    
    }

    return (
        <div className="add-form--container">
            { error && <><h4 className="red">{ error }</h4><br /></>}
            {Object.keys(errors).map((key) => (
                <h4 key={key} className="red">{errors[key]?.message}</h4>
            ))}
            {errors && Object.keys(errors).length > 0 && <br />}
            <form 
                className="add--form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <input 
                    type="text"
                    {...register("name", { required: "Please provide a name for your van" })}
                    placeholder="Name"
                />
                <select {...register("type", { required: "Please select the type of van" })}>
                    <option value="" disabled selected hidden>Select Van Type</option>
                    <option value="simple">Simple</option>
                    <option value="rugged">Rugged</option>
                    <option value="luxury">Luxury</option>
                </select>
                <input 
                    type="number"
                    {...register("price", { 
                        required: "Please provide the price of your van",
                        min: {
                            value: 0,
                            message: "Please provide a valid price"
                        }
                    })}
                    min={0}
                    placeholder="Rate per day"
                />
                <textarea
                    {...register("description", { required: "Please provide a description of your van" })}
                    placeholder="Include a van description"
                    rows={4} 
                />
                <input 
                    type="text"
                    {...register("imageURL", { 
                        required: "Please provide an image url of your van",
                        pattern: {
                            value: /^(ftp|http|https):\/\/[^ "]+$/,
                            message: "Please provide a valid image URL"
                        }
                    })}
                    placeholder="Paste image URL"
                />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

AddForm.propTypes = {
    handleClose: PropTypes.func,
}

export default AddForm