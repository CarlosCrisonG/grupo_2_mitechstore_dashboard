import React from "react";
import "./ProductDetail.css";
import { useLocation } from "react-router-dom";
import Loader from "../Loader/Loader"

function PorductDetail() {

    let [product, setProduct] = React.useState({})
    let [slides, setSlides] = React.useState(0)

    let { state } = useLocation();

    let productDetailApi = async (state) => {
        try {
            let productDetail = await fetch(`http://localhost:3000/api/products/${state.id}`)
            productDetail = await productDetail.json()
            setProduct(productDetail.data)
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        //Fetch detalle producto
        productDetailApi(state);
    }, [])

    let nextSlide = () => {
        setSlides(slides + 1)
    }

    let prevSlide = () => {
        setSlides(slides - 1)
    }

    React.useEffect(() => {
        if (Object.keys(product).length > 0) {
            if (slides > product.imagesUrl.length - 1) {
                setSlides(0)
            }
            if (slides < 0) {
                setSlides(product.imagesUrl.length - 1)
            }
        }
    }, [slides])

    return (
        <>
            {Object.keys(product).length > 0 ?
                <main className="product-detail-main-container">
                    <section className="main-section">
                        <div className="title">
                            <img className="icon" src="/icons/productos-black.png" alt="icon"></img>
                            <h1 className="titulo-producto-mobile">Detalle del producto</h1>
                        </div>
                        <div className="main-top-section">
                            {/* <!-- Carrusel --> */}
                            <section id="carrusel">
                                <div className="slideshow-container">
                                    <button className="prev" onClick={prevSlide}>&#10094;</button>
                                    <img src={product.imagesUrl[slides]} style={{ width: "100%" }} />
                                    <button className="next" onClick={nextSlide}>&#10095;</button>
                                </div>
                            </section>
                            <section className="right-box">
                                <div className="product-cost-box">
                                    <div className="separador">
                                        <label className="label">Titulo:</label>
                                        <span className="titulo-producto-desktop">{product.name}</span>
                                    </div>
                                    <div className="separador">
                                        <label className="label">Precio:</label>
                                        <span className="precio">{product.price}</span>
                                    </div>
                                    <div className="separador">
                                        <label className="label">Categoria:</label>
                                        <span className="precio">{product.category.name}</span>
                                    </div>
                                    <div className="color separador">
                                        <label className="label">Colores:</label>
                                        <ul>
                                            {product.colors.map((color, j) => {
                                                return <li key={j}>{color.name} </li>
                                            })}
                                        </ul>
                                    </div>
                                    <p className="cuotas">Stock disponible</p>
                                    <p className="envio">Envio gratis</p>
                                </div>
                                <div className="product-descr-box">
                                    <h4 className="subtitle-descripcion">Descripción</h4>
                                    <p className="texto">{product.description}</p>
                                </div>
                            </section>
                        </div>
                        <div className="product-caract-box">
                            <h4 className="subtitle-caracteristicas">Características</h4>
                            <ul>
                                {product.features.map((feature, i) => {
                                    return <li className="caracteristicas" key={i}>{feature.name}</li>
                                })}
                            </ul>
                        </div>
                    </section>
                </main>
                :
                <Loader />
            }
        </>
    )
}

export default PorductDetail;