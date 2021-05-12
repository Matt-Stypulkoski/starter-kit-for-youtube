import React from 'react';
import {cleanup, render} from '@testing-library/react';
import renderer from 'react-test-renderer';
import StatBoxContainer from './StatBoxContainer';

afterEach(cleanup)

// jest.mock("./StatBox", () => () => <div data-testid="statbox"></div>);

it("renders", () => {
    const {statBoxContainer} = render(<StatBoxContainer statBoxList={[]} />);
});

it('displays props', () => {
    let mockStatBoxData = {
        "value": 20,
        "label": "test"
    }
    const tree = renderer.create(<StatBoxContainer statBoxList={[mockStatBoxData]} />).toJSON();
    expect(tree).toMatchSnapshot();
}); 
