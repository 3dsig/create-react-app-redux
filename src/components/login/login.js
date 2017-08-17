/**
 * Created by shahartaite on 09/11/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import styles from './login.css';
import companyLogo from '../../images/logo.svg';
import LoginForm from '../login_form/login_form';
import CustomLoader from '../custom_loader/custom_loader';
import {userLoginInProgressSelector} from '../../state/user/user_selector';

export class Login extends React.Component {

    componentDidMount() {
        localStorage.clear();
    }

    render() {
        const backgroundStyle = {
            height: '100%',
        };
        const foregroundStyle = {
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center'
        };
        return (
                <CustomLoader
                    loading={this.props.isUserLoginInProgress}
                    backgroundStyle={backgroundStyle}
                    foregroundStyle={foregroundStyle}
                    isRenderChildrenWhileShowing={true}>
                    <div className={styles.mainDiv}>
                        <div className={styles.leftPart}>
                            <img src={companyLogo} alt=""
                                 className={styles.logoImg}/>
                            <div className={styles.centeringText}>
                                <div className={styles.leftAlign}>
                                    <span className={styles.textFirstLine}>Welcome to 3DSignals Recording System</span><br/>
                                    <span className={styles.textThirdLine}>Listen. Detect. Predict.</span><br/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.rightPart}>
                            <div className={styles.rightPartContainer}>
                                <LoginForm/>
                            </div>
                        </div>
                    </div>
                </CustomLoader>
        );
    }
}


function mapStateToProps(state) {
    return {
        isUserLoginInProgress: userLoginInProgressSelector(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
//  mergeProps
)(Login);
