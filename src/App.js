import React, { useState } from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";

import './App.scss';
import 'semantic-ui-css/semantic.min.css'

import Login from './components/Forms/Login';
import Register from './components/Forms/Register';
import PrivateRoute from './components/PrivateRoute';
import AuthAPI from './services/authAPI';
import AuthContext from './contexts/AuthContext';
import PostList from './components/PostList';
import PostShow from './components/PostShow';
import Navbar from './components/Navbar';

AuthAPI.setup();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated
    }}>
      <HashRouter>
        <div className="App">
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          <div className="main-page">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <PrivateRoute path="/post/:id" component={PostShow} />
              <PrivateRoute path="/post" component={PostList} />
              {isAuthenticated 
                ? <Route path="/" component={PostList} />
                : <Route path="/" component={Login} />
              }
            </Switch>
          </div>
        </div>
      </HashRouter>
    </AuthContext.Provider>
  );
}

export default App;
