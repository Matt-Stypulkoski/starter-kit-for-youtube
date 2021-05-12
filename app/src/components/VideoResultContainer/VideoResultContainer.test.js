import React from 'react';
import {cleanup, render} from '@testing-library/react';
import renderer from 'react-test-renderer';
import VideoResultContainer from './VideoResultContainer';

afterEach(cleanup)

it("renders", () => {
    const videoResultContainer = render(<VideoResultContainer videoList={[]}/>) 
});

it("renders when given props", () => {
    let videoProps = [
        "Test title",
        0,
        "../../test/videoResultTest.png",
        "Test Img",
        "2000-01-01T00:00:00Z",
        0,
        "Test channel",
        "0"
    ]
    const tree = renderer.create(<VideoResultContainer videoList={[videoProps]} />);
    expect(tree).toMatchSnapshot();
});