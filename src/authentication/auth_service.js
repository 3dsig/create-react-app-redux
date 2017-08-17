/**
 * Created by shahartaite on 09/11/2016.
 */
import Auth0Lock from 'auth0-lock';
import {isTokenExpired} from './jwtHelper';
import {store} from 'js/main';
import {userLoggedIn} from '../state/user/user_actions';
import logoSrc from '../images/login/circle_logo_login.svg';
export default class AuthService {
    constructor(clientId, domain) {
        // Configure Auth0
        var options = {
            auth: {
                redirect: false,
                params: {scope: 'openid email'},
            },
            theme: {
                logo: logoSrc,
                primaryColor: '#E46D11'
            },
            languageDictionary: {
                title: "3DSignals"
            },
            rememberLastLogin: false
        };
        this.lock = new Auth0Lock(clientId, domain, options)
        // Add callback for lock `authenticated` event
        this.lock.on('authenticated', this._doAuthentication.bind(this))
        // binds login functions to keep this context
        this.login = this.login.bind(this);
    }
    
    _doAuthentication(authResult) {
        // Saves the user token
        this.setToken(authResult.idToken);
        this.lock.getProfile(authResult.idToken, (error, profile) => {
            if (error) {
                console.log('Error loading the Profile', error)
            }
            else {
                console.log('profile :' + JSON.stringify(profile));
                store.dispatch(userLoggedIn(profile.email));
            }
        });
        // browserHistory.push('/analysis');  TODO: check for replacement, browserHistory is no longer supported
    }
    
    login() {
        // Call the show method to display the widget.
        this.lock.show();
    }
    
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !isTokenExpired(token);
    }
    
    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
    }
    
    getToken() {
        // Retrieves the user token from localStorage
        const token = localStorage.getItem('id_token');
        if (token) {
            this.lock.getProfile(token, (error, profile) => {
                if (error) {
                    console.log('Error loading the Profile', error);
                }
                else {
                    console.log('profile :' + JSON.stringify(profile));
                    store.dispatch(userLoggedIn(profile.email));
                }
            });
        }
        return token;
    }
    
    static logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        //browserHistory.push('/login');  TODO: check for replacement, browserHistory is no longer supported
    }
}
