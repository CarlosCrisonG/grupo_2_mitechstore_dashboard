import React from "react";
import "./Card.css";


function CardLastProduct(props) {
    const [lastProduct, setLastProduct] = React.useState(0)
    const [name, setName] = React.useState("Nombre")
    const [price, setPrice] = React.useState("$000")
    const [category, setCategory] = React.useState("Categoria")
    const [id, setId] = React.useState("ID")

    React.useEffect(() => {
        // Fetch de Número de Productos
        fetch('http://localhost:3000/api/products')
            .then(res => res.json())
            .then((data) => {
                const lastProduct = data.data[data.data.length - 1]
                setLastProduct(lastProduct)
            })
    }, [])

    // Actualizar los datos del último usuario en las variables de estado
    React.useEffect(() => {
        if (lastProduct) {
            setName(lastProduct.name);
            setPrice(lastProduct.price);
            setCategory(lastProduct.category.name);
            setId(lastProduct.id);
        }
    }, [lastProduct]);

    return (
        <div className="card-container">
            <div className="card card-long">
                <div className="card-header">
                    <div className="card-title">{props.title}</div>
                    <div className="card-icon">{props.icon}</div>
                </div>
                <div className="card-info">
                    <p>{name}</p>
                    <p>${price}  -  {category}</p>
                    <p><a href={`http://localhost:3000/product/detail/${id}`} target="_blank">Ver más detalles</a></p>
                </div>
            </div>
        </div>
    )
}

export default CardLastProduct;