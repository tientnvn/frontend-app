import React from 'react';
import { shallow } from 'enzyme';
import { SidePanel } from '../../../src/features/exercises/SidePanel';

describe('exercises/SidePanel', () => {
  it('renders node with correct class name', () => {
    const props = {
      examples: {},
      actions: {},
    };
    const renderedComponent = shallow(<SidePanel {...props} />);

    expect(renderedComponent.find('.exercises-side-panel').length).toBe(1);
  });
});
