import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import consts from '../constants/consts'
import counterReducer from './home/home_reducer'

export default combineReducers({
    [consts.TOP_LEVEL_STATE_REDUCERS.COUNTER_REDUCER]: counterReducer,
    router: routerReducer,

})
