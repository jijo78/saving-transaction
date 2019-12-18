import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';

import App from './App';

describe('<App />', () => {
  it('should render app container', () => {
    const { container } = render(<App />);

    expect(container.innerHTML).toBeDefined();
  });
});
