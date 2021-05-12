import { React, Component } from 'react';
import axios from 'axios';
import getUserCountry from '../../js/getUserCountry.js';
const contentRegions = require('../../data/contentRegions.json');


let cancelToken = axios.CancelToken.source();

class RegionSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRegion: null,
            regionList: contentRegions,
            regionCode: null,
        }
    }

    componentDidMount() {
        getUserCountry(cancelToken).then(res => {
            this.setState({
                currentRegion: res.country,
                regionCode: res.code
            });
        })
    }

    componentWillUnmount() {
        cancelToken.cancel();
    }

    render() {
        return (
            <div className='search-parameter-container'>
                <label className="search-parameter-label" htmlFor="region-select">region:</label>
                <select className="search-parameter-input" name="regions" id="region-select">
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