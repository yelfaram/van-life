import { NavLink } from "react-router-dom";
import Logo from "../assets/images/logo.png";

function Navbar() {
    return (
        <header>
            <NavLink to="/" className="nav--logo">
                <img src={Logo} alt="logo" />
            </NavLink>
            <nav>
                <NavLink to="/vans">Vans</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
        </header>
    )
}

export default Navbar