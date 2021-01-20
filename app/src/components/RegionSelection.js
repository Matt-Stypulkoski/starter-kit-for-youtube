import { React, Component } from 'react';
import { getYoutubeContentRegions } from '../scripts/youtubeapi.js';
const mockContentRegions = require('../test/MockContentRegions.json');



class RegionSelection extends Component {
    constructor(props) {
        super(props);
        this.getContentRegions = this.getContentRegions.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state = {
            menuOpen: false,
            currentRegion: "USA", // Need to replace with func that pulls location from browser
            regionList: []
        }
    }

    getContentRegions() {
        let regionList = [];
        return getYoutubeContentRegions()
            .then(result => {
                for (let region of result) {
                    regionList.push(region.snippet.name);
                }
                
                this.setState({
                    regionList: regionList
                });
            });
    }

    getMockContentRegions() {
        let regionList = [];
        for (let region of mockContentRegions) {
            regionList.push(region.name);
        }

        this.setState({
            regionList: regionList
        });
    }

    toggleMenu() {
        console.log("CLICKED");
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    }

    componentDidMount() {
        this.getMockContentRegions();
    }


    render() {
        let menu;
        if (this.state.menuOpen) {
            menu =
                <div>
                    <button onClick={this.toggleMenu}>Close</button>
                    <h4>Choose Your Region:</h4>
                    <ul className="region-list">
                        {this.state.regionList.map(function (region) {
                            return <li className="region-name">
                                <button className="region-btn">{region}</button>
                            </li>
                        })}
                    </ul>
                </div>
        } else {
            menu =
                <div>
                    <h4>Current Region: {this.state.currentRegion}</h4>
                    <button onClick={this.toggleMenu}>Open</button>
                </div>
        }

        return (
            <div className='region-select-container'>
                {menu}
            </div>
        );
    }
}

export default RegionSelection;