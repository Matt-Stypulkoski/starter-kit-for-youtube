import { React, Component } from 'react';
import { getYoutubeContentRegions } from '../scripts/youtubeapi.js';



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
        getYoutubeContentRegions()
            .then(result => {
                for (let region of result) {
                    regionList.push(region.snippet.name);
                }
                this.setState({
                    regionList: regionList
                });
            });
    }

    toggleMenu() {
        console.log("CLICKED");
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    }

    render() {
        console.log(this.state);
        let menu;
        if (this.state.menuOpen) {
            this.getContentRegions();
            menu = 
                <div className="region-select-menu">
                    <button onClick={() => this.toggleMenu}>Close</button>
                    <h4>Choose Your Region:</h4>
                    <ul className="region-list">
                        {this.state.regionList.map(function (region) {
                            return <li className="region-name">
                                <button>{region}</button>
                            </li>
                        })}
                    </ul>
                </div>
        } else {
            menu = 
                <div className="region-select-menu">
                    <h4>Current Region: {this.state.currentRegion}</h4>
                    <button onClick={this.toggleMenu}>Open</button>
                </div>
        }

        return (
            <span>
                {menu}
            </span>
        );
    }
}

export default RegionSelection;