import headerLogo from '../../../Media/Image/cad-it-logo.png';
import "./Header.scss";

function Header() {
    return (
        <div className='header-main'>
            <div className="header-main__head">
                <img src={headerLogo}></img>
            </div>
        </div>
    );
}

export default Header;
