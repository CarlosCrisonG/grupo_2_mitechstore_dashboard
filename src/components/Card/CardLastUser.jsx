import React from "react";
import "./Card.css";
import "./Responsive.css"


function CardLastUser(props) {
    const [lastUser, setLastUser] = React.useState(null)
    const [name, setName] = React.useState("Nombre")
    const [lastname, setLastname] = React.useState("Apellido")
    const [country, setCountry] = React.useState("País")
    const [profile, setProfile] = React.useState("Perfil")
    const [id, setId] = React.useState("ID")

    React.useEffect(() => {
        // Fetch de Número de Usuarios
        fetch('http://localhost:3000/api/users')
            .then(res => res.json())
            .then((data) => {
                const lastUser = data.data[data.data.length - 1]
                setLastUser(lastUser)
            })
    }, [])

    // Actualizar los datos del último usuario en las variables de estado
    React.useEffect(() => {
        if (lastUser) {
            setName(lastUser.first_name);
            setLastname(lastUser.last_name);
            setCountry(lastUser.country.name);
            setProfile(lastUser.userProfile.name);
            setId(lastUser.id);
        }
    }, [lastUser]);

    return (
        <div className="card-container">
            <div className="card card-long">
                <div className="card-header">
                    <div className="card-title">{props.title}</div>
                    <div className="card-icon">{props.icon}</div>
                </div>
                <div className="card-info">
                    <p>{name} {lastname}</p>
                    <p>{country} - {profile}</p>
                    <p><a href={`http://localhost:3000/api/users/${id}`} target="_blank">Ver más detalles</a></p>
                </div>
            </div>
        </div>
    )
}

export default CardLastUser;