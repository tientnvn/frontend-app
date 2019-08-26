import React from 'react';
import { shallow } from 'enzyme';
import { WelcomePage } from '../../../src/features/exercises/WelcomePage';

describe('exercises/WelcomePage', () => {
  it('renders node with correct class name', () => {
    const props = {
      examples: {},
      actions: {},
    };
    const renderedComponent = shallow(<WelcomePage {...props} />);

    expect(renderedComponent.find('.exercises-welcome-page').length).toBe(1);
  });
});
