import React from "react";
import '../Styles.css';
import Card from "../Card/Card";
import Table from "../Table/Table";

class Users extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            rows: []
        }

    }

    componentDidMount() {
        fetch("http://localhost:3000/api/users")
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    rows: data.data.map((user) => ({
                        first_name: user.first_name,
                        last_name: user.last_name,
                        userProfile: user.userProfile.name,
                        country: user.country.name,
                        id: user.id,
                    }))
                })
            })
    }

    //Validación para mostrar Next y Prev - PENDIENTE

    render() {
        
        return (
            <>
            {this.state.rows.length != 0 ?
            <div className="general-container">
   
                <div className="title">
                    <img className="icon" src="/icons/usuarios-black.png" alt="icon"></img>
                    <h1>Usuarios</h1>
                </div>
                <Table title="Listado de Usuarios" columns={["Nombre", "Apellido", "Perfil", "Pais"]} rows={this.state.rows}/>
            </div>
            :
            <p>CARGANDO...</p>
            }
            </>
        )
    }

}

export default Users;