import React from "react";
import "./Card.css";
import "./Responsive.css"
import Loader from "../Loader/Loader"
import { Link } from "react-router-dom";
import { element } from "prop-types";

function CardLastElement(props) {
    let [lastElement, setLastElement] = React.useState({})

    let elementToSearch = props.elements;

    let fetchDataApi = async () => {
        try {
            let dataFromApi = await fetch(`http://localhost:3000/api/${elementToSearch}`)
            dataFromApi = await dataFromApi.json();
            if (dataFromApi.meta.total_pages > 1) {
                let totalPages = dataFromApi.meta.total_pages;
                let lastPageData = await fetch(`http://localhost:3000/api/${elementToSearch}?page=${totalPages}`)
                lastPageData = await lastPageData.json();
                let lastElementFromApi = lastPageData.data[lastPageData.data.length - 1]
                setLastElement(lastElementFromApi)
            } else {
                let lastElementFromApi = dataFromApi.data[dataFromApi.data.length - 1]
                setLastElement(lastElementFromApi)
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        fetchDataApi();
    }, [])

    return (
        <> {Object.keys(lastElement).length > 0 ?
            <div className="card-container">
                <div className="card card-long">
                    <div className="card-header">
                        <div className="card-title">{props.title}</div>
                        <div className="card-icon">{props.icon}</div>
                    </div>
                    <div className="card-info">
                        {elementToSearch == "users" ?
                        <>
                        <p> {lastElement.first_name} {lastElement.last_name}</p>
                        <p>{lastElement.country.name} - {lastElement.userProfile.name}</p>
                        <p><Link to="/userProfile" state={{ id: lastElement.id }}>Ver más detalles</Link></p>
                        </>
                        :
                        <>
                        <p>{lastElement.name}</p>
                        <p>{lastElement.price}  -  {lastElement.category.name}</p>
                        <p><Link to="/productDetail" state={{ id: lastElement.id }}>Ver más detalles</Link></p>
                        </>}
                    </div>
                </div>
            </div >
            :
            <Loader />
        }
        </>
    )
}

export default CardLastElement;