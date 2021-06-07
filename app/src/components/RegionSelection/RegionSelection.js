import { React, Component } from 'react';
const contentRegions = require('../../data/contentRegions.json');

class RegionSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRegion: 'United States',
            regionList: contentRegions,
            regionCode: 'US',
        }
    }

    render() {
        return (
            <div className='search-parameter-container'>
                <label className="search-parameter-label" htmlFor="region-select">region:</label>
                <select className="search-parameter-input" name="regions" id="region-select">
                    {this.state.regionList.map((region) => {
                        return (this.state.currentRegion ===  region.name) ? <option value={region.id} key={region.id} selected>{region.name}</option>
                                                                           : <option value={region.id} key={region.id}>{region.name}</option> 
                    })}
                </select>
            </div>
        );
    }
}

export default RegionSelection;