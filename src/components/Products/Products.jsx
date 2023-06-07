import React from "react";
import '../Styles.css';
import Card from "../Card/Card";
import Table from "../Table/Table";
import Loader from "../Loader/Loader";

function Products() {

    let [products, setProducts] = React.useState([])
    let [page, setPage] = React.useState(1)
    let [totalPages, setTotalPages] = React.useState()

    let fetchProductsApi = async () => {
        try {
            let productsFromApi = await fetch(`http://localhost:3000/api/products?page=${page}`)
            productsFromApi = await productsFromApi.json()
            let rows = productsFromApi.data.map(product => ({
                name: product.name,
                price: product.price,
                category: product.category.name,
                discount: product.discount,
                id: product.id
            }))
            setProducts(rows)
            setTotalPages(productsFromApi.meta.total_pages)
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        fetchProductsApi();
    }, [])

    let handlePrevPage = (e) => {
        e.preventDefault();
        setPage(page - 1)
    }

    let handleNextPage = (e) => {
        e.preventDefault();
        setPage(page + 1)
    }

    React.useEffect(() => {
        setProducts([])
        fetchProductsApi();
    }, [page]);

    return (
        <>
            {products.length > 0 ?
                <div className="general-container">
                    <div className="title">
                        <img className="icon" src="/icons/productos-black.png" alt="icon"></img>
                        <h1>Productos</h1>
                    </div>

                    <Table
                        title="Listado de Productos"
                        columns={["Nombre", "Precio", "Categoria", "Descuento", "Detalle"]}
                        rows={products}
                    />
                    <div className="buttons">
                        <button className="page-button" onClick={handlePrevPage} disabled={page === 1}> <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-right prev-button" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l14 0"></path>
                            <path d="M13 18l6 -6"></path>
                            <path d="M13 6l6 6"></path>
                        </svg> </button>
                        <button className="page-button" onClick={handleNextPage} disabled={page === totalPages}> <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-right" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l14 0"></path>
                            <path d="M13 18l6 -6"></path>
                            <path d="M13 6l6 6"></path>
                        </svg></button>
                    </div>
                </div>
                :
                <Loader />
            }
        </>
    )
}

export default Products;