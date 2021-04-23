import React from 'react';

// Adding a context variable to have access on all the app
export default React.createContext({
    isAuthenticated: false,
    setIsAUthenticated: (value) => {}
});