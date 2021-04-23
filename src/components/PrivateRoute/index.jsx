import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

const PrivateRoute = ({ path, component }) => {
    const { isAuthenticated } = useContext(AuthContext);

    // If user is authenticated he get access to the route, otherwise redirection to login
    return isAuthenticated ? (
        <Route path={path} component={component} />
    ) : (
        <Redirect to="/login" />
    );
};

export default PrivateRoute;