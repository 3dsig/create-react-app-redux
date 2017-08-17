import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import consts from '../constants/consts'
import counterReducer from './home/home_reducer'
import userReducer from './user/user_reducer'

export default combineReducers({
    [consts.TOP_LEVEL_STATE_REDUCERS.COUNTER_REDUCER]: counterReducer,
    [consts.TOP_LEVEL_STATE_REDUCERS.USER_REDUCER]: userReducer,
    router: routerReducer,
})
