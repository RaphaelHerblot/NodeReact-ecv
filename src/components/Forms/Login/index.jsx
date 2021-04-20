import React, { useState, useContext } from 'react';
import { NavLink } from "react-router-dom";
import AuthContext from '../../../contexts/AuthContext';
import AuthAPI from '../../../services/authAPI'

const Login = ({ history }) => {
    const { setIsAuthenticated } = useContext(AuthContext);
    const[credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    const[error, setError] = useState("");

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]: value})
    };

    const handleSubmit = async event => {
        event.preventDefault();
        
        try {
            await AuthAPI.authentification(credentials);
            setError("");
            setIsAuthenticated(true);
            history.replace("/");
        } catch(error) {
            console.log(error.response);
            setError("Aucun compte ne possède cette adresse meal ou alors aucune information ne correspond");
        }
    }

    return (
        <div className="form-container">
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit} className="ui form">
                <div className="field">
                    <label>Email</label>
                    <input type="text" name="email" value={credentials.email} onChange={handleChange} placeholder="Email" />
                </div>
                <div className="field">
                    <label>Mot de passe</label>
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Mot de passe" />
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
            <p class="account">
                Pas de compte ? <NavLink to="/register">Inscription !</NavLink>
            </p>
        </div>
    )
};

export default Login;