import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  EXERCISES_ROTATE_IMAGE_BEGIN,
  EXERCISES_ROTATE_IMAGE_SUCCESS,
  EXERCISES_ROTATE_IMAGE_FAILURE,
  EXERCISES_ROTATE_IMAGE_DISMISS_ERROR,
} from '../../../../src/features/exercises/redux/constants';

import {
  rotateImage,
  dismissRotateImageError,
  reducer,
} from '../../../../src/features/exercises/redux/rotateImage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('exercises/redux/rotateImage', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when rotateImage succeeds', () => {
    const store = mockStore({});

    return store.dispatch(rotateImage())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', EXERCISES_ROTATE_IMAGE_BEGIN);
        expect(actions[1]).toHaveProperty('type', EXERCISES_ROTATE_IMAGE_SUCCESS);
      });
  });

  it('dispatches failure action when rotateImage fails', () => {
    const store = mockStore({});

    return store.dispatch(rotateImage({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', EXERCISES_ROTATE_IMAGE_BEGIN);
        expect(actions[1]).toHaveProperty('type', EXERCISES_ROTATE_IMAGE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissRotateImageError', () => {
    const expectedAction = {
      type: EXERCISES_ROTATE_IMAGE_DISMISS_ERROR,
    };
    expect(dismissRotateImageError()).toEqual(expectedAction);
  });

  it('handles action type EXERCISES_ROTATE_IMAGE_BEGIN correctly', () => {
    const prevState = { rotateImagePending: false };
    const state = reducer(
      prevState,
      { type: EXERCISES_ROTATE_IMAGE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.rotateImagePending).toBe(true);
  });

  it('handles action type EXERCISES_ROTATE_IMAGE_SUCCESS correctly', () => {
    const prevState = { rotateImagePending: true };
    const state = reducer(
      prevState,
      { type: EXERCISES_ROTATE_IMAGE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.rotateImagePending).toBe(false);
  });

  it('handles action type EXERCISES_ROTATE_IMAGE_FAILURE correctly', () => {
    const prevState = { rotateImagePending: true };
    const state = reducer(
      prevState,
      { type: EXERCISES_ROTATE_IMAGE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.rotateImagePending).toBe(false);
    expect(state.rotateImageError).toEqual(expect.anything());
  });

  it('handles action type EXERCISES_ROTATE_IMAGE_DISMISS_ERROR correctly', () => {
    const prevState = { rotateImageError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: EXERCISES_ROTATE_IMAGE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.rotateImageError).toBe(null);
  });
});

