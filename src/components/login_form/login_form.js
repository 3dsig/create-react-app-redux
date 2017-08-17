/**
 * Created by shahartaite on 12/03/2017.
 */
import React, {Component} from 'react';
import styles from './login_form.css'
import userImage from '../../images/login/user.svg';
import lockImage from '../../images/login/lock.svg'
import classNames from 'classnames';
import {connect} from 'react-redux';
import clientAuthentication from '../../authentication/client_authentication';
import {userLoggedIn, userLoginInProgress, userLoginProcessEnded} from '../../state/user/user_actions';

class LoginForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            incorrectLogin : false
        }
        this.login = this.login.bind(this);
        this.correctLogin = this.correctLogin.bind(this);
    }
    
    login(e) {
        e.preventDefault();
        const username = this.refs['txtUsername'].value;
        const password = this.refs['txtPassword'].value;
            this.props.userLoginInProgress(true);
            clientAuthentication.login(username, password, (authBool) => {
                this.props.userLoginProcessEnded();
                console.log('authentication bool ' + authBool);
                if (authBool) {
                    this.correctLogin();
                }
                else{
                    this.setState({incorrectLogin : true})
                }
            })
    }
    
    correctLogin() {
        const userEmail = clientAuthentication.getEmail();
                this.props.userLoggedIn(userEmail);
                // browserHistory.push('/analysis'); TODO: check for replacement, browserHistory is no longer supported
    }
    
    render() {
        //const createAccountClasses = classNames(styles.someLabel, styles.forgotPassword);
        const lockIconClasses = classNames(styles.littleIcon, styles.lockIcon);
        return(
            <form
                className={styles.mainForm}
                onSubmit={(x) => this.login(x)}>
                
                <div className={styles.someInputContainer}>
                    <img src={userImage} className={styles.littleIcon} alt=""/>
                    <input
                        type="text"
                        ref="txtUsername"
                        placeholder="example@example.com"
                        className={styles.someInput}>
                    
                    </input>
                </div>
                <hr
                    className={styles.lineBreak}/>
                <div className={styles.someInputContainer}>
                    <img src={lockImage} className={lockIconClasses} alt=""/>
                    <input
                        type="password"
                        ref="txtPassword"
                        className={styles.someInput}>
                    
                    </input>
                </div>
                <hr
                    className={styles.lineBreak}/>
                {this.state.incorrectLogin &&
                    <label className={styles.incorrectLogin}>Sounds like you have a problem. <br/> Check your email or password.</label>
                }
                <button
                    type="submit"
                    className={styles.loginBtn}
                    >
                    Login
                </button>
                {/*<div className={styles.buttomButtonsDiv}>
                 <label
                 className={styles.someLabel}>
                 Create an account
                 </label>
                 <label
                 className={createAccountClasses}>
                 Forgot your password?
                 </label>
                 </div>*/}
            </form>
        );
    }
}
;

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        userLoggedIn: (email) => dispatch(userLoggedIn(email)),
        userLoginInProgress : () => dispatch(userLoginInProgress()),
        userLoginProcessEnded : () => dispatch(userLoginProcessEnded())
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginForm);