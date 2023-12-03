import { useState } from "react"
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import { updateVan } from "../../../../api"

function EditForm(props) {
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

    const [error, setError] = useState(null);
    const [isDirty, setIsDirty ] = useState(false)

    function handleFieldChange(name, value) {
        const defaultValue = props[name]
        setIsDirty(value !== defaultValue);
    }

    async function onSubmit(data) {
        console.log(data)
        const { name, type, price, description, imageURL } = data

        try {
            const { success, message } = await updateVan(props.van_id, name, type, price, description, imageURL)

            if (success) {
                console.log("Van successfully updated", message);

                props.handleClose()

                // Reload the page after a successful update
                window.location.reload()
            } else {
                setError(`Van updated failed: ${message}`);
            }
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="edit-form--container">
            { error && <><h4 className="red">{ error }</h4><br /></>}
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
                    {...register("name", { 
                        required: "Please provide a name for your van",
                        onChange: (e) => {handleFieldChange("name", e.target.value)} 
                    })}
                    placeholder="Name"
                />
                <select 
                    {...register("type", { 
                        required: "Please select the type of van", 
                        onChange: (e) => {handleFieldChange("type", e.target.value)} 
                    })}
                >
                    <option value="" disabled hidden>Select Van Type</option>
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
                        },
                        onChange: (e) => {handleFieldChange("price", e.target.value)} 
                    })}
                    min={0}
                    placeholder="Rate per day"
                />
                <textarea
                    {...register("description", { 
                        required: "Please provide a description of your van",
                        onChange: (e) => {handleFieldChange("description", e.target.value)} 
                    })}
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
                        },
                        onChange: (e) => {handleFieldChange("imageURL", e.target.value)}
                    })}
                    placeholder="Paste image URL"
                />
                <button 
                    type="submit" 
                    className={`edit--btn ${!isDirty && 'disabled'}`} 
                    disabled={!isDirty}
                >
                    Edit
                </button>
            </form>
        </div>
    )
}

EditForm.propTypes = {
    van_id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    image_url: PropTypes.string,
    handleClose: PropTypes.func,
}

export default EditForm