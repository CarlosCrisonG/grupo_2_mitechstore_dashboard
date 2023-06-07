import React from "react";
import '../Styles.css';
import '../Responsive.css';
import './Home.css';
import Card from "../Card/Card";
import CardLastUser from "../Card/CardLastUser"
import CardLastProduct from "../Card/CardLastProduct"

function Home() {

    const [cantidadUsuarios, setCantidadUsuarios] = React.useState(0)
    const [cantidadProductos, setCantidadProductos] = React.useState(0)
    const [cantidadCategorias, setCantidadCategorias] = React.useState(0)

    React.useEffect(() => {
        // Fetch de Número de Usuarios
        fetch('http://localhost:3000/api/users')
            .then(res => res.json())
            .then((data) => {
                setCantidadUsuarios(data.meta.count)
            })

        // Fetch de Número de Productos
        fetch('http://localhost:3000/api/products')
            .then(res => res.json())
            .then((data) => {
                setCantidadProductos(data.meta.count) //Cantidad de Productos

                const cantidadCategorias = Object.keys(data.meta.countByCategory).length;
                setCantidadCategorias(cantidadCategorias) //Cantidad de Categorias
            })
    }, [])

    return (
        <div className="general-container">
            <div className="title">
                <img className="icon" src="/icons/dashboard-black.png" alt="icon"></img>
                <h1>Dashboard</h1>
            </div>
            <div className="card-row"> {/* Clase padre para organizar Cards */}
                {/* Card Usuarios */}
                <Card
                    title="Usuarios"
                    icon={<img className="icon" src="/icons/usuarios-orange.png" alt="icon"></img>}
                    count={cantidadUsuarios}
                />
                {/* Card Productos */}
                <Card
                    title="Productos"
                    icon={<img className="icon" src="/icons/productos-orange.png" alt="icon"></img>}
                    count={cantidadProductos}
                />
                {/* Card Categorías */}
                <Card
                    title="Categorias"
                    icon={<img className="icon" src="/icons/categorias-orange.png" alt="icon"></img>}
                    count={cantidadCategorias}
                />
            </div>
            <div className="card-row">
                {/* Card Último Usuario Registrado */}
                <CardLastUser
                    title="Último Usuario Registrado"
                    icon={<img className="icon" src="/icons/usuarios-orange.png" alt="icon"></img>}
                />
                {/* Card Último Producto Creado */}
                <CardLastProduct
                    title="Último Producto Creado"
                    icon={<img className="icon" src="/icons/productos-orange.png" alt="icon"></img>}
                />
            </div>
        </div>
    )
}

export default Home;