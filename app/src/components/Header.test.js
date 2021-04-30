import React from 'react';
import {cleanup, render} from '@testing-library/react';
import Header from './Header';

afterEach(cleanup);

it('Header renders', () => {
    const {header} = render(<Header />);
})

it('Header displays correct text', () => {
    const {getByRole} = render(<Header />);
    const header = getByRole('banner');
    const headerContainer = header.childNodes[0];
    const logo = headerContainer.childNodes[0];
    const h2 = headerContainer.childNodes[1]
    expect(h2.textContent).toBe("Starter Kit For Youtube");
});
