import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  EXERCISES_CHECK_RESERVATION_BEGIN,
  EXERCISES_CHECK_RESERVATION_SUCCESS,
  EXERCISES_CHECK_RESERVATION_FAILURE,
  EXERCISES_CHECK_RESERVATION_DISMISS_ERROR,
} from '../../../../src/features/exercises/redux/constants';

import {
  checkReservation,
  dismissCheckReservationError,
  reducer,
} from '../../../../src/features/exercises/redux/checkReservation';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('exercises/redux/checkReservation', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when checkReservation succeeds', () => {
    const store = mockStore({});

    return store.dispatch(checkReservation())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', EXERCISES_CHECK_RESERVATION_BEGIN);
        expect(actions[1]).toHaveProperty('type', EXERCISES_CHECK_RESERVATION_SUCCESS);
      });
  });

  it('dispatches failure action when checkReservation fails', () => {
    const store = mockStore({});

    return store.dispatch(checkReservation({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', EXERCISES_CHECK_RESERVATION_BEGIN);
        expect(actions[1]).toHaveProperty('type', EXERCISES_CHECK_RESERVATION_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissCheckReservationError', () => {
    const expectedAction = {
      type: EXERCISES_CHECK_RESERVATION_DISMISS_ERROR,
    };
    expect(dismissCheckReservationError()).toEqual(expectedAction);
  });

  it('handles action type EXERCISES_CHECK_RESERVATION_BEGIN correctly', () => {
    const prevState = { checkReservationPending: false };
    const state = reducer(
      prevState,
      { type: EXERCISES_CHECK_RESERVATION_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.checkReservationPending).toBe(true);
  });

  it('handles action type EXERCISES_CHECK_RESERVATION_SUCCESS correctly', () => {
    const prevState = { checkReservationPending: true };
    const state = reducer(
      prevState,
      { type: EXERCISES_CHECK_RESERVATION_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.checkReservationPending).toBe(false);
  });

  it('handles action type EXERCISES_CHECK_RESERVATION_FAILURE correctly', () => {
    const prevState = { checkReservationPending: true };
    const state = reducer(
      prevState,
      { type: EXERCISES_CHECK_RESERVATION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.checkReservationPending).toBe(false);
    expect(state.checkReservationError).toEqual(expect.anything());
  });

  it('handles action type EXERCISES_CHECK_RESERVATION_DISMISS_ERROR correctly', () => {
    const prevState = { checkReservationError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: EXERCISES_CHECK_RESERVATION_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.checkReservationError).toBe(null);
  });
});

