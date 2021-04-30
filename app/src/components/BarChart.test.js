import React from 'react';
import {cleanup, render} from '@testing-library/react';
import BarChart from './BarChart';

afterEach(cleanup);

function populateMockUploadTimes() {
    let uploadTimes = {}
    for (let hour = 0; hour < 24; hour++) {
        uploadTimes[hour] = hour;
    }
    return uploadTimes;
}

let mockUploadTimes = populateMockUploadTimes();

jest.mock('react-chartjs-2', () => ({
    Bar: () => null,
}));

it('BarChart renders', () => {
    const {barChart} = render(<BarChart uploadTimeData={mockUploadTimes} />);
}); 