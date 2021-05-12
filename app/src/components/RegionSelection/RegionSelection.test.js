import React from 'react';
import {cleanup, render} from '@testing-library/react';
import RegionSelection from './RegionSelection';
const contentRegions = require('../../data/contentRegions.json');

afterEach(cleanup);

it("renders", () => {
    const {regionSelection} = render(<RegionSelection />);
});

it("renders children", () => {
    const {container} = render(<RegionSelection />);
    expect(container.querySelector('.search-parameter-container')).not.toBeNull();
    expect(container.querySelector('.search-parameter-label')).not.toBeNull();
    expect(container.querySelector('.search-parameter-input')).not.toBeNull();
});

it("pulls content regions from json file", () => {
    const {container} = render(<RegionSelection />);
    let regionSelect = container.querySelector(".search-parameter-input");
    let expectedContentRegionArr = [];
    let returnedContentRegionArr = [];

    for (let i = 0; i < regionSelect.children.length; i++) {
        returnedContentRegionArr.push(regionSelect.children[i].value);
    }

    for (let i = 0; i < contentRegions.length; i++) {
        expectedContentRegionArr.push(contentRegions[i].id);
    }

    expect(returnedContentRegionArr).toEqual(expectedContentRegionArr);
});