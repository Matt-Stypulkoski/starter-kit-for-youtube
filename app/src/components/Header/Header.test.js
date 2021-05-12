import React from 'react';
import {cleanup, render} from '@testing-library/react';
import Header from './Header';

afterEach(cleanup);

it('renders', () => {
    const {header} = render(<Header />);
})

it('displays correct header text', () => {
    const {getByRole} = render(<Header />);
    const header = getByRole('banner');
    const headerContainer = header.childNodes[0];
    const h2 = headerContainer.childNodes[1]
    expect(h2.textContent).toBe("Starter Kit For Youtube");
});
