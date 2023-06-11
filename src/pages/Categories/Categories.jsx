import React from "react";
import '../../Styles.css';
import Table from "../../components/Table/Table";
import { TailSpin } from 'react-loader-spinner'

function Categories() {

    let [categories, setCategories] = React.useState([])

    let fetchCategoriesApi = async () => {
        try {
            let categoriesFromApi = await fetch(`http://localhost:3000/api/products`)
            categoriesFromApi = await categoriesFromApi.json()
            let rows = Object.keys(categoriesFromApi.meta.countByCategory).map((category, i) => ({ name: category, quantity: categoriesFromApi.meta.countByCategory[category], id: i + 1 }))
            setCategories(rows)
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        fetchCategoriesApi();
    }, [])

    return (
        <> {categories.length > 0 ?
            <div className="general-container">
                <div className="title">
                    <img className="icon" src="/icons/categorias-black.png" alt="icon"></img>
                    <h1>Categorias</h1>
                </div>
                <Table
                    title="Lista de Categorias"
                    columns={["Nombre", "Cantidad de productos", "Detalles"]}
                    rows={categories}
                />
            </div>
            :
            <div className="general-container">
                <TailSpin
                    height="80"
                    width="80"
                    color="#FF6700"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass="spinner"
                    visible={true}
                />
            </div>
        }
        </>
    )
}

export default Categories;