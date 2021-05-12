import { React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

function Header(props) {

    return (
        <header className="header">
            <div className="header-container">
                <img className="logo" />
                <h2>Starter Kit For Youtube</h2>
            </div>
        </header>
    );
}

export default Header;