import React, { useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom'
import AuthAPI from '../../services/authAPI';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const history = useHistory();

    const handleLogout = () => {
      AuthAPI.logout();
      setIsAuthenticated(false);
      history.push('/login');
    }

    useEffect(() => {
        if(isAuthenticated === false) {
            return <Redirect to="/login/" />
        }
    }, []);

    return (
        <div className="menu-react">
            <Link to="/">Node-React</Link>
            {isAuthenticated ? <button type="button" className="tiny negative ui button" onClick={handleLogout}>Deconnexion</button> : ''}
        </div>
    );
};

export default Navbar;