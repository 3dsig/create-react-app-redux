/**
 * Created by shahartaite on 29/09/2016.
 */
import clientAuthentication from './authentication/client_authentication';

const request = require('then-request');


const options = {
    headers: {
        'Content-Type': 'application/json',
    }
};


const getAllUsers = () => {
    const url = `/users`;
    const requestOptions = options;
    return request('GET', url, requestOptions)
        .then((results) => {
            return JSON.parse(results.body);
        });
};

const addUser = (user) => {
    const url = `/users`;
    const requestOptions = {
        headers: options.headers,
        body: JSON.stringify(user)
    };
    return request('POST', url, requestOptions);
};

const deleteUser = (userEmail) => {
    const url = `/users`;
    const requestOptions = {
        headers: options.headers,
        qs: {
            email: userEmail
        }
    };
    return request('DELETE', url, requestOptions);
};

const getUserInfoFromAuth0 = () => {
    const url = 'https://3dsignals.eu.auth0.com/userinfo';
    const headers = {...options.headers, 'Authorization': `Bearer ${clientAuthentication.getToken()}`}; // user email is derived from token
    const requestOptions = {headers};
    return request('GET', url, requestOptions).then((results) => {
        return (JSON.parse(results.body));
    });
};

const loginThroughAuth0 = (username, password) => {
    const url = 'https://3dsignals.eu.auth0.com/oauth/token'
    const requestOptions = {
        headers: options.headers,
        body: JSON.stringify({
            'grant_type': 'password',
            'client_id': 'Rdte8tBJYvkyKtH99VlHH1YjaM1Tkc3H',
            username,
            password
        })
    };
    return request('POST', url, requestOptions).then((results) => {
        return (JSON.parse(results.body));
    });
};

const getUserSettings = () => {
    const url = '/user/allSettings';
    const headers = {...options.headers, 'Authorization': `Bearer ${clientAuthentication.getToken()}`}; // user email is derived from token
    const requestOptions = {headers};
    return request('GET', url, requestOptions).then((results) => {
        return (JSON.parse(results.body));
    })
        .catch((err) => {
            console.log(err);
        });
};

const updateTimezone = (timezone) => {
    const url = '/user/updateTimezone';
    const headers = {...options.headers, 'Authorization': `Bearer ${clientAuthentication.getToken()}`}; // user email is derived from token
    const requestOptions = {
        headers,
        body: JSON.stringify({
            timezone
        })
    };
    return request('POST', url, requestOptions)
        .then(() => {
            console.log('sucesss in updateTimezone http call');
        })
        .catch((err) => {
            console.log(`problem in updateTimezone http call`);
            console.log(err);
        });
}

export default {
    getAllUsers,
    addUser,
    deleteUser,
    getUserInfoFromAuth0,
    loginThroughAuth0,
    getUserSettings,
    updateTimezone,
};
