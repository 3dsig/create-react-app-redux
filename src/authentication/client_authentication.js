/**
 * Created by shahartaite on 09/11/2016.
 */
import {isTokenExpired,getEmailFromToken} from './jwtHelper';
import {browserHistory} from 'react-router';
import httpService from 'js/http_service';

const login = (user, password, callback) => {
    return httpService.loginThroughAuth0(user, password)
        .then((authResult) => {
        if(authResult.id_token){
            setToken(authResult.id_token);
            callback(true)
        }
        else{
            callback(false);
        }
        });
};

const setToken = (idToken) => {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
}

const isLoggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = getToken();
    return !!token && !isTokenExpired(token);
}

const getToken = () => {
    // Retrieves the user token from localStorage
    const token = localStorage.getItem('id_token');
    return token;
}

const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        httpService.getUserInfoFromAuth0()
            .then((userInfo) => {
                resolve(userInfo)
            })
    })

}

const getEmail = () => {
    return getEmailFromToken(getToken());
}

const logout = () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    browserHistory.push('/login');
};

export default  {
    login,
    isLoggedIn,
    logout,
     getUserInfo,
    getToken,
    getEmail
};