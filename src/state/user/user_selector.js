/**
 * Created by shahartaite on 16/11/2016.
 */
import consts from '../../constants/consts';
import { createSelector } from 'reselect'

const userSelector = (state) => state[consts.TOP_LEVEL_STATE_REDUCERS.USER_REDUCER];


export const userEmailSelector = createSelector(
    [userSelector],
    (userSelector) => {
        return userSelector[consts.STATE_INNER_OBJECT_NAMES.USER_EMAIL];
    });

export const userLoginInProgressSelector = createSelector(
    [userSelector],
    (userSelector) => {
        return userSelector[consts.STATE_INNER_OBJECT_NAMES.USER_LOGIN_IN_PROGRESS];
    });

export const userSelectedTimeZoneSelector = createSelector(
    [userSelector],
    (userSelector) => {
        return userSelector[consts.STATE_INNER_OBJECT_NAMES.USER_SELECTED_TIMEZONE];
    });
export const isRecievedUserSettingsSelector = createSelector(
    [userSelector],
    (userSelector) => {
        return userSelector[consts.STATE_INNER_OBJECT_NAMES.IS_RECEIVED_USER_SETTINGS];
    });
export const userSelectedOrDefaultTimezoneSelector = createSelector(
    [userSelectedTimeZoneSelector],
    (userSelectedTimeZone) => {
        const defaultTimezone = 'Asia/Jerusalem'; // TODO: replace constant with parameter
        return !!userSelectedTimeZone ? userSelectedTimeZone : defaultTimezone;
});


