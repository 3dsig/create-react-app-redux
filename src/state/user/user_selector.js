/**
 * Created by shahartaite on 16/11/2016.
 */
import consts from 'js/consts';
import {createSelector} from 'reselect';

const userSelector = (state) => state[consts.TOP_LEVEL_STATE_REDUCERS.USER_REDUCER];

export const userAllowedMeasurementsSelector = createSelector(
    [userSelector],
    (userSelector) => {
        return userSelector[consts.STATE_INNER_OBJECT_NAMES.USER_ALLOWED_MEASUREMENTS];
});

export const userEmailSelector = createSelector(
    [userSelector],
    (userSelector) => {
        return userSelector[consts.STATE_INNER_OBJECT_NAMES.USER_EMAIL];
    });

export const userViewingConfigSelector = createSelector(
    [userSelector],
    (userSelector) => {
        return userSelector[consts.STATE_INNER_OBJECT_NAMES.VIEWING_CONFIG_SETTINGS];
    });

export const userAllowedTabsSelector = createSelector(
    [userSelector],
    (userSelector) => {
        return userSelector[consts.STATE_INNER_OBJECT_NAMES.USER_ALLOWED_TABS];
    });

export const userMonitoredViewsSelector = createSelector(
    [userSelector],
    (userSelector) => {
        return userSelector[consts.STATE_INNER_OBJECT_NAMES.MONITORED_VIEWS];
    });
export const userSavedEventsSelector = createSelector(
    [userSelector],
    (userSelector) => {
        return userSelector[consts.STATE_INNER_OBJECT_NAMES.USER_SAVED_EVENTS];
    });
export const userDefaultLanguageSelector = createSelector(
    [userSelector],
    (userSelector) => {
        return userSelector[consts.STATE_INNER_OBJECT_NAMES.USER_DEFAULT_LANGUAGE];
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
        return userSelector[consts.STATE_INNER_OBJECT_NAMES.IS_RECIEVED_USER_SETTINGS];
    });
export const userSelectedOrDefaultTimezoneSelector = createSelector(
    [userSelectedTimeZoneSelector, userViewingConfigSelector],
    (userSelectedTimeZone, userViewingConfig) => {
        const userDefaultTimezone = userViewingConfig.timezone;
        return userSelectedTimeZone ? userSelectedTimeZone : userDefaultTimezone;
});


