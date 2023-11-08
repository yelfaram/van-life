import { NavLink } from "react-router-dom";
import Logo from "../assets/images/logo.png";

function Navbar() {
    const activeStyles = {
        textDecoration: "underline",
        textUnderlineOffset: "4px",
        color: "#161616"
    }

    return (
        <header>
            <NavLink to="/" className="nav--logo">
                <img src={Logo} alt="logo" />
            </NavLink>
            <nav>
                <NavLink 
                    to="/host"
                    style={( {isActive} ) => isActive ? activeStyles : null}
                >
                    Host
                </NavLink>
                <NavLink 
                    to="/vans"
                    style={( {isActive} ) => isActive ? activeStyles : null}
                >
                    Vans
                </NavLink>
                <NavLink 
                    to="/about"
                    style={( {isActive} ) => isActive ? activeStyles : null}
                >
                    About
                </NavLink>
            </nav>
        </header>
    )
}

export default Navbar