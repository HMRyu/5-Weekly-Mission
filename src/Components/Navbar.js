import "../css/Navbar.css"
import Login from './Login';
import logoImg from '../img/logo.svg';

function Navbar({ user }) {
    return (
        <div className="navbar">
            <div className="navbar-logo">
                <a href="/">
                    <img src={logoImg} alt='Linkbrary'></img>
                </a>
            </div>
            <Login user={user} />
        </div>
    )
}

export default Navbar;