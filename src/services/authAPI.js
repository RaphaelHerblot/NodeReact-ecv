import axios from "axios";
import jwtDecode from "jwt-decode";

// Function for login
function authentification(credentials) {
    return axios
    .post("http://localhost:3000/api/login", credentials)
    .then(response => response.data.data[1])
    .then(token => {
        window.localStorage.setItem("authToken", token);
        axios.defaults.headers["Authorization"] = "JWT " + token;
        return true;
    })
}

// Function for logout
function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

// Function to set the token in the headers for the requests as default
function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

// Setting up the user already authentificate if it didn't expire
function setup() {
    const token = window.localStorage.getItem("authToken");

    if(token) {
        const {exp: expiration} = jwtDecode(token);

        if(expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token);
        } else {
            logout();
        }
    } else {
        logout();
    }
}

// Checking if the user is Authenticated or not
function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");

    if(token) {
        const {exp: expiration} = jwtDecode(token);

        if(expiration * 1000 > new Date().getTime()) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// Function to return the id of the connected user
function findConnectedUser() {
    const token = jwtDecode(window.localStorage.getItem("authToken"));
    return token._id
}

export default {
    authentification,
    logout,
    setup,
    isAuthenticated,
    findConnectedUser
}