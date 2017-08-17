/**
 * Created by shahartaite on 12/12/2016.
 */
import * as types from '../../constants/ActionTypes';
import httpService from '../../http_service';

export function userLoggedIn(email) {
    return {
        type: types.USER_LOGGED_IN,
        email
    };
}

export function userLoggedOut() {
    return {
        type: types.USER_LOGGED_OUT
    }
}


export function userLoginInProgress() {
    return {
        type: types.USER_LOGIN_IN_PROGRESS
    }

}

export function userLoginProcessEnded() {
    return {
        type: types.USER_LOGIN_PROCESS_ENDED
    }
}

export function requestForUserSettingsInProgress() {
    return {
        type: types.REQUEST_FOR_USER_SETTINGS_IN_PROGRESS
    }
}


export function receivedUserSettings(settings) {
    return {
        type: types.RECEIVED_USER_SETTINGS,
        timezone: settings.timezone
    }
}


export function requestToChangeTimezoneInProgress(timezone) {
    return {
        type: types.REQUEST_TO_CHANGE_TIME_ZONE_IN_PROGRESS,
        timezone
    }
}

export function requestForUserSettings() {
    return (dispatch) => {
        dispatch(requestForUserSettingsInProgress());
        httpService.getUserSettings()
            .then((settings) => {
                dispatch(receivedUserSettings(settings));
            })
            .catch((err) => {
                console.log('problem getting user settings');
                console.log(err);
            })
    }
}


export function userRequestToChangeTimezone(timezone) {
    return (dispatch) => {
        dispatch(requestToChangeTimezoneInProgress(timezone));
        return httpService.updateTimezone(timezone)
            .catch((err) => {
                console.log(err)
            });
    }

}
