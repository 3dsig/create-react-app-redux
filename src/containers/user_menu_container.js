/**
 * Created by shahartaite on 28/12/2016.
 */
import {connect} from 'react-redux';
import UserMenu from '../components/user_menu/user_menu';
import {userSelectedOrDefaultTimezoneSelector} from '../state/user/user_selector'
import {userRequestToChangeTimezone} from '../state/user/user_actions'
import clientAuthentication from '../authentication/client_authentication';
import {userLoggedOut} from '../state/user/user_actions';

function mapStateToProps(state) {
    return {
        userSelectedTimeZone : userSelectedOrDefaultTimezoneSelector(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => {
            dispatch(userLoggedOut());
            clientAuthentication.logout();
        },
        timeZoneClicked : (timezone) => {
            return dispatch(userRequestToChangeTimezone(timezone));
        },
    };
}

function mergeProps(stateProps, dispatchProps, ownProps){
    return {
        selectedTimezone : () => {
            return stateProps.userSelectedTimeZone;
        },
        timeZoneClicked : (timezone) => {
            dispatchProps.timeZoneClicked(timezone)
                .then(() => {
                    window.location.reload()
                })
        },
        logout : dispatchProps.logout,
        userEmail : ownProps.userEmail
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(UserMenu);
