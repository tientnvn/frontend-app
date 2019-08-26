import React from 'react';
import { shallow } from 'enzyme';
import { RotateImagePage } from '../../../src/features/exercises/RotateImagePage';

describe('exercises/RotateImagePage', () => {
  it('renders node with correct class name', () => {
    const props = {
      examples: {},
      actions: {},
    };
    const renderedComponent = shallow(<RotateImagePage {...props} />);

    expect(renderedComponent.find('.exercises-rotate-image-page').length).toBe(1);
  });

  it('counter actions are called when buttons clicked', () => {
    const pageProps = {
      examples: {},
      actions: {
        counterPlusOne: jest.fn(),
        counterMinusOne: jest.fn(),
        counterReset: jest.fn(),
      },
    };
    const renderedComponent = shallow(
      <RotateImagePage {...pageProps} />
    );
    renderedComponent.find('.btn-plus-one').simulate('click');
    renderedComponent.find('.btn-minus-one').simulate('click');
    renderedComponent.find('.btn-reset').simulate('click');
    expect(pageProps.actions.counterPlusOne.mock.calls.length).toBe(1);
    expect(pageProps.actions.counterMinusOne.mock.calls.length).toBe(1);
    expect(pageProps.actions.counterReset.mock.calls.length).toBe(1);
  });
});
