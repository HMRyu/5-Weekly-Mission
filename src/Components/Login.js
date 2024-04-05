import profileImg from '../img/profile.svg';
import "../css/Navbar.css"

function Login({ user }) {
    return ( 
        <div className='navbar-profile'>
            <img className='navbar-profile-img' alt='profile-img' src={profileImg}></img>
            <div className="navbar-user">{user.email}</div>
        </div>
    )
}

export default Login;