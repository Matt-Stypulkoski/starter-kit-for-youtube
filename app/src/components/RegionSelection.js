import { React, Component } from 'react';
import getUserCountry from '../scripts/getUserCountry.js';
const contentRegions = require('../data/contentRegions.json');



class RegionSelection extends Component {
    constructor(props) {
        super(props);
        this.getUserCountryData = this.getUserCountryData.bind(this);
        this.state = {
            currentRegion: null,
            regionList: contentRegions,
            regionCode: null
        }
    }

    getUserCountryData() {
        return getUserCountry()
            .then(res => {
                this.setState({
                    currentRegion: res.country,
                    regionCode: res.code
                })
            })
    }

    componentDidMount() {
        this.getUserCountryData();
    }

    render() {
        console.log(this.state)
        return (
            <div className='search-parameter-container'>
                <label htmlFor="region-select">region:</label>
                <select name="regions" id="region-select">
                    {this.state.regionList.map((region) => {
                        return (this.state.currentRegion ===  region.name) ? <option value={region.id} selected>{region.name}</option>
                                                                           : <option value={region.id}>{region.name}</option> 
                    })}
                </select>
            </div>
        );
    }
}

export default RegionSelection;