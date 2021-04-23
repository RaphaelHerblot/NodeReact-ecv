import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';

const Register = (props) => {
    const[credentials, setCredentials] = useState({
        email: "",
        givenName: "",
        familyName: "",
        password: ""
    })

    // Handling the changes of input
    const handleChange = ({ currentTarget }) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]: value})
        console.log(credentials);
    }

    // POST a new User
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3000/api/register",
                credentials 
            );
            console.log(response.data);
        } catch(error) {
            console.log(error.response);
        }
    }

    return (
        <div className="form-container">
            <h2>Inscription</h2>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Email</label>
                    <input type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="Email" />
                </div>
                <div className="field">
                    <label>Prénom</label>
                    <input type="text" name="givenName" value={credentials.givenName} onChange={handleChange} placeholder="Prénom" />
                </div>
                <div className="field">
                    <label>Nom de famille</label>
                    <input type="text" name="familyName" value={credentials.familyName} onChange={handleChange} placeholder="Nom" />
                </div>
                <div className="field">
                    <label>Mot de passe</label>
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Mot de passe" />
                </div>
                <button className="ui button" type="submit">Inscription</button>
            </form>
            <p class="account">
               Déjà inscrit ? <NavLink to="/login">Connexion !</NavLink>
            </p>
        </div>
    )
}

export default Register;