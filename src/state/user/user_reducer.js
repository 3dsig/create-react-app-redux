/**
 * Created by shahartaite on 16/11/2016.
 */
import * as types from 'js/constants/ActionTypes';
import consts from 'js/consts';
import {LOCATION_CHANGE} from 'react-router-redux';
import httpService from 'js/http_service';
import queryStringParser from 'qs';
import utils from 'js/utils';

const initialState = {
    [consts.STATE_INNER_OBJECT_NAMES.USER_ALLOWED_MEASUREMENTS]: [],
    [consts.STATE_INNER_OBJECT_NAMES.MONITORED_VIEWS]: [],
    [consts.STATE_INNER_OBJECT_NAMES.USER_SAVED_EVENTS]: [],
    [consts.STATE_INNER_OBJECT_NAMES.USER_EMAIL]: '',
    [consts.STATE_INNER_OBJECT_NAMES.VIEWING_CONFIG_SETTINGS]: {},
    [consts.STATE_INNER_OBJECT_NAMES.USER_DEFAULT_LANGUAGE]: '',
    [consts.STATE_INNER_OBJECT_NAMES.USER_SELECTED_TIMEZONE]: '',
    [consts.STATE_INNER_OBJECT_NAMES.USER_ALLOWED_TABS]: [],
    [consts.STATE_INNER_OBJECT_NAMES.USER_LOGIN_IN_PROGRESS]: false,
    [consts.STATE_INNER_OBJECT_NAMES.IS_RECIEVED_USER_SETTINGS] : false,
    
};

//let wasSlideFromShareableLinkAddedOnServer = false;

export default function (state = initialState, action) {
    switch (action.type) {
        
        case types.RECIEVED_USER_ALLOWED_MEASUREMENTS: {
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.USER_ALLOWED_MEASUREMENTS] : action.userMeasurements
            };
        }
        case types.USER_LOGGED_IN: {
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.USER_EMAIL] : action.email
            };
        }
        case types.RECEIVED_VIEWING_CONFIGURATION_FOR_USER : {
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.VIEWING_CONFIG_SETTINGS]: action.config
            };
        }
        case types.REQUEST_TO_UPDATE_DEFAULT_LANGUAGE_IN_PROGRESS : {
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.USER_DEFAULT_LANGUAGE]: action.defaultLanguage,
            };
        }
        case types.USER_LOGIN_IN_PROGRESS : {
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.USER_LOGIN_IN_PROGRESS] : true
            };
        }
        case types.USER_LOGIN_PROCESS_ENDED : {
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.USER_LOGIN_IN_PROGRESS] : false
            };
        }
        case types.RECEIVED_USER_SETTINGS : {
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.USER_ALLOWED_TABS]: action.allowed_tabs,
                [consts.STATE_INNER_OBJECT_NAMES.MONITORED_VIEWS]: action.monitored_views || [], //if personalized carouselle graph set doesn't exist we leave it as empty list
                [consts.STATE_INNER_OBJECT_NAMES.USER_SAVED_EVENTS]: action.user_saved_events || [],
                [consts.STATE_INNER_OBJECT_NAMES.USER_DEFAULT_LANGUAGE]: action.default_lang,
                [consts.STATE_INNER_OBJECT_NAMES.USER_SELECTED_TIMEZONE]: action.timezone,
                [consts.STATE_INNER_OBJECT_NAMES.IS_RECIEVED_USER_SETTINGS] : true,
            };
        }
        
        case types.USER_UPDATED_GRAPH_NAME : {
            const {currentAnalysisViewMode, indexInList, newName} = action;
            switch(currentAnalysisViewMode){
                case consts.ANALYSIS_VIEWING_MODE.MONITORED_VIEW :{
                    const currentMonitoredViews = state[consts.STATE_INNER_OBJECT_NAMES.MONITORED_VIEWS];
                    const relevantMonitoredView = currentMonitoredViews[indexInList];
                    const updatedMonitoredView = {
                        ...relevantMonitoredView,
                        name : newName
                    };
                    const updatedMonitoredViews = utils.replaceElementInArrayImmutably(currentMonitoredViews,indexInList,updatedMonitoredView);
                    return {
                        ...state,
                        [consts.STATE_INNER_OBJECT_NAMES.MONITORED_VIEWS] : updatedMonitoredViews
                    }
                }
                case consts.ANALYSIS_VIEWING_MODE.USER_SAVED_EVENT :{
                    const currentSavedEvents = state[consts.STATE_INNER_OBJECT_NAMES.USER_SAVED_EVENTS];
                    const relevantSavedEvent = currentSavedEvents[indexInList];
                    const updatedSavedEvent = {
                        ...relevantSavedEvent,
                        name : newName
                    };
                    const updatedSavedEvents = utils.replaceElementInArrayImmutably(currentSavedEvents,indexInList,updatedSavedEvent);
                    return {
                        ...state,
                        [consts.STATE_INNER_OBJECT_NAMES.USER_SAVED_EVENTS] : updatedSavedEvents
                    }
                }
                default : {
                    return state;
                }
            }
        }
        
        case types.REQUEST_TO_CHANGE_TIME_ZONE_IN_PROGRESS : {
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.USER_SELECTED_TIMEZONE]: action.timezone
            };
        }
        
        case types.EXISTING_MONITORED_VIEW_SELECTED : {
            const pinDetails = action.pinDetails;
            const isAlreadyUsingPersonalizedPins = state[consts.STATE_INNER_OBJECT_NAMES.IS_USING_PERSONALIZED_GRAPH_SET];
            let currentSetOfPins;
            if (isAlreadyUsingPersonalizedPins) {
                currentSetOfPins = state[consts.STATE_INNER_OBJECT_NAMES.MONITORED_VIEWS];
            }
            else {
                currentSetOfPins = state[consts.STATE_INNER_OBJECT_NAMES.USER_DEFAULT_MEASUREMENT_GRAPH_SETS];
            }
            const updatedSetOfPins = [...currentSetOfPins, pinDetails];
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.MONITORED_VIEWS] : updatedSetOfPins,
                [consts.STATE_INNER_OBJECT_NAMES.IS_USING_PERSONALIZED_GRAPH_SET] : true,
            }
            
        }
        case types.ADD_MONITORED_VIEW_INTERNALLY : {
            const {viewDetails} = action;
            let updatedMonitoredViews = [...state[consts.STATE_INNER_OBJECT_NAMES.MONITORED_VIEWS],viewDetails];
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.MONITORED_VIEWS] : updatedMonitoredViews
            }
        }
        case types.REMOVE_MONITORED_VIEW_INTERNALLY : {
            const {monitoredViewIndex} = action;
            const currentMonitoredViews = state[consts.STATE_INNER_OBJECT_NAMES.MONITORED_VIEWS];
        
            const updatedMonitoredViews = utils.removeItemFromArrayImmutably(currentMonitoredViews, monitoredViewIndex);
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.MONITORED_VIEWS]: updatedMonitoredViews,
            };
        }
        case types.ADD_SAVED_EVENT_INTERNALLY : {
            const {viewDetails} = action;
            let updatedSavedEvents = [...state[consts.STATE_INNER_OBJECT_NAMES.USER_SAVED_EVENTS],viewDetails];
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.USER_SAVED_EVENTS] : updatedSavedEvents
            }
        }
        case types.REMOVE_SAVED_EVENT_INTERNALLY : {
            const {savedEventIndex} = action;
            const currentSavedEvents = state[consts.STATE_INNER_OBJECT_NAMES.USER_SAVED_EVENTS];
    
            const updatedSavedEvents = utils.removeItemFromArrayImmutably(currentSavedEvents, savedEventIndex);
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.USER_SAVED_EVENTS]: updatedSavedEvents,
            };
        }
        case types.ADD_MEASUREMENT_TO_MONITORED_VIEW_INTERNALLY : {
            const {newMeasurement, monitoredViewIndexToAddTo, lastUpdated} = action;
            const currentMonitoredViews = state[consts.STATE_INNER_OBJECT_NAMES.MONITORED_VIEWS];
            const relevantMonitoredView = currentMonitoredViews[monitoredViewIndexToAddTo];
            const updatedMonitoredViewMeasurements = [...relevantMonitoredView.measurements, newMeasurement];
            const updatedMonitoredView = {
                ...relevantMonitoredView,
                lastUpdated,
                measurements : updatedMonitoredViewMeasurements
            };
            const updatedMonitoredViews = utils.replaceElementInArrayImmutably(currentMonitoredViews,monitoredViewIndexToAddTo,updatedMonitoredView);
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.MONITORED_VIEWS] : updatedMonitoredViews
            }
        }
        case types.DELETE_MEASUREMENT_FROM_MONITORED_VIEW_INTERNALLY : {
            const {measurementToDeleteIndex, monitoredViewToDeleteFromIndex, lastUpdated} = action;
            const currentMonitoredViews = state[consts.STATE_INNER_OBJECT_NAMES.MONITORED_VIEWS];
            const relevantMonitoredView = currentMonitoredViews[monitoredViewToDeleteFromIndex];
            const updatedMonitoredViewMeasurements = utils.removeItemFromArrayImmutably(relevantMonitoredView.measurements, measurementToDeleteIndex);
            const updatedMonitoredView = {
                ...relevantMonitoredView,
                lastUpdated,
                measurements : updatedMonitoredViewMeasurements
            };
            const updatedMonitoredViews = utils.replaceElementInArrayImmutably(currentMonitoredViews,monitoredViewToDeleteFromIndex,updatedMonitoredView);
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.MONITORED_VIEWS] : updatedMonitoredViews
            }
        }
        case types.UPDATE_MEASUREMENT_IN_MONITORED_VIEW_INTERNALLY : {
            const {monitoredViewIndex, measurementIndexInMonitoredView, measurementDetails, lastUpdated} = action;
            const currentMonitoredViews = state[consts.STATE_INNER_OBJECT_NAMES.MONITORED_VIEWS];
            const relevantMonitoredView = currentMonitoredViews[monitoredViewIndex];
            const updatedMonitoredViewMeasurements = utils.replaceElementInArrayImmutably(relevantMonitoredView.measurements,measurementIndexInMonitoredView,measurementDetails);
            const updatedMonitoredView = {
                ...relevantMonitoredView,
                lastUpdated,
                measurements : updatedMonitoredViewMeasurements
            };
            const updatedMonitoredViews = utils.replaceElementInArrayImmutably(currentMonitoredViews,monitoredViewIndex,updatedMonitoredView);
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.MONITORED_VIEWS] : updatedMonitoredViews
            }
        }
        case types.ADD_MEASUREMENT_TO_SAVED_EVENT_INTERNALLY : {
            const {newMeasurement, savedEventIndexToAddTo, lastUpdated} = action;
            const currentSavedEvents = state[consts.STATE_INNER_OBJECT_NAMES.USER_SAVED_EVENTS];
            const relevantSavedEvent = currentSavedEvents[savedEventIndexToAddTo];
            const updatedSavedEventMeasurements = [...relevantSavedEvent.measurements, newMeasurement];
            const updatedSavedEvent = {
                ...relevantSavedEvent,
                lastUpdated,
                measurements : updatedSavedEventMeasurements
            };
            const updatedSavedEvents = utils.replaceElementInArrayImmutably(currentSavedEvents,savedEventIndexToAddTo,updatedSavedEvent);
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.USER_SAVED_EVENTS] : updatedSavedEvents
            }
        }
        case types.DELETE_MEASUREMENT_FROM_SAVED_EVENT_INTERNALLY : {
            const {measurementToDeleteIndex, savedEventToDeleteFromIndex, lastUpdated} = action;
            const currentSavedEvents = state[consts.STATE_INNER_OBJECT_NAMES.USER_SAVED_EVENTS];
            const relevantSavedEvent = currentSavedEvents[savedEventToDeleteFromIndex];
            const updatedSavedEventMeasurements = utils.removeItemFromArrayImmutably(relevantSavedEvent.measurements, measurementToDeleteIndex);
            const updatedSavedEvent = {
                ...relevantSavedEvent,
                lastUpdated,
                measurements : updatedSavedEventMeasurements
            };
            const updatedSavedEvents = utils.replaceElementInArrayImmutably(currentSavedEvents,savedEventToDeleteFromIndex,updatedSavedEvent);
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.USER_SAVED_EVENTS] : updatedSavedEvents
            }
        }
        case types.UPDATE_MEASUREMENT_IN_SAVED_EVENT_INTERNALLY : {
            const {savedEventIndex, measurementIndexInSavedEvent, measurementDetails, lastUpdated} = action;
            const currentSavedEvents = state[consts.STATE_INNER_OBJECT_NAMES.USER_SAVED_EVENTS];
            const relevantSavedEvent = currentSavedEvents[savedEventIndex];
            const updatedSavedEventMeasurements = utils.replaceElementInArrayImmutably(relevantSavedEvent.measurements,measurementIndexInSavedEvent,measurementDetails);
            const updatedSavedEvent = {
                ...relevantSavedEvent,
                lastUpdated,
                measurements : updatedSavedEventMeasurements
            };
            const updatedSavedEvents = utils.replaceElementInArrayImmutably(currentSavedEvents,savedEventIndex,updatedSavedEvent);
            return {
                ...state,
                [consts.STATE_INNER_OBJECT_NAMES.USER_SAVED_EVENTS] : updatedSavedEvents
            }
        }
    }
    return state;
}
