import { Link } from "react-router-dom";
import logo from "../assets/logoFull.svg";
import { useContext } from 'react';
import { UserContext } from './Context';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext);
    const Logout = () => {
        setUserData({
            "id": 0,
            "email": "",
            "username": ""
        })

        localStorage.setItem("id", 0);
        localStorage.setItem("username", "");
        localStorage.setItem("email", "");
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img src={logo} width="100" alt="Logo" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarColor03"
                    aria-controls="navbarColor03"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor03">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active">
                                Home
                            </Link>
                        </li>
                        {(userData.id == 0) &&
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">
                                    Register
                                </Link>{" "}
                            </li>
                        }
                        {(userData.id == 0) &&
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                            </li>
                        }
                        {(userData.id != 0) &&
                            <li className="nav-item nav-link" onClick={Logout} style={{ cursor: 'pointer' }}>
                                Logout
                            </li>
                        }
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
