import React from 'react';
import { shallow } from 'enzyme';
import { HotelReservation } from '../../../src/features/exercises/HotelReservation';

describe('exercises/HotelReservation', () => {
  it('renders node with correct class name', () => {
    const props = {
      exercises: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <HotelReservation {...props} />
    );

    expect(
      renderedComponent.find('.exercises-hotel-reservation').length
    ).toBe(1);
  });
});
