import * as types from '../../constants/ActionTypes';
import consts from '../../constants/consts';

const initialState = {
    [consts.STATE_INNER_OBJECT_NAMES.COUNT]: 0,
    [consts.STATE_INNER_OBJECT_NAMES.IS_INCREMENTING]: false,
    [consts.STATE_INNER_OBJECT_NAMES.IS_DECREMENTING]: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.INCREMENT_REQUESTED:
      return {
        ...state,
        [consts.STATE_INNER_OBJECT_NAMES.IS_INCREMENTING]: true
      }

    case types.INCREMENT:
      return {
        ...state,
          [consts.STATE_INNER_OBJECT_NAMES.COUNT]: state[consts.STATE_INNER_OBJECT_NAMES.COUNT] + 1,
          [consts.STATE_INNER_OBJECT_NAMES.IS_INCREMENTING]: !state[consts.STATE_INNER_OBJECT_NAMES.IS_INCREMENTING]
      }

    case types.DECREMENT_REQUESTED:
      return {
        ...state,
          [consts.STATE_INNER_OBJECT_NAMES.IS_DECREMENTING]: true
      }

    case types.DECREMENT:
      return {
        ...state,
          [consts.STATE_INNER_OBJECT_NAMES.COUNT]: state[consts.STATE_INNER_OBJECT_NAMES.COUNT] - 1,
          [consts.STATE_INNER_OBJECT_NAMES.IS_DECREMENTING]: !state[consts.STATE_INNER_OBJECT_NAMES.IS_DECREMENTING]
      }

    default:
      return state
  }
}

