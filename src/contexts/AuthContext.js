import React from 'react';
import jwtDecode from "jwt-decode";

export default React.createContext({
    isAuthenticated: false,
    setIsAUthenticated: (value) => {}
});