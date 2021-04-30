import React from 'react';
import {cleanup, render} from '@testing-library/react';
import DateInput from './DateInput';

afterEach(cleanup);

it("DateInput renders", () => {
    const {dateInput} = render(<DateInput />);
});

it("DateInput has label 'date range'", () => {
    const {getByText} = render(<DateInput />);
    expect(getByText("date range:"));
});

it("DateInput has search-parameter-input child", () => {
    const { container } = render(<DateInput />);
    expect(container.querySelector('.search-parameter-input')).not.toBeNull();  
});

it("DateInput has 2 react-datepicker children", () => {
    const { container } = render(<DateInput />);
    expect(container.querySelectorAll('.react-datepicker-wrapper').length).toBe(2);  
});