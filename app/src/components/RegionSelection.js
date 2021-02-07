import { React, Component } from 'react';
const contentRegions = require('../data/contentRegions.json');



class RegionSelection extends Component {
    constructor(props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.setRegion = this.setRegion.bind(this);
        this.state = {
            menuOpen: false,
            currentRegion: this.props.currentRegion,
            regionList: contentRegions
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return (nextProps.currentRegion !== prevState.currentRegion) ? { currentRegion: nextProps.currentRegion } : null;
    }


    toggleMenu() {
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    }

    componentDidMount() {
        //this.getMockContentRegions();
    }

    setRegion(region) {
        this.setState({
            currentRegion: region.name,
            menuOpen: false
        })
        this.props.onRegionSelect(region)
    }


    render() {
        let btnText;
        if (this.state.menuOpen) {
            btnText = "Choose Your Region:"
        } else {
            btnText = `Current Region: ${this.state.currentRegion}`
        }
        return (
            <div className='region-select-container'>
                <button type="button" className="region-menu-btn" onClick={this.toggleMenu}>{btnText}</button>
                {this.state.menuOpen && (
                    <div className="region-list-dropdown">
                        <ul className="region-ul">
                            {this.state.regionList.map((region) => {
                                return <li className="region-name">
                                    <button className="region-btn" onClick={() => this.setRegion(region)}> {region.name}</button>
                                </li>
                            })}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

export default RegionSelection;