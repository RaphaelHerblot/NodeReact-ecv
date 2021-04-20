import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { HashRouter, Switch, Route } from "react-router-dom";

import './App.scss';
import 'semantic-ui-css/semantic.min.css'

import Login from './components/Forms/Login';
import Register from './components/Forms/Register';
import PrivateRoute from './components/PrivateRoute';
import AuthAPI from './services/authAPI';
import AuthContext from './contexts/AuthContext';
import PostList from './components/PostList';

AuthAPI.setup();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated
    }}>
      <HashRouter>
        <div className="App">
          <h1>Node-React</h1>
          {isAuthenticated ? <button type="button" className="negative ui button" onClick={handleLogout}>Deconnexion</button> : ''}
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/posts" component={PostList} />
            {isAuthenticated 
              ? <Route path="/" component={PostList} />
              : <Route path="/" component={Login} />
            }
          </Switch>
        </div>
      </HashRouter>
    </AuthContext.Provider>
  );
}

export default App;
