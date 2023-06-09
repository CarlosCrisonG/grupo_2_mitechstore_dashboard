import React from "react";
import "./SideMenu.css";
import "./Responsive.css"
import { Link } from "react-router-dom";

function SideMenu() {
    return (
        <>
            <div className="sidemenu">
                <img className="logo" src="/images/Logo_Blanco.png" alt="Mi Tech Store"></img>
                <img className="logo-mobile" src="/images/Logo_Mobile.png" alt="Mi Tech Store"></img>
                <Link className="link-button" to="/"><button className="menu-button">
                    <img className="icon" src="/icons/dashboard-white.png" alt="icon"></img>
                    <span>Dashboard</span>
                </button></Link>
                <hr></hr>
                <Link className="link-button" to="/users"><button className="menu-button">
                    <img className="icon" src="/icons/usuarios-white.png" alt="icon"></img>
                    <span>Usuarios</span>
                </button></Link>
                <Link className="link-button" to="/products"><button className="menu-button">
                    <img className="icon" src="/icons/productos-white.png" alt="icon"></img>
                    <span>Productos</span>
                </button></Link>
                <Link className="link-button" to="/categories"><button className="menu-button">
                    <img className="icon" src="/icons/categorias-white.png" alt="icon"></img>
                    <span>Categorías</span>
                </button></Link>
            </div >
        </>
    )
}

export default SideMenu;