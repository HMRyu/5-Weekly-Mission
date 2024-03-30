import { useParams } from "react-router-dom";

function Detail() {
    const {id} = useParams();

    return (
        <h1>link{id}</h1>
    )
}

export default Detail;