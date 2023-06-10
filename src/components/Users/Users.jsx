import React from "react";
import '../Styles.css';
import '../Users/Users.css';
import Table from "../Table/Table";
import { TailSpin } from 'react-loader-spinner';
import Card from "../Card/Card";
import CardLastElement from "../Card/CardLastElement";

function Users() {

    //Estados para función fetchUsersApi
    let [users, setUsers] = React.useState([])
    let [page, setPage] = React.useState(1)
    let [totalPages, setTotalPages] = React.useState()

    // Función fetchUsersApi
    let fetchUsersApi = async () => {
        try {
            let usersFromApi = await fetch(`http://localhost:3000/api/users?page=${page}`)
            usersFromApi = await usersFromApi.json()
            let rows = usersFromApi.data.map(user => ({
                first_name: user.first_name,
                last_name: user.last_name,
                userProfile: user.userProfile.name,
                country: user.country.name,
                id: user.id
            }))
            setUsers(rows)
            setTotalPages(usersFromApi.meta.total_pages)
        } catch (error) {
            console.log(error);
        }
    }

    //Estados para función fetchCardsInfo
    const [cantidadUsuarios, setCantidadUsuarios] = React.useState(0)

    // Función fetchCardsInfo
    let fetchCardsInfo = () => {
        // Fetch de Número de Usuarios
        fetch('http://localhost:3000/api/users')
            .then(res => res.json())
            .then((data) => {
                setCantidadUsuarios(data.meta.count)
            })
    }

    React.useEffect(() => {
        fetchUsersApi();
        fetchCardsInfo();
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
        setUsers([])
        fetchUsersApi();
    }, [page]);

    return (
        <>
            {users.length > 0 ?
                <div className="general-container">
                    <div className="title">
                        <img className="icon" src="/icons/usuarios-black.png" alt="icon"></img>
                        <h1>Usuarios</h1>
                    </div>
                    <div className="card-row"> {/* Clase padre para organizar Cards */}
                        {/* Card Usuarios */}
                        <Card
                            title="Usuarios"
                            icon={<img className="icon" src="/icons/usuarios-orange.png" alt="icon"></img>}
                            count={cantidadUsuarios}
                        />
                        {/* Card Último Usuario Registrado */}
                        <CardLastElement
                            elements="users"
                            title="Último Usuario Registrado"
                            icon={<img className="icon" src="/icons/usuarios-orange.png" alt="icon"></img>}
                        />
                    </div>
                    <Table title="Listado de Usuarios" columns={["Nombre", "Apellido", "Perfil", "Pais", "Detalle"]} rows={users} />
                    <div className="arrow-buttons">
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

export default Users;