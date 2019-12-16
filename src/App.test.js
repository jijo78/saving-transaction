import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';

import App from './App';

const HEADER_TEXT = /STARLING BANK/i;
const TRANSACTION_TEXT = /Weekly transactions and savings/i;

describe('<App />', () => {
  it('should render app container', () => {
    const { container } = render(<App />);

    expect(container.innerHTML).toBeDefined();
  });
});
