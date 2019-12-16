import React from 'react';
import { cleanup, render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import Header from '../Header';
const LOGO_ALT_ATTR = /Mastercard logo/i;

describe('<Header />', () => {
  afterEach(cleanup);

  it('should render the logo', () => {
    const { getByAltText } = render(<Header />);
    const logo = getByAltText(LOGO_ALT_ATTR);
    expect(logo).toBeDefined();
  });
});
