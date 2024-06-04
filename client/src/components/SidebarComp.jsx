import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from './Context';
import axios from 'axios';

const SidebarComp = ({ profilePicture }) => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const { userData} = useContext(UserContext);
    const [fullUserData, setFullUserData] = useState(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:7082/User/GetUser/${userData.id}`);
                setFullUserData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={styles.sidebar}>
            <div style={styles.userInfo}>
                <img
                    src={profilePicture}
                    alt="Profile Picture"
                    style={styles.profilePicture}
                />
                <h3 style={styles.name}>{userData.username}</h3>
            </div>
            <nav style={styles.navbar}>
                <ul style={styles.navbarNav}>
                    <li
                        style={{
                            ...styles.navItem,
                            ...(hoveredItem === "threads" ? styles.navLinkHover : {}),
                        }}
                        onMouseEnter={() => setHoveredItem("threads")}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <Link to="/threads" style={styles.navLink}>
                            View Threads
                        </Link>
                    </li>
                    <li
                        style={{
                            ...styles.navItem,
                            ...(hoveredItem === "comments" ? styles.navLinkHover : {}),
                        }}
                        onMouseEnter={() => setHoveredItem("comments")}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <Link to="/comments" style={styles.navLink}>
                            View Comments
                        </Link>
                    </li>
                    {(fullUserData.role == "admin") && (
                        <li
                            style={{
                                ...styles.navItem,
                                ...(hoveredItem === "dashboard" ? styles.navLinkHover : {}),
                            }}
                            onMouseEnter={() => setHoveredItem("dashboard")}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <Link to="/dashboard" style={styles.navLink}>
                                Dashboard
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

/* CSS aici, iar */
const styles = {
    sidebar: {
        width: "250px",
        height: "100vh",
        backgroundColor: "#34495E", // background color
        color: "#ECF0F1",
        padding: "20px",
        boxSizing: "border-box",
        position: "fixed", // make the sidebar fixed
        left: "0",
    },
    userInfo: {
        textAlign: "center",
        marginBottom: "20px",
    },
    profilePicture: {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        objectFit: "cover",
        marginBottom: "10px",
    },
    name: {
        margin: "0",
        fontSize: "1.5em",
    },
    navbar: {
        borderTop: "1px solid #7F8C8D",
        paddingTop: "10px",
    },
    navbarNav: {
        listStyleType: "none",
        padding: "0",
    },
    navItem: {
        margin: "10px 0",
    },
    navLink: {
        color: "#ECF0F1",
        textDecoration: "none",
        fontSize: "1.2em",
        display: "block",
        padding: "10px",
        borderRadius: "5px",
        transition: "background 0.3s",
    },
    navLinkHover: {
        backgroundColor: "#2980B9",
    },
};

export default SidebarComp;
