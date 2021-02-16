import { React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

function Header(props) {

    return (
        <header className="header">
            <FontAwesomeIcon icon={faYoutube} />
            <h2>Youtube Starter Kit</h2>
        </header>
    );
}

export default Header;