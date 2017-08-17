/**
 * Created by shahartaite on 12/12/2016.
 */
import * as types from 'js/constants/ActionTypes';
import httpService from 'js/http_service';
import moment from 'moment';
import consts from 'js/consts'
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
};

export function defaultLanguageChanged(locale) {
    return {
        type: types.USER_DEFAULT_LANGUAGE_CHANGED,
        locale
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

export function addSavedEventInternally(viewDetails, newIndexOfSavedEvent){
    return{
        type : types.ADD_SAVED_EVENT_INTERNALLY,
        viewDetails,
        newIndexOfSavedEvent
        
    }
}

export function addSavedEventRequestInProgress(){
    return{
        type : types.ADD_SAVED_EVENT_REQUEST_IN_PROGRESS
    }
}
export function removeSavedEventInternally(viewDetails, savedEventIndex){
    return{
        type : types.REMOVE_SAVED_EVENT_INTERNALLY,
        viewDetails,
        savedEventIndex
        
    }
}
export function removeSavedEventRequestInProgress(){
    return{
        type : types.REMOVE_SAVED_EVENT_REQUEST_IN_PROGRESS
    }
}

export function addMonitoredViewInternally(viewDetails, newIndexOfMonitoredView){
    return {
        type: types.ADD_MONITORED_VIEW_INTERNALLY,
        viewDetails,
        newIndexOfMonitoredView
    }
}

function removeMonitoredViewInternally(viewDetails, monitoredViewIndex){
    return {
        type: types.REMOVE_MONITORED_VIEW_INTERNALLY,
        viewDetails,
        monitoredViewIndex
    }
}
export function addMonitoredViewRequestInProgress() {
    return {
        type : types.ADD_MONITORED_REQUEST_IN_PROGRESS
    }
}
export function removeMonitoredViewRequestInProgress(){
    return{
        type : types.REMOVE_MONITORED_VIEW_REQUEST_IN_PROGRESS
    }
}
export function addMeasurementToMonitoredViewInternally(newMeasurement, monitoredViewIndexToAddTo, lastUpdated){
    return{
        type : types.ADD_MEASUREMENT_TO_MONITORED_VIEW_INTERNALLY,
        newMeasurement,
        monitoredViewIndexToAddTo,
        lastUpdated
    }
}
export function addMeasurementToMonitoredViewRequestInProgress(){
    return{
        type : types.ADD_MEASUREMENT_TO_MONITORED_VIEW_REQUEST_IN_PROGRESS
    }
}
export function deleteMeasurementFromMonitoredViewInternally(measurementToDeleteIndex, monitoredViewToDeleteFromIndex, lastUpdated){
    return{
        type : types.DELETE_MEASUREMENT_FROM_MONITORED_VIEW_INTERNALLY,
        measurementToDeleteIndex,
        monitoredViewToDeleteFromIndex,
        lastUpdated
    }
}
export function deleteMeasurementFromMonitoredViewRequestInProgress(){
    return{
        type : types.DELETE_MEASUREMENT_FROM_MONITORED_VIEW_REQUEST_IN_PROGRESS
    }
}
export function updateMeasurementInMonitoredViewInternally(monitoredViewIndex, measurementIndexInMonitoredView, measurementDetails, lastUpdated){
    return{
        type : types.UPDATE_MEASUREMENT_IN_MONITORED_VIEW_INTERNALLY,
        monitoredViewIndex,
        measurementIndexInMonitoredView,
        measurementDetails,
        lastUpdated
    }
}
export function updateMeasurementInMonitoredViewRequestInProgress(){
    return{
        type : types.UPDATE_MEASUREMENT_IN_MONITORED_VIEW_REQUEST_IN_PROGRESS
    }
}
export function addMeasurementToSavedEventInternally(newMeasurement, savedEventIndexToAddTo, lastUpdated){
    return{
        type : types.ADD_MEASUREMENT_TO_SAVED_EVENT_INTERNALLY,
        newMeasurement,
        savedEventIndexToAddTo,
        lastUpdated
    }
}
export function addMeasurementToSavedEventRequestInProgress(){
    return{
        type : types.ADD_MEASUREMENT_TO_SAVED_EVENT_REQUEST_IN_PROGRESS
    }
}
export function deleteMeasurementFromSavedEventInternally(measurementToDeleteIndex, savedEventToDeleteFromIndex, lastUpdated){
    return{
        type : types.DELETE_MEASUREMENT_FROM_SAVED_EVENT_INTERNALLY,
        measurementToDeleteIndex,
        savedEventToDeleteFromIndex,
        lastUpdated
    }
}
export function deleteMeasurementFromSavedEventRequestInProgress(){
    return{
        type : types.DELETE_MEASUREMENT_FROM_SAVED_EVENT_REQUEST_IN_PROGRESS
    }
}
export function updateMeasurementInSavedEventInternally(savedEventIndex, measurementIndexInSavedEvent, measurementDetails, lastUpdated){
    return{
        type : types.UPDATE_MEASUREMENT_IN_SAVED_EVENT_INTERNALLY,
        savedEventIndex, measurementIndexInSavedEvent,
        measurementDetails,
        lastUpdated
    }
}
export function updateMeasurementInSavedEventRequestInProgress(){
    return{
        type : types.UPDATE_MEASUREMENT_IN_SAVED_EVENT_REQUEST_IN_PROGRESS
    }
}



export function recievedUserSettings(settings) {
    return {
        type: types.RECEIVED_USER_SETTINGS,
        allowed_tabs: settings.allowed_tabs,
        default_lang: settings.default_lang,
        monitored_views : settings.monitored_views,
        user_saved_events : settings.user_saved_events,
        timezone : settings.timezone
    }
}
export function graphNameUpdated(currentAnalysisViewMode, indexInList, newName, lastUpdated){
    return{
        type : types.USER_UPDATED_GRAPH_NAME,
        currentAnalysisViewMode,
        indexInList,
        newName,
        lastUpdated
        
    }
}

export function requestToChangeTimezoneInProgress(timezone){
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
                dispatch(recievedUserSettings(settings));
            })
            .catch((err) => {
                console.log('problem getting user settings');
                console.log(err);
            })
    }
}

export function userUpdatedGraphSetName(currentAnalysisViewMode, indexInList, newName){
    return (dispatch) => {
        const lastUpdated = moment().valueOf();
        dispatch(graphNameUpdated(currentAnalysisViewMode, indexInList, newName, lastUpdated));
        if(currentAnalysisViewMode === consts.ANALYSIS_VIEWING_MODE.MONITORED_VIEW){
            httpService.updateGraphSetNameForMonitoredView(indexInList, newName, lastUpdated)
                .catch((err) => {
                    console.log(err)
                });
        }
        else if(currentAnalysisViewMode === consts.ANALYSIS_VIEWING_MODE.USER_SAVED_EVENT){
            httpService.updateGraphSetNameForSavedEvent(indexInList, newName, lastUpdated)
                .catch((err) => {
                    console.log(err)
                });
        }
        
    }
}

export function userRequestToChangeTimezone(timezone){
    return (dispatch) => {
        dispatch(requestToChangeTimezoneInProgress(timezone));
        return httpService.updateTimezone(timezone)
            .catch((err) => {
                console.log(err)
            });
    }
}

export function userAddedMonitoredView(viewDetails, monitoredViewIndex){
    return (dispatch) => {
        dispatch(addMonitoredViewInternally(viewDetails, monitoredViewIndex));
        dispatch(addMonitoredViewRequestInProgress());
        return httpService.addMonitoredView(viewDetails)
            .catch((err) => {
                console.log(err);
            })
    }
}
export function userRemovedMonitoredView(viewDetails, monitoredViewIndex){
    return (dispatch) => {
        dispatch(removeMonitoredViewInternally(viewDetails, monitoredViewIndex));
        dispatch(removeMonitoredViewRequestInProgress());
        return httpService.deleteMonitoredView(monitoredViewIndex)
            .catch((err) => {
                console.log(err);
            })
    }
}

export function userAddedSavedEvent(viewDetails, savedEventIndex){
    return (dispatch) => {
        dispatch(addSavedEventInternally(viewDetails, savedEventIndex));
        dispatch(addSavedEventRequestInProgress());
        return httpService.addSavedEvent(viewDetails)
            .catch((err) => {
                console.log(err);
            })
    }
}
export function userRemovedSavedEvent(viewDetails, savedEventIndex){
    return (dispatch) => {
        dispatch(removeSavedEventInternally(viewDetails, savedEventIndex));
        dispatch(removeSavedEventRequestInProgress());
        return httpService.deleteSavedEvent(savedEventIndex)
            .catch((err) => {
                console.log(err);
            })
    }
}

export function userAddedMeasurementToMonitoredView(newMeasurement, monitoredViewIndexToAddTo){
    return (dispatch) =>{
        const lastUpdated = moment().valueOf();
        dispatch(addMeasurementToMonitoredViewInternally(newMeasurement, monitoredViewIndexToAddTo, lastUpdated));
        dispatch(addMeasurementToMonitoredViewRequestInProgress());
        return httpService.addMeasurementToMonitoredView(newMeasurement, monitoredViewIndexToAddTo, lastUpdated)
            .catch((err) => {
                console.log(err);
            })
    }
}
export function userDeletedMeasurementFromMonitoredView(measurementToDeleteIndex, monitoredViewToDeleteFromIndex){
    return (dispatch) =>{
        const lastUpdated = moment().valueOf();
        dispatch(deleteMeasurementFromMonitoredViewInternally(measurementToDeleteIndex, monitoredViewToDeleteFromIndex, lastUpdated));
        dispatch(deleteMeasurementFromMonitoredViewRequestInProgress());
        return httpService.deleteMeasurementFromMonitoredView(measurementToDeleteIndex, monitoredViewToDeleteFromIndex, lastUpdated)
            .catch((err) => {
                console.log(err);
            })
    }
}
export function userUpdatedMeasurementInMonitoredView(monitoredViewIndex, measurementIndexInMonitoredView, measurementDetails){
    return (dispatch) =>{
        const lastUpdated = moment().valueOf();
        dispatch(updateMeasurementInMonitoredViewInternally(monitoredViewIndex, measurementIndexInMonitoredView, measurementDetails, lastUpdated));
        dispatch(updateMeasurementInMonitoredViewRequestInProgress());
        return httpService.updateExistingMeasurementDetailsInMonitoredView(monitoredViewIndex, measurementIndexInMonitoredView, measurementDetails, lastUpdated)
            .catch((err) => {
                console.log(err);
            })
    }
}
export function userAddedMeasurementToSavedEvent(newMeasurement, savedEventIndexToAddTo){
    return (dispatch) =>{
        const lastUpdated = moment().valueOf();
        dispatch(addMeasurementToSavedEventInternally(newMeasurement, savedEventIndexToAddTo, lastUpdated));
        dispatch(addMeasurementToSavedEventRequestInProgress());
        return httpService.addMeasurementToSavedEvent(newMeasurement, savedEventIndexToAddTo, lastUpdated)
            .catch((err) => {
                console.log(err);
            })
    }
}
export function userDeletedMeasurementFromSavedEvent(measurementToDeleteIndex, savedEventToDeleteFromIndex){
    return (dispatch) =>{
        const lastUpdated = moment().valueOf();
        dispatch(deleteMeasurementFromSavedEventInternally(measurementToDeleteIndex, savedEventToDeleteFromIndex, lastUpdated));
        dispatch(deleteMeasurementFromSavedEventRequestInProgress());
        return httpService.deleteMeasurementFromSavedEvent(measurementToDeleteIndex, savedEventToDeleteFromIndex, lastUpdated)
            .catch((err) => {
                console.log(err);
            })
    }
}
export function userUpdatedMeasurementInSavedEvent(savedEventIndex, measurementIndexInSavedEvent, measurementDetails){
    return (dispatch) =>{
        const lastUpdated = moment().valueOf();
        dispatch(updateMeasurementInSavedEventInternally(savedEventIndex, measurementIndexInSavedEvent, measurementDetails, lastUpdated));
        dispatch(updateMeasurementInSavedEventRequestInProgress());
        return httpService.updateExistingMeasurementDetailsInSavedEvent(savedEventIndex, measurementIndexInSavedEvent, measurementDetails, lastUpdated)
            .catch((err) => {
                console.log(err);
            })
    }
}
