import React from 'react';
import {cleanup, render} from '@testing-library/react';
import renderer from 'react-test-renderer';
import VideoResult from './VideoResult';

afterEach(cleanup)

it("renders", () => {
    const videoResult = render(<VideoResult />) 
});

it("renders with props displayed", () => {
    const tree = renderer.create(<VideoResult videoId={0} title="Test title" 
                                              channelId="0" channelTitle="Test channel"
                                              views={0} thumbnailURL="../../test/videoResultTest.png" 
                                              altText="Test Img" datetimePublished="2000-01-01T00:00:00Z"/>);

    expect(tree).toMatchSnapshot();
});