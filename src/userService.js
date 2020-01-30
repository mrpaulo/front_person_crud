import axios from 'axios'
import {defineConstErro} from './LoginPage'

export const config = {
    API_URL: 'http://localhost:4060/personcrud/api',
    API_VERSION_1: '/v1',
    PESSOAS_API: '/pessoas',
    PESSOA_API: '/pessoa/'
}

export const instance = axios.create({
    baseURL: config.API_URL,
    timeout: 5000,    
    headers: authHeader(),
  });

export const userService = {
    login,
    logout,
    getAll
};

export function authHeader() {
    // return authorization header with basic auth credentials
    let user = JSON.parse(localStorage.getItem('usuario'));

    if (user && user.authdata) {
        return { 'Authorization': 'Basic ' + user.authdata };
    } else {
        return {};
    }
}

var user = "";
var pass = "";

function login(username, password) {
    user = username;
    pass = password;

    let validador = axios.create({
    baseURL: config.API_URL,
    timeout: 5000,
    auth: {
        username: username,
        password: password
      },
       headers: {                  
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization", 
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
          "Content-Type": "application/json;charset=UTF-8"                   
      },
  });
    
    let usuario = {
        identificador : username,
        situacao : 'AUTORIZADO'
    }

    return validador.post(`${config.API_URL}${config.API_VERSION_1}/validateLogin`, usuario)
        .then(handleResponse)
        .then(user => {
            if (user) {                
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        })
        .catch(error => {
            defineConstErro();            
});
}

function logout() {    
    localStorage.removeItem('usuario');
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return instance.post(`${config.API_URL}${config.API_VERSION_1}/validateLogin`, {}).then(handleResponse)
}

function handleResponse(response) { 
    var data = response.data; 
    var userLogin = {
                authdata: ''
            }  
        if (response.status !== 200) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        } else if (response.status === 200) {
            if(data.situacao == "AUTORIZADO") {
            userLogin.authdata = window.btoa(user + ':' + pass);
            localStorage.setItem('usuario', JSON.stringify(userLogin));
        }
        }

        return userLogin;
    
}
