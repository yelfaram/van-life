import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addVan } from "../../../../api"

function AddForm(props) {
    const navigate = useNavigate();

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
                toast.success("Great news! Your van has been successfully added.")
                // Reload the page after a successful insertion
                navigate(window.location.pathname);
            } else {
                console.error(`Van insert failed: ${message}`);
            }
        } catch (err) {
            toast.error(err.message)
        }
    
    }

    return (
        <div className="add-form--container">
            <ul className="error-list">
                {Object.keys(errors).map((key) => (
                    <li key={key} className="error-item">
                        {errors[key]?.message}
                    </li>
                ))}
            </ul>
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