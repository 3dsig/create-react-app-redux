import consts from '../../constants/consts'
import {createSelector} from 'reselect'

const selector = (state) => state[consts.TOP_LEVEL_STATE_REDUCERS.COUNTER_REDUCER];

export const count = createSelector(
    [selector],
    (selector) => {
        return selector[consts.STATE_INNER_OBJECT_NAMES.COUNT];
    });

export const isIncrementing = createSelector(
    [selector],
    (selector) => {
        return selector[consts.STATE_INNER_OBJECT_NAMES.IS_INCREMENTING];
    });

export const isDecrementing = createSelector(
    [selector],
    (selector) => {
        return selector[consts.STATE_INNER_OBJECT_NAMES.IS_DECREMENTING];
    });