// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  EXERCISES_INIT_DATA,
} from './constants';

export function initData(args = {}) {
  return (dispatch) => {
    dispatch({
      type: EXERCISES_INIT_DATA,
      data: args
    })
  }
}

export function reducer(state, action) {
  switch (action.type) {
    case EXERCISES_INIT_DATA:
      console.log(action.data.matrix)
      return {
        ...state,
        matrix: action.data.matrix
      };

    default:
      return state;
  }
}
