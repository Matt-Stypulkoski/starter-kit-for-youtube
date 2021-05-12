import React from 'react';
import {cleanup, render} from '@testing-library/react';
import InputHeader from './InputHeader';

afterEach(cleanup);

jest.mock('../DateInput/DateInput', () => () => <div data-testid="date-input" />);
jest.mock('../RegionSelection/RegionSelection', () => () => <div data-testid="region-selection" />)

it("renders", () => {
    const {inputHeader} = render(<InputHeader />);
});

it("renders all children", () => {
    const {getByTestId, container} = render(<InputHeader />);
    expect(getByTestId('date-input')).not.toBeNull();
    expect(getByTestId('region-selection')).not.toBeNull();
    expect(container.querySelector('.search-parameter-container')).not.toBeNull();
});