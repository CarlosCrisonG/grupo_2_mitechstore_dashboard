import React from "react";
import '../Styles.css';
import '../Users/Users.css';
import Table from "../Table/Table";

function Users() {

    let [users, setUsers] = React.useState([])
    let [page, setPage] = React.useState(1)
    let [totalPages, setTotalPages] = React.useState()

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

    React.useEffect(() => {
        fetchUsersApi()
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
        <> {users.length > 0 ?
            <div className="general-container">

                <div className="title">
                    <img className="icon" src="/icons/usuarios-black.png" alt="icon"></img>
                    <h1>Usuarios</h1>
                </div>
                <Table title="Listado de Usuarios" columns={["Nombre", "Apellido", "Perfil", "Pais"]} rows={users} />
                <div className="buttons">
                    <button className="page-button" onClick={handlePrevPage} disabled={page === 1}> Página previa </button>
                    <button className="page-button" onClick={handleNextPage} disabled={page === totalPages}> Página siguiente </button>
                </div>
            </div>
            :
            <p>CARGANDO...</p>
        }</>
    )
}

export default Users;