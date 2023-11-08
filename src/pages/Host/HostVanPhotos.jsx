import { useOutletContext } from "react-router-dom";

function HostVanPhotos() {
    const [hostVan] = useOutletContext();
    const {imageUrl} = hostVan;

    return (
        <img src={imageUrl} className="host-van-photos"/>
    )
}

export default HostVanPhotos