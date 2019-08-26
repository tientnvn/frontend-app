import axios from 'axios';
import {
  EXERCISES_ROTATE_IMAGE_BEGIN,
  EXERCISES_ROTATE_IMAGE_SUCCESS,
  EXERCISES_ROTATE_IMAGE_FAILURE,
  EXERCISES_ROTATE_IMAGE_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function rotateImage(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: EXERCISES_ROTATE_IMAGE_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      
      const doRequest = axios.post(`${process.env.BACKEND_HOST}/rotate-image`, args)
      doRequest.then(
        (res) => {
          dispatch({
            type: EXERCISES_ROTATE_IMAGE_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: EXERCISES_ROTATE_IMAGE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissRotateImageError() {
  return {
    type: EXERCISES_ROTATE_IMAGE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case EXERCISES_ROTATE_IMAGE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        rotateImagePending: true,
        rotateImageError: null,
      };

    case EXERCISES_ROTATE_IMAGE_SUCCESS:
      // The request is success
      return {
        ...state,
        matrix: action.data.result,
        rotateImagePending: false,
        rotateImageError: null,
      };

    case EXERCISES_ROTATE_IMAGE_FAILURE:
      // The request is failed
      return {
        ...state,
        rotateImagePending: false,
        rotateImageError: action.data.error,
      };

    case EXERCISES_ROTATE_IMAGE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        rotateImageError: null,
      };

    default:
      return state;
  }
}
