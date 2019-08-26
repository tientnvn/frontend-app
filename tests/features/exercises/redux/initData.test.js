import {
  EXERCISES_INIT_DATA,
} from '../../../../src/features/exercises/redux/constants';

import {
  initData,
  reducer,
} from '../../../../src/features/exercises/redux/initData';

describe('exercises/redux/initData', () => {
  it('returns correct action by initData', () => {
    expect(initData()).toHaveProperty('type', EXERCISES_INIT_DATA);
  });

  it('handles action type EXERCISES_INIT_DATA correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: EXERCISES_INIT_DATA }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
