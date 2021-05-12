import React from 'react';
import {cleanup, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StatBox from './StatBox';

afterEach(cleanup);

it("renders", () => {
    const {statBox} = render(<StatBox />);
});

it("displays value and label", () => {
    const {container} = render(<StatBox value={20} label="Test Label" />)
    expect(container.querySelector(".stat-value")).toHaveTextContent(20);
    expect(container.querySelector(".stat-label")).toHaveTextContent("Test Label");
});