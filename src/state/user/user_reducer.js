/**
 * Created by shahartaite on 16/11/2016.
 */
import * as types from '../../constants/ActionTypes';
import consts from '../../constants/consts';

const initialState = {
    [consts.STATE_INNER_OBJECT_NAMES.USER_EMAIL]: '',
    [consts.STATE_INNER_OBJECT_NAMES.USER_SELECTED_TIMEZONE]: null,
    [consts.STATE_INNER_OBJECT_NAMES.USER_LOGIN_IN_PROGRESS]: false,
    [consts.STATE_INNER_OBJECT_NAMES.IS_RECEIVED_USER_SETTINGS]: false,

};

export default function (state = initialState, action) {
    switch (action.type) {

        case types.USER_LOGGED_IN: {
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.USER_EMAIL]: action.email
            };
        }
        case types.USER_LOGIN_IN_PROGRESS : {
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.USER_LOGIN_IN_PROGRESS]: true
            };
        }
        case types.USER_LOGIN_PROCESS_ENDED : {
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.USER_LOGIN_IN_PROGRESS]: false
            };
        }
        case types.RECEIVED_USER_SETTINGS : {
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.USER_SELECTED_TIMEZONE]: action.timezone,
                [consts.STATE_INNER_OBJECT_NAMES.IS_RECEIVED_USER_SETTINGS]: true,
            };
        }
        case types.REQUEST_TO_CHANGE_TIME_ZONE_IN_PROGRESS : {
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.USER_SELECTED_TIMEZONE]: action.timezone
            };
        }
        default:
            return state;
    }

}
