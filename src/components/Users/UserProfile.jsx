import React from "react";
import "./UserProfile.css"

function UserProfile() {

    let [user, setUser] = React.useState({})

    let userDetailApi = async () => {
        try {
            let userDetail = await fetch("http://localhost:3000/api/users/16")
            userDetail = await userDetail.json()
            setUser(userDetail.data)
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        //Fetch detalle usuario
        userDetailApi();
    }, [])

    return (


        <>
            {Object.keys(user).length != 0 ?
                    <div className="profile-container">
                        <div className="user-container">
                            <div>
                                <img className="profile-picture" src={user.avatarURL} alt="Foto de perfil" />
                                <p className="user-name">
                                    {user.first_name} {user.last_name}
                                </p>
                                <p className="work-text">
                                    {user.userProfile.name}
                                </p>
                            </div>
                        </div>
                        <div className="data-container">
                            <div style={{ width: '100%' }}>
                                <div className="data-user-info">
                                    <span className="data-user-info-label">Nombre Completo:</span>
                                    <p>
                                        {user.first_name} {user.last_name}
                                    </p>
                                </div>
                                <div className="data-user-info">
                                    <span className="data-user-info-label">Correo Electronico:</span>
                                    <p>
                                        {user.email}
                                    </p>
                                </div>
                                <div className="data-user-info">
                                    <span className="data-user-info-label">Celular:</span>
                                    <p>
                                        {user.phone}
                                    </p>
                                </div>
                                <div className="data-user-info">
                                    <span className="data-user-info-label">Pais:</span>
                                    <p>
                                        {user.country.name}
                                    </p>
                                </div>
                                <div className="data-user-info">
                                    <span className="data-user-info-label">Región:</span>
                                    <p>
                                        {user.region}
                                    </p>
                                </div>
                                <div className="data-user-info">
                                    <span className="data-user-info-label">Ciudad:</span>
                                    <p>
                                        {user.city}
                                    </p>
                                </div>
                                <div className="data-user-info">
                                    <span className="data-user-info-label">Código Postal:</span>
                                    <p>
                                        {user.zip}
                                    </p>
                                </div>
                                <div className="data-user-info">
                                    <span className="data-user-info-label">Dirección:</span>
                                    <p>
                                        {user.address}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                :
                <p>CARGANDO...</p>}
        </>

    )
}

export default UserProfile;